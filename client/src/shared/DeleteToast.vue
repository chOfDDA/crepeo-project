<template>
    <div class="custom-toast">
        <p>Are you sure you want to delete this post?</p>
        <div class="toast-actions">
            <button class="confirm-btn" @click="$emit('confirm')">Yes, delete</button>
            <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue-sonner';

const props = defineProps({
    onConfirm: Function,
    toastId: [String, Number]
});

function confirm() {
    props.onConfirm?.();
    toast.dismiss();
}

function cancel() {
    console.log('Delete cancelled');
    toast.dismiss();
}
</script>

<style scoped>
.custom-toast {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.toast-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.confirm-btn,
.cancel-btn {
    padding: 0.3rem 0.75rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
}

.confirm-btn {
    background-color: #e74c3c;
    color: white;
}

.cancel-btn {
    background-color: #eee;
    color: #333;
}
</style>
