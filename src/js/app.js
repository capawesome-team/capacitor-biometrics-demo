import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import {
  requireBiometricAuth,
  getBiometricErrorMessage,
} from './biometrics.js';
import { LOCK_ICON } from './icons.js';

function getLockScreenHTML(errorMessage, buttonLabel) {
  const hint = errorMessage ? '' : 'Use Face ID or passcode to open the app.';
  return `
    <div class="lock-screen">
      <div class="lock-screen__icon">${LOCK_ICON}</div>
      <h2 class="lock-screen__title">Welcome back</h2>
      ${hint ? `<p class="lock-screen__hint">${hint}</p>` : ''}
      ${errorMessage ? `<p class="lock-screen__error">${errorMessage}</p>` : ''}
      <button type="button" class="btn btn--primary" id="auth-btn">${buttonLabel}</button>
    </div>
  `;
}

function getHomeHTML() {
  return `
    <header class="header">
      <h1>Capawesome Biometrics Demo</h1>
    </header>
    <main class="home">
      <section class="home__hero">
        <p class="home__greeting text-muted">Welcome back</p>
        <p class="home__tagline">You have successfully authenticated with Biometrics.</p>
      </section>
      <section class="home__section">
        <h2 class="section-title">This app</h2>
        <div class="card">
          <p>Demo app for <a href="https://capawesome.io/plugins/biometrics/" target="_blank" rel="noopener" class="link">Biometrics</a> and Capacitor — built with VanillaJS.</p>
        </div>
      </section>
      <section class="home__section">
        <h2 class="section-title">Quick links</h2>
        <a href="https://capawesome.io/plugins/biometrics/" target="_blank" rel="noopener" class="link-block">Biometrics plugin docs</a>
      </section>
    </main>
  `;
}

customElements.define(
  'app-root',
  class extends HTMLElement {
    constructor() {
      super();
      if (Capacitor.isNativePlatform()) {
        // On native we show the lock screen.
        this.innerHTML = getLockScreenHTML('', 'Log in');
        SplashScreen.hide();
        this.querySelector('#auth-btn').addEventListener('click', () =>
          this.authenticate(),
        );
      } else {
        // On web we go straight to the home screen, no lock screen.
        this.showHome();
        SplashScreen.hide();
      }
    }

    async authenticate() {
      try {
        await requireBiometricAuth();
        this.showHome();
      } catch (err) {
        const message = getBiometricErrorMessage(err.code);
        this.innerHTML = getLockScreenHTML(message, 'Try again');
        this.querySelector('#auth-btn').addEventListener('click', () =>
          this.authenticate(),
        );
      }
    }

    showHome() {
      this.innerHTML = getHomeHTML();
    }
  },
);
