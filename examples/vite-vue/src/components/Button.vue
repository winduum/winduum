<script setup>
    defineProps({
        variant: String,
        state: String,
        size: String
    })
</script>

<template>
    <button class="x-button" type="button" :class="[variant, state, size]">
        <slot></slot>
    </button>
</template>
