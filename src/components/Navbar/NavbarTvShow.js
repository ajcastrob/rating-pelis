import styles from "./NavbarTvShow.css" with { type: "css" };

export class NavbarTvShow extends HTMLElement {
  srcLogo = "./logo.svg";
  srcgitHub = "./github.svg";
  srcLinkId = "./linkedin.svg";
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
    <nav class="nav__principal">
      <div class="div-nav">
         <a>
           <img src="${this.srcLogo}"  alt="image-logo">
        </a>
      
        <div class="nav__social">
           <ul>
               <li><a href="#" class="nav__social-link"><img src="${this.srcgitHub}" alt="github-logo"></a></li>
                <li><a href="#" class="nav__social-link"><img src="${this.srcLinkId}" alt="linkedin-logo"></a></li>
            </ul>
      </div>


      </div>
    </nav>
    `;

    this.shadowRoot.setHTMLUnsafe(html);
  }
}
