// ============================================
// SCREEN 1: SPLASH
// ============================================

export function renderSplash() {
  // Generate particles
  let particles = '';
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 2 + Math.random() * 4;
    const delay = Math.random() * 6;
    const dur = 4 + Math.random() * 4;
    particles += `<div class="splash-particle" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${dur}s"></div>`;
  }

  // Connection lines SVG
  const lines = `<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.08" xmlns="http://www.w3.org/2000/svg">
    <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="white" stroke-width="0.5"/>
    <line x1="50%" y1="20%" x2="80%" y2="35%" stroke="white" stroke-width="0.5"/>
    <line x1="30%" y1="60%" x2="60%" y2="50%" stroke="white" stroke-width="0.5"/>
    <line x1="60%" y1="50%" x2="75%" y2="70%" stroke="white" stroke-width="0.5"/>
    <line x1="15%" y1="80%" x2="45%" y2="75%" stroke="white" stroke-width="0.5"/>
  </svg>`;

  return `
    <div class="splash-screen screen">
      <div class="splash-particles">${particles}${lines}</div>
      <div class="splash-logo-wrap">
        <span class="material-symbols-rounded splash-icon anim-float">psychiatry</span>
        <h1 class="splash-title">RuralMind AI</h1>
        <p class="splash-tagline">Predict • Explain • Prevent • Prosper</p>
      </div>
      <button class="splash-btn anim-slide-up" onclick="window.__navigate('login')" style="animation-delay:0.5s;animation-fill-mode:both">
        Get Started
        <span class="material-symbols-rounded" style="font-size:18px;margin-left:4px">arrow_forward</span>
      </button>
      <div class="splash-wave"></div>
    </div>`;
}
