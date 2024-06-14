<script setup>
    import { showRipple } from '/src/utilities/ripple'

    defineProps({
        variant: String,
        state: String,
        size: String
    })
</script>

<template>
    <button class="button" :class="[variant, state, size]" @click="showRipple"><slot></slot><div class="ripple" /></button>
</template>
