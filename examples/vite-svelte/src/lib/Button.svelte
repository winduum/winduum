<script>
  let { children, ...props } = $props()
</script>

<button class="x-button" {...props}>
  {@render children?.()}
</button>
