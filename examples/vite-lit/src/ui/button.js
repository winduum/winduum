import { LitElement, unsafeCSS, css, html } from 'lit'
import UiBtn from 'winduum/src/ui/btn/index.css?inline';

export class UiButton extends LitElement {
  constructor() {
    super()

    this.classList.add('ui-btn')
  }

  render() {
    return html`
      <a href="/">
        <slot></slot>
      </a>
    `
  }

  static get styles() {
    console.log(UiBtn)

    return [
      css`
        :host, :host * {
          box-sizing: border-box;
        }
        
        :where(a, button) {
          all: inherit;
          margin: calc(var(--ui-btn-py) * -1) calc(var(--ui-btn-px) * -1);
          cursor: pointer;
        }
        
        :root span {
          display: none;
        }
      `,
      unsafeCSS(UiBtn.replaceAll('.ui-btn', ':host'))
    ]
  }
}

window.customElements.define('ui-button', UiButton)
