// ============================================
// RURALMIND AI — LIVE API INTEGRATION SERVICE
// ============================================

// Fetch keys from Vite env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Check if keys are placeholders or valid
const isKeyValid = (key) => key && key !== 'YOUR_GEMINI_KEY_HERE' && key !== 'YOUR_WEATHER_KEY_HERE';

/**
 * Calls Google AI Studio's Gemini API directly using the developer key
 * @param {string} prompt Prompt to send to the AI mentor
 * @returns {Promise<string>} Generated text response
 */
export async function getGeminiMentorAdvice(prompt) {
  if (!isKeyValid(GEMINI_API_KEY)) {
    console.warn("Gemini API key not configured. Falling back to mock responses.");
    return null;
  }

  // List of endpoints to try in order of preference
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    `https://generativelanguage.googleapis.com/v1/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`
  ];

  let lastError = null;

  for (const url of endpoints) {
    try {
      console.log(`Attempting Gemini API request to: ${url.split('?')[0]}`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      }
      
      const err = await response.json();
      lastError = err.error?.message || "Unknown API error";
      console.warn(`Gemini endpoint failed: ${url.split('?')[0]} - ${lastError}`);
    } catch (error) {
      lastError = error.message;
      console.warn(`Gemini network connection failed: ${url.split('?')[0]} - ${error.message}`);
    }
  }

  throw new Error(`Gemini API Error (all endpoints exhausted): ${lastError}`);
}

/**
 * Calls OpenWeather Map to fetch current weather details for climate risk analysis
 * @param {number} lat Latitude (default is Anand, Gujarat: 22.5560)
 * @param {number} lon Longitude (default is Anand, Gujarat: 72.9515)
 * @returns {Promise<object>} Current weather data object
 */
export async function getLiveWeather(lat = 22.5560, lon = 72.9515) {
  if (!isKeyValid(WEATHER_API_KEY)) {
    console.warn("OpenWeather API key not configured. Using climate model defaults.");
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Weather request failed");
    }
    const data = await response.json();
    return {
      temp: round(data.main?.temp, 1),
      humidity: data.main?.humidity,
      description: data.weather?.[0]?.description,
      windSpeed: data.wind?.speed,
      rain: data.rain?.['1h'] || 0,
      name: data.name
    };
  } catch (error) {
    console.error("OpenWeather API Error:", error);
    return null;
  }
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
