<script setup lang="ts">
    import { ref } from 'vue'
    import Dialog from '../dialog.vue'

    interface Props {
        heading?: string
    }

    defineProps<Props>()

    const root = ref()
    const data = ref<Props>({})

    defineExpose({
        root,
        data
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
