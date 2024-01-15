<script setup>
    import { ref } from 'vue'
    import DialogMain from './components/dialog/main.vue'
    import UiBtn from './components/ui/btn.vue'

    const dialogMain = ref()
</script>

<template>
    <div class="p-6">
        <UiBtn @click="dialogMain.root.show({
            closable: true
        })">Open Dialog</UiBtn>
    </div>

    <Teleport to="body">
        <DialogMain ref="dialogMain" heading="Hello there!" />
    </Teleport>
</template>

<style scoped>
    @import "tailwindcss/utilities";
    @import "../src/ui/btn/index.css";
</style>
