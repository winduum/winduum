<script setup lang="ts">
    import { ref } from 'vue'
    import DialogMain from './components/dialog/main.vue'
    import UiBtn from './components/ui/btn.vue'

    const dialogMain = ref()

    const showDialog = () => {
        dialogMain.value.data = {
            heading: 'Hello there'
        }

        dialogMain.value.root.show()
    }
</script>

<template>
    <UiBtn variant="wide" size="lg" @click="showDialog">Button</UiBtn>
    <UiBtn>Button</UiBtn>

    <Teleport to="body">
        <DialogMain ref="dialogMain" v-bind="dialogMain?.data" />
    </Teleport>
</template>

<style scoped>
    @import "tailwindcss/utilities";
    @import "../src/ui/btn/index.css";
</style>
