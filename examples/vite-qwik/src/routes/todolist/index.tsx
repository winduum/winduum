import { component$ } from '@builder.io/qwik';
import { type DocumentHead, loader$, action$, zod$, z, Form } from '@builder.io/qwik-city';

import UiBtn from '../../components/ui/btn'

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const useListLoader = loader$(() => {
  return list;
});

export const useAddToListAction = action$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string(),
  })
);

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();

  return (
    <>
      <h1>Form Action TODO list</h1>
      <ul>
        {list.value.map((item) => (
          <li>{item.text}</li>
        ))}
      </ul>
      <Form action={action} spaReset>
        <input type="text" name="text" required />
        <UiBtn type="submit">Add item</UiBtn>
      </Form>
      <p>This little app works even when JavaScript is disabled.</p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
