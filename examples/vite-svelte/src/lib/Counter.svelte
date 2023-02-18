<script>
  import UiBtn from './ui/Btn.svelte'

  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<UiBtn on:click={increment}>
  count is {count}
</UiBtn>
