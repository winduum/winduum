<script setup>
    import { ref } from 'vue'
    import Dialog from '../dialog.vue'

    const root = ref()

    defineProps(['heading'])

    defineExpose({
        root
    })
</script>

<template>
    <Dialog ref="root" class="c-dialog-main">
        <div class="c-dialog-content">
            <div class="flex-between">
                {{heading}}
                <button @click="root.close()">close</button>
            </div>
        </div>
    </Dialog>
</template>
