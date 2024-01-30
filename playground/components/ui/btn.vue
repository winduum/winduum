<script setup>
    import { showRipple } from '/src/utilities/ripple'

    defineProps({
        variant: String,
        state: String,
        size: String
    })
</script>

<template>
    <button class="ui-btn" :class="[variant, state, size]" @click="showRipple"><slot></slot><div class="ripple" /></button>
</template>
