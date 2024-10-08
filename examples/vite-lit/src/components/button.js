import { LitElement, unsafeCSS, css, html } from 'lit'
import ButtonCss from 'winduum/src/components/button/index.css?inline'

export class Button extends LitElement {
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
                // needs to be rewritten as vitePlugin
                ButtonCss.replaceAll('.x-button', ':host').replace(/:host((?! \{).*?[^{]+(?=\s*{))/g, ':host($1)')
            )
        ]
    }
}

window.customElements.define('x-button', Button)
