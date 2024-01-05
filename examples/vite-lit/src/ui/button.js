import { LitElement, unsafeCSS, css, html } from 'lit'
import UiBtnCss from 'winduum/src/ui/btn/index.css?inline'

export class UiButton extends LitElement {
    constructor () {
        super()

        this.classList.add('interactive')
    }

    render () {
        return html`
          <a href="#" style="display: contents; color: inherit"><slot></slot></a>
        `
    }

    static get styles () {
        return [
            css`
              :host, * {
                box-sizing: border-box;
              }
            `, unsafeCSS(
                UiBtnCss.replaceAll('.ui-btn:', ':host(:').replaceAll(' {', ') {').replaceAll('.ui-btn)', ':host')
            )
        ]
    }
}

window.customElements.define('ui-button', UiButton)
