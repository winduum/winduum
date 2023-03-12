<script setup>
    // to add support for :has selector for unsupported browsers
    if (typeof CSS !== 'undefined') {
        !CSS.supports('selector(:has(*))') && (async() => (await import('css-has-pseudo/browser')).default(document))()
    }
</script>

<template>
    <main class="p-sm">
        <NuxtPage />
    </main>
</template>

<style>
    @import "winduum/src/base/index.css";
    @import "winduum/src/tailwind.css";
</style>
