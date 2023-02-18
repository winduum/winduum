import { component$, useStylesScoped$, Slot } from '@builder.io/qwik'
import styles from 'winduum/src/ui/btn.css?inline'

export default component$((props) => {
    useStylesScoped$(styles);

    return (
        <button className="ui-btn" {...props}>
            <Slot />
        </button>
    );
});
