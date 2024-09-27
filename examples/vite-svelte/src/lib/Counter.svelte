<script>
  import Button from './Button.svelte'

  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<Button on:click={increment}>
  count is {count}
</Button>
