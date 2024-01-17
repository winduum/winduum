<script setup lang="ts">
    import { ref } from 'vue'
    import DialogMain from './components/dialog/main.vue'
    import UiBtn from './components/ui/btn.vue'

    const dialogMain = ref()

    const showDialog = () => {
        dialogMain.value.data = {
            heading: 'Hello there'
        }

        dialogMain.value.root.show({
            closable: true
        })
    }
</script>

<template>
    <div class="p-6">
        <UiBtn @click="showDialog">Open Dialog</UiBtn>
    </div>

    <Teleport to="body">
        <DialogMain ref="dialogMain" v-bind="dialogMain?.data" />
    </Teleport>
</template>

<style scoped>
    @import "tailwindcss/utilities";
</style>
