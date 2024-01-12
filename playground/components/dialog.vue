<script setup>
    import { showDialog, closeDialog } from '/src/components/dialog.js'
    import { ref } from 'vue'

    const root = ref()
    const isOpen = ref(false)

    const show = async () => {
        isOpen.value = true

        setTimeout(() => showDialog(root.value, { closable: false }))
    }

    const shouldClose = async ({ target, key }) => {
        if (key === 'Escape' || target.nodeName === 'DIALOG') {
            await close()
        }
    }

    const close = async () => {
        await closeDialog(root.value)

        isOpen.value = false
    }

    defineExpose({
        show,
        close
    })
</script>

<template>
    <dialog v-if="isOpen" ref="root" class="c-dialog" @keydown="shouldClose" @click="shouldClose">
        <slot :close="close"></slot>
    </dialog>
</template>
