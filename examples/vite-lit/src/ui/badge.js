import { LitElement, unsafeCSS, css, html } from 'lit'
import UiBadgeCss from 'winduum/src/ui/badge/index.css?inline'

export class UiBadge extends LitElement {
    render () {
        return html`<slot />`
    }

    static get styles () {
        return [
            css`
              :host, * {
                box-sizing: border-box;
              }
            `, unsafeCSS(
                UiBadgeCss.replaceAll('.ui-badge', ':host').replace(/:host((?! \{).*?[^{]+(?=\s*{))/g, ':host($1)')
            )
        ]
    }
}

window.customElements.define('ui-badge', UiBadge)
