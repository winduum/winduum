import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, useStylesScoped$, Slot } from '@builder.io/qwik';
import styles from 'winduum/src/ui/btn.css?inline';

export type HTMLButtonProps = QwikIntrinsicElements['button'];

export default component$((props: HTMLButtonProps) => {
    useStylesScoped$(styles);

    return (
        <button class="ui-btn" {...props}>
            <Slot />
        </button>
    );
});
