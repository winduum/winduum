<script setup>
    defineProps({
        variant: String,
        state: String,
        size: String
    })
</script>

<template>
    <button class="ui-btn" type="button" :class="[variant, state, size]">
        <slot></slot>
    </button>
</template>
