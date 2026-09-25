// ============================================
// SCREEN 8: AI BUSINESS MENTOR — Enhanced UX
// ============================================

import { chatMessages, userData } from '../js/data.js';
import { bottomNav } from '../js/components.js';
import { getGeminiMentorAdvice } from '../js/api.js';

const quickReplies = [
  '💰 Reduce costs',
  '🏦 Loan options',
  '🌧️ Weather impact',
  '📊 Profit tips',
  '🐄 Feed advice',
  '📋 Govt schemes',
];

export function renderAIMentor() {
  let chatHTML = '';
  chatMessages.forEach(msg => {
    if (msg.role === 'user') {
      chatHTML += `<div class="chat-bubble user">${msg.text}</div>`;
    } else {
      let content = `<div class="ai-tag"><span class="material-symbols-rounded" style="font-size:14px">auto_awesome</span> RuralMind AI</div><p>${msg.text}</p>`;
      if (msg.recommendations) {
        content += `<div style="display:flex;flex-direction:column;gap:var(--space-2);margin-top:var(--space-3)">`;
        msg.recommendations.forEach(r => {
          content += `
            <div style="background:var(--bg);border-radius:var(--radius-md);padding:var(--space-3);display:flex;align-items:center;gap:var(--space-3)">
              <span class="material-symbols-rounded" style="color:var(--primary);font-size:20px">${r.icon}</span>
              <div style="flex:1">
                <div style="font-size:var(--text-xs);font-weight:600">${r.title}</div>
                <div style="font-size:10px;color:var(--success)">Save ${r.savings} • ${r.risk}</div>
              </div>
              <span class="material-symbols-rounded" style="font-size:16px;color:var(--text-muted)">arrow_forward_ios</span>
            </div>`;
        });
        content += `</div>`;
      }
      if (msg.schemes) {
        content += `<div style="display:flex;flex-direction:column;gap:var(--space-2);margin-top:var(--space-3)">`;
        msg.schemes.forEach(s => {
          content += `
            <div style="background:var(--primary-50);border-radius:var(--radius-md);padding:var(--space-3)">
              <div style="font-size:var(--text-xs);font-weight:600;color:var(--primary)">${s.name}</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px">${s.benefit}</div>
            </div>`;
        });
        content += `</div>`;
      }
      chatHTML += `<div class="chat-bubble ai">${content}</div>`;
    }
  });

  return `
    <div class="screen" style="display:flex;flex-direction:column;height:100%">
      <!-- Header -->
      <div class="page-header" style="flex-shrink:0">
        <button class="back-btn" onclick="window.__goBack()">
          <span class="material-symbols-rounded">arrow_back</span>
        </button>
        <div style="flex:1">
          <h1 class="page-title" style="font-size:var(--text-md)">AI Business Mentor</h1>
          <div style="font-size:10px;color:var(--success);display:flex;align-items:center;gap:4px">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite"></span> Online
          </div>
        </div>
        <div style="width:36px;height:36px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center">
          <span class="material-symbols-rounded" style="color:white;font-size:20px">psychology</span>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-container" id="chat-container-area" style="flex:1;overflow-y:auto;padding-bottom:180px">
        <!-- Welcome -->
        <div style="text-align:center;padding:var(--space-4);margin-bottom:var(--space-2)">
          <div style="width:56px;height:56px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3)">
            <span class="material-symbols-rounded" style="color:white;font-size:28px">psychology</span>
          </div>
          <div style="font-size:var(--text-sm);font-weight:600">RuralMind AI Mentor</div>
          <div style="font-size:var(--text-xs);color:var(--text-muted)">Your personal AI financial advisor</div>
        </div>
        ${chatHTML}
      </div>

      <!-- Quick Reply Chips -->
      <div class="quick-reply-chips" id="quick-reply-area" style="position:fixed;bottom:112px;left:50%;transform:translateX(-50%);width:100%;max-width:390px;background:var(--bg);padding:var(--space-2) var(--space-3);z-index:var(--z-fixed);border-top:1px solid var(--border-light)">
        ${quickReplies.map(q => `<div class="quick-reply-chip" onclick="window.__sendQuickReply('${q.replace(/'/g, "\\'")}')">${q}</div>`).join('')}
      </div>

      <!-- Input Area -->
      <div style="position:fixed;bottom:56px;left:50%;transform:translateX(-50%);width:100%;max-width:390px;background:var(--surface);border-top:1px solid var(--border-light);padding:var(--space-3) var(--space-4);display:flex;gap:var(--space-2);z-index:var(--z-fixed)">
        <input type="text" id="chat-input" class="input-field" placeholder="Ask AI Mentor..." style="padding:var(--space-3) var(--space-4);padding-left:var(--space-4);border-radius:var(--radius-full);flex:1" onkeypress="if(event.key === 'Enter') window.__sendChatMessage()">
        <button onclick="window.__sendChatMessage()" style="width:44px;height:44px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:transform 0.15s ease">
          <span class="material-symbols-rounded" style="color:white;font-size:20px">send</span>
        </button>
      </div>
      ${bottomNav('ai-mentor', userData.role)}
    </div>`;
}

// Quick reply handler
window.__sendQuickReply = function(text) {
  // Remove emoji prefix for cleaner query
  const cleanText = text.replace(/^[^\w]+/, '').trim();
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = cleanText;
  }
  window.__sendChatMessage();
};

// Format AI response text with basic markdown
function formatAIText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

// Window handler to send message
window.__sendChatMessage = async function() {
  const input = document.getElementById('chat-input');
  const container = document.getElementById('chat-container-area');
  if (!input || !container) return;

  const text = input.value.trim();
  if (!text) return;

  // Clear input
  input.value = '';

  // Hide quick replies after first message
  const quickArea = document.getElementById('quick-reply-area');
  if (quickArea) quickArea.style.display = 'none';

  // 1. Add User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = text;
  container.appendChild(userBubble);
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Save to message list
  chatMessages.push({ role: 'user', text });

  // 2. Add Typing indicator
  const aiBubble = document.createElement('div');
  aiBubble.className = 'chat-bubble ai';
  aiBubble.innerHTML = `
    <div class="ai-tag">
      <span class="material-symbols-rounded" style="font-size:14px">auto_awesome</span> 
      RuralMind AI
    </div>
    <div class="typing-indicator" style="display:flex;gap:6px;padding:var(--space-2) 0">
      <span style="width:7px;height:7px;border-radius:50%;background:var(--primary);animation:typingBounce 1.4s infinite"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:var(--primary);animation:typingBounce 1.4s infinite;animation-delay:0.2s"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:var(--primary);animation:typingBounce 1.4s infinite;animation-delay:0.4s"></span>
    </div>
  `;
  container.appendChild(aiBubble);
  container.scrollTop = container.scrollHeight;

  // 3. Request Gemini API
  let responseText = null;
  let hasError = false;
  let apiErrorMessage = "";

  try {
    responseText = await getGeminiMentorAdvice(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    hasError = true;
    apiErrorMessage = error.message;
  }

  // If Gemini API fails or key is not configured, fall back to high-fidelity mock advice
  if (!responseText) {
    responseText = getMockAdviceFallback(text);
  }

  // Remove typing indicator and render final response
  const indicator = aiBubble.querySelector('.typing-indicator');
  if (indicator) indicator.remove();

  const textNode = document.createElement('div');
  textNode.innerHTML = formatAIText(responseText);
  textNode.style.lineHeight = '1.6';
  textNode.style.fontSize = 'var(--text-sm)';
  aiBubble.appendChild(textNode);
  
  // If there was an API error, show a subtle notice at the bottom of the bubble
  if (hasError) {
    const errorNotice = document.createElement('div');
    errorNotice.style.fontSize = '9px';
    errorNotice.style.color = 'var(--danger)';
    errorNotice.style.marginTop = 'var(--space-2)';
    errorNotice.style.borderTop = '1px solid var(--border-light)';
    errorNotice.style.paddingTop = '4px';
    errorNotice.innerHTML = `<span style="font-weight:600">⚠️ API Notice:</span> Using local fallback. (Reason: ${apiErrorMessage})`;
    aiBubble.appendChild(errorNotice);
  }
  
  // Save to message list
  chatMessages.push({ role: 'ai', text: responseText });
  
  // Smooth scroll to bottom
  setTimeout(() => {
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, 100);
};

// Fallback logic for offline mode / unconfigured key
function getMockAdviceFallback(prompt) {
  const query = prompt.toLowerCase();
  
  if (query.includes('feed') || query.includes('cost') || query.includes('reduce')) {
    return "Based on your financial twin metrics, cattle feed represents 42% of your monthly expenditure. Here's what we advise:\n\n**1. Feed Optimization:** Transition to local fodder mixes which reduce feed expenses by up to 15%.\n\n**2. Nabard Dairy Development Subsidy:** You are eligible for the National Livestock Mission fodder development scheme which offers up to 50% subsidy on chaff cutters.\n\n**3. Seasonal Planning:** Stock up on green fodder during monsoon months when prices are 20-30% lower.";
  }
  if (query.includes('loan') || query.includes('borrow')) {
    return "Your Digital Financial Twin shows a very strong Credit Score (780/100) and low default probability (9.2%). You are eligible for:\n\n**1. Kisan Credit Card (KCC)** — 4% subsidized interest rate, up to ₹3 lakhs.\n\n**2. NABARD DEDS** — 25% capital subsidy (33.33% for SC/ST) on dairy equipment.\n\n**3. Mudra Shishu Loan** — Up to ₹50,000 at competitive rates for working capital.";
  }
  if (query.includes('weather') || query.includes('climate') || query.includes('rain')) {
    return "Current weather reports for Anand, Gujarat suggest optimal humidity (62%) and temperatures (32°C).\n\n**Upcoming Forecast:** Heavy rainfall predicted in next 3 days. This could impact:\n\n• **Milk supply routes** — Plan alternative transit\n• **Fodder storage** — Secure against moisture\n• **Cow health** — Inspect shelters for mastitis prevention\n\n**Recommendation:** Build a ₹5,000 emergency weather fund.";
  }
  if (query.includes('profit') || query.includes('growth')) {
    return "Your current profit margin is **66.6%** (₹28,350 from ₹42,580 revenue). To grow further:\n\n**1. Evening Collection Route** — Add ₹4,800/month in revenue.\n\n**2. Value-Added Products** — Paneer/curd processing can add 40% margins.\n\n**3. Digital Payments** — Your 91% UPI adoption improves credit access.\n\n**Target:** Reach ₹55,000/month revenue within 3 months.";
  }
  if (query.includes('scheme') || query.includes('government') || query.includes('govt')) {
    return "Here are government schemes you're eligible for based on your digital twin profile:\n\n**1. Rashtriya Gokul Mission** — Up to ₹50,000 subsidy for breed improvement.\n\n**2. PM Kisan Samman Nidhi** — ₹6,000/year direct benefit. Apply before Aug 30.\n\n**3. National Livestock Mission** — Training + ₹10,000 starter support.\n\n**4. NABARD Dairy DEDS** — 25% capital subsidy on milk processing equipment.";
  }
  
  return "I've analyzed your financial health score of **78/100**. Your cash flow is healthy (net margin +8.2%).\n\nTo optimize further:\n• **Lock in fodder prices** to guard against inflation\n• **Explore evening milk collection** for additional revenue\n• **Apply for relevant NABARD subsidies**\n\nWould you like to know about **loan options**, **cost reduction strategies**, or **government schemes**?";
}
