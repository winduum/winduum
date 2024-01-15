<script setup>
    import { ref } from 'vue'
    import Dialog from '../dialog.vue'
    import UiBtn from '../ui/btn.vue'

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
                <div class="ui-heading">{{heading}}</div>
                <UiBtn variant="muted square" class="accent-main" @click="root.close()">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </UiBtn>
            </div>
        </div>
    </Dialog>
</template>
