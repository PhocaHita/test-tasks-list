<template lang="pug">
.main-container
    TaskItemForm(:item="{}" :isAdd="true")
</template>

<script>
    import TaskItemForm from '/src/components/TaskItemForm.vue';

    export default {
        name: 'Add',
        components: {
            TaskItemForm,
        }
    };
</script>