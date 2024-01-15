<script setup>
    import { ref } from 'vue'
    import { showDialog, closeDialog } from '/src/components/dialog.js'

    const root = ref()
    const open = ref(false)

    const show = async options => {
        open.value = true
        requestAnimationFrame(() => showDialog(root.value, options))
    }

    const close = async () => {
        await closeDialog(root.value)
        open.value = false
    }

    defineExpose({
        show,
        close
    })
</script>

<template>
    <dialog v-if="open" ref="root" class="c-dialog" @c-dialog:dismiss="open = false">
        <slot :close="close"></slot>
    </dialog>
</template>
