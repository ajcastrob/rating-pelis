import styles from "./NavbarTvShow.css" with { type: "css" };
import { GITHUB_PATH, LINKEDIN_PATH } from "./Constants";

export class NavbarTvShow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const html = /*html*/ `
    <nav class="nav" aria-label="Principal">
      <div class="nav__inner">

        <a href="https://github.com/ajcastrob/rating-pelis" class="nav__brand" aria-label="Rating Pelis — repositorio">
          <img src="./logo.svg" alt="" class="nav__logo-mark" />
          <span class="nav__wordmark">Rating.TVSHOW</span>
        </a>

        <div class="nav__status" aria-live="polite">
          <span class="nav__dot" aria-hidden="true"></span>
          <span class="nav__status-text">// CH 00 — STANDBY</span>
        </div>

        <ul class="nav__social" role="list">
          <li>
            <a href="https://github.com/ajcastrob" class="nav__social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="${GITHUB_PATH}"></path>
              </svg>
              <span class="nav__social-stamp">GITHUB</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/josé-castro-b600791a4/" class="nav__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="${LINKEDIN_PATH}"></path>
              </svg>
              <span class="nav__social-stamp">LINKEDIN</span>
            </a>
          </li>
        </ul>

      </div>
    </nav>
    `;
    this.shadowRoot.setHTMLUnsafe(html);
  }
}
