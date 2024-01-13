<script setup>
    import { ref } from 'vue'
    import DialogMain from './components/dialog/main.vue'
    import UiBtn from './components/ui/btn.vue'

    const dialogMain = ref()
</script>

<template>
    <UiBtn variant="wide" size="lg" @click="dialogMain.root.show()">Button</UiBtn>
    <UiBtn>Button</UiBtn>

    <Teleport to="body">
        <DialogMain ref="dialogMain" heading="Test" />
    </Teleport>
</template>

<style scoped>
    @import "tailwindcss/utilities";
    @import "../src/ui/btn/index.css";
</style>
