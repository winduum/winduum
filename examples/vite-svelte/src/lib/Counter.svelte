<script>
  import Button from './Button.svelte'

  let count = $state(0)

  const increment = () => {
    count += 1
  }
</script>

<Button onclick={increment}>
  count is {count}
</Button>
