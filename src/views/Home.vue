<template lang="pug">
.main-container
    template(v-if="taskList.length")
        .tasks-list
            .item(v-for="task in taskList")
                TaskItem(:item="task"  @trigger-refresh="checkTasksList")

    .tasks-menu
        .task-actions
            .button
                router-link.task-button.-add(to="/add") Add
</template>

<script>
    import TaskItem from '/src/components/TaskItem.vue';

    export default {
        name: 'App',
        components: {
            TaskItem,
        },
        data() {
            return {
                taskList: [],
            };
        },
        methods: {
            checkTasksList(){
                this.taskList = this.$store.getters.getTasks;
            }
        },
        beforeMount() {
            this.checkTasksList();
        }
    };
</script>

<style lang="scss">
    .main-container{
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 50px 0;
    }

    .tasks-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px -20px;

        & > .item {
            flex-basis: 25%;
            width: 100%;
            padding: 0 10px;
            margin-bottom: 20px;
        }
    }

    .tasks-menu {
        margin-top: 50px;

        &:first-child {
            margin-top: 0;
        }
    }
</style>
