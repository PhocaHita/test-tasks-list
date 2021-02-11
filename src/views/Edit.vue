<template lang="pug">
.main-container
    TaskItemForm(:item="taskItem" :isAdd="false")
</template>

<script>
    import TaskItemForm from '/src/components/TaskItemForm.vue';

    export default {
        name: 'Edit',
        components: {
            TaskItemForm,
        },
        data() {
            return{
                taskItem: {}
            }
        },
        methods: {
            getCurrentTask(){
                this.taskItem = this.$store.getters.getChangingTask;
            }
        },
        beforeMount() {
            this.getCurrentTask();
        }
    };
</script>