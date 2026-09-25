// ============================================
// ROUTER — Hash-based SPA navigation
// ============================================

let currentScreen = null;
let screenHistory = [];
const screenModules = {};

export function registerScreen(name, renderFn) {
  screenModules[name] = renderFn;
}

export function navigateTo(screenName, opts = {}) {
  const container = document.getElementById('screen-container');
  if (!container) return;

  if (currentScreen && !opts.replace) {
    screenHistory.push(currentScreen);
  }

  currentScreen = screenName;
  window.location.hash = screenName;

  // Transition
  container.style.opacity = '0';
  container.style.transform = 'translateX(10px)';

  setTimeout(() => {
    container.scrollTop = 0;
    if (screenModules[screenName]) {
      container.innerHTML = '';
      const screen = screenModules[screenName]();
      if (typeof screen === 'string') {
        container.innerHTML = screen;
      } else if (screen instanceof HTMLElement) {
        container.appendChild(screen);
      }
      // Initialize charts or interactive elements
      document.dispatchEvent(new CustomEvent('screen:rendered', { detail: { screen: screenName } }));
    }
    container.style.opacity = '1';
    container.style.transform = 'translateX(0)';
  }, 150);
}

export function goBack() {
  if (screenHistory.length > 0) {
    const prev = screenHistory.pop();
    navigateTo(prev, { replace: true });
  }
}

export function getCurrentScreen() {
  return currentScreen;
}

// Style the container for transitions
export function initRouter() {
  const container = document.getElementById('screen-container');
  if (container) {
    container.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  }

  // Handle browser back button
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== currentScreen && screenModules[hash]) {
      navigateTo(hash, { replace: true });
    }
  });
}
