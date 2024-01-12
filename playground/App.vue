<script setup>
    import { ref } from 'vue'
    import Dialog from './components/dialog.vue'
    import DialogMain from './components/dialog/main.vue'
    import DialogBasic from './components/dialog/basic.vue'
    import UiBtn from './components/ui/btn.vue'

    const dialogMain = ref()
    const dialogBasic = ref()
</script>

<template>
    <UiBtn variant="wide" size="lg" @click="dialogMain.root.show()">Button</UiBtn>
    <UiBtn variant="wide" size="lg" @click="dialogBasic.show()">Button</UiBtn>
    <UiBtn>Button</UiBtn>

    <Teleport to="body">
        <DialogMain ref="dialogMain" heading="Test" />
        <Dialog ref="dialogBasic">
            <DialogBasic heading="Test"></DialogBasic>
        </Dialog>
    </Teleport>
</template>

<style scoped>
    @import "tailwindcss/utilities";
    @import "../src/ui/btn/index.css";
</style>
