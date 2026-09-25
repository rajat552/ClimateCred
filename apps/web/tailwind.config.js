/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ClimateTwin brand palette — climate + finance
        brand: {
          50: '#E8F5F0',
          100: '#C6E8DA',
          200: '#9DD5C0',
          300: '#6DC0A2',
          400: '#45AF8A',
          500: '#0F9D72',  // Primary green
          600: '#0B8462',
          700: '#096850',
          800: '#064D3C',
          900: '#033428',
        },
        // CVI visualization colors
        cvi: {
          'very-low': '#10B981',
          'low': '#84CC16',
          'moderate': '#F59E0B',
          'high': '#F97316',
          'very-high': '#EF4444',
        },
        // GVS visualization colors
        gvs: {
          'very-strong': '#10B981',
          'strong': '#22C55E',
          'moderate': '#F59E0B',
          'weak': '#F97316',
          'very-weak': '#EF4444',
        },
        // Dark mode surfaces
        dark: {
          bg: '#0A0F1C',
          surface: '#111827',
          card: '#1F2937',
          border: '#374151',
          text: '#F9FAFB',
          muted: '#9CA3AF',
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.03)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glow-green': '0 0 20px rgba(15, 157, 114, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0F9D72 0%, #0B8462 50%, #096850 100%)',
        'climate-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #0F9D72 100%)',
        'cvi-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #F59E0B 50%, #EF4444 100%)',
        'gvs-gradient': 'linear-gradient(135deg, #064D3C 0%, #0F9D72 100%)',
        'glass': 'rgba(255, 255, 255, 0.72)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'score-fill': 'scoreFill 1s ease-out forwards',
        'count-up': 'countUp 0.5s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(16px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        scoreFill: {
          'from': { strokeDashoffset: '283' },
          'to': { strokeDashoffset: 'var(--score-offset)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
