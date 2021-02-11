<template lang="pug">
.tasks-item(:class="setColor(item.status)")
    .field.tasks-item-field
        .text {{staticText.id}}
        .value {{item.id}}

    .field.tasks-item-field
        .text {{staticText.name}}
        .value {{item.name}}

    .field.tasks-item-field
        .text {{staticText.description}}
        .value {{item.description}}

    .field.tasks-item-field
        .text {{staticText.status}}
        template(v-for="status in staticText.statusOptions")
            .value(v-if="status.id === item.status") {{status.text}}

    .field.tasks-item-field
        .text {{staticText.date}}
        .value {{item.date}}

    .task-actions
        .button
            .task-button.-change(@click="triggerChange") {{staticText.change}}
        .button
            .task-button.-delete(@click="deleteTask") {{staticText.delete}}
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            item: Object
        },
        data() {
            return {
                staticText: {
                    id: 'ID:',
                    name: 'Имя:',
                    description: 'Описание:',
                    status: 'Статус:',
                    date: 'Дата:',
                    change: 'Изменить',
                    delete: 'Удалить',
                    statusOptions: [
                        {id: 1, text: 'Новая'},
                        {id: 2, text: 'В работе'},
                        {id: 3, text: 'Выполнена'},
                    ]
                },
            }
        },
        methods: {
            setColor(statusId){
                switch (statusId) {
                    case 1:
                        return  '-green';
                    case 2:
                        return  '-orange';
                    case 3:
                        return  '-blue';
                }
            },
            triggerChange(){
                this.$store.dispatch('setChangingTask', this.item.id);
                this.$router.push('/edit');
            },
            deleteTask(){
                this.$store.dispatch('deleteTask', this.item);
                this.$emit('triggerRefresh');
            },
        }
    }
</script>

<style lang="scss">
.tasks-item{
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0,0,0, .5);
    padding: 20px 30px;
    &.-green{
        background-color: rgba(143, 188, 143, .3);
    }
    &.-orange{
        background-color: rgba(255, 165, 0, .3);
    }
    &.-blue{
        background-color: rgba(135, 206, 250, 0.3);
    }
    & > .field{
        margin-bottom: 10px;
    }
}

.tasks-item-field{
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .text{
        color: rgba(0,0,0, .5);
        padding-right: 5px;
    }
    & > .value{
        font-weight: bold;
        padding-left: 5px;
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
    display: block;
    max-width: 200px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50px;
    padding: 10px 15px;
    font-weight: bold;
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
