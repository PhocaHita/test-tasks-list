<template lang="pug">
.task-item
    .field {{item.id}}
    .field {{item.name}}
    .field {{item.description}}
    .field {{item.status}}
    .field {{item.date}}
    .task-actions
        .button
            .task-button.-change Change
        .button
            .task-button.-delete Delete
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            item: Object
        }
    }
</script>

<style lang="scss">
    .tasks-item{
        width: 100%;
        height: 100%;
        border-radius: 50px;
        overflow: hidden;
        box-shadow: 0 5px 10px rgba(0,0,0, .5);
        & > .field{
            margin-bottom: 10px;
        }
    }

    .task-actions{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 -10px;
        & > .button{
            flex-basis: 50%;
            width: 100%;
            padding: 0 10px;
        }
    }

    .task-button{
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        text-align: center;
        border-radius: 50px;
        padding: 10px 15px;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        color: white;
        transition: all .2s ease-in-out;
        &:hover{
            opacity: .8;
        }
        &.-change{
            background-color: sienna;
        }
        &.-delete{
            background-color: maroon;
        }
        &.-add{
            background-color: darkolivegreen;
        }
        &.-create{
            background-color: forestgreen;
        }
    }
</style>
