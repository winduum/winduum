import { component$, useStore } from '@builder.io/qwik';
import UiBtn from '../ui/btn'

export const Counter = component$(() => {
    const store = useStore({ count: 0 });

    return (
        <div className="card p-xl space-y-8">
            <p>Count: {store.count}</p>
            <p>
                <UiBtn onClick$={() => store.count++}>Increment</UiBtn>
            </p>
        </div>
    );
});
