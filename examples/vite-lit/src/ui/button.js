import { LitElement, unsafeCSS, css, html } from 'lit'
import UiBtnCss from 'winduum/src/ui/btn/index.css?inline'

export class UiButton extends LitElement {
    constructor () {
        super()

        this.role = 'button'
        this.tabIndex = '0'
    }

    render () {
        return html`
          <a href="#" title="test"><slot></slot></a>
        `
    }

    static get styles () {
        return [
            css`
              :host, * {
                box-sizing: border-box;
              }
              
              a {
                display: contents;
                color: inherit;
                
                &::before {
                  position: absolute;
                  inset: 0;
                  content: "";
                }
              }
              
            `, unsafeCSS(
                UiBtnCss.replaceAll('.ui-btn', ':host').replace(/:host((?! \{).*?[^{]+(?=\s*{))/g, ':host($1)')
            )
        ]
    }
}

window.customElements.define('ui-button', UiButton)
