<template lang="pug">
.task-form
    .field.task-field
        .label {{staticText.id}}
        input.field(:value="currentItem.id" disabled)
    .field.task-field
        .label {{staticText.name}}
        input.field(:value="currentItem.name")
    .field.task-field.-textarea
        .label {{staticText.description}}
        .field
            textarea.task-textarea(:value="currentItem.description")
    .field.task-field.-select
        .label {{staticText.status}}
        select.field
            option(:selected="currentItem.status = 0") новая
            option(:selected="currentItem.status = 1") в работе
            option(:selected="currentItem.status = 2") выполнена
    .field.task-field
        .label {{staticText.date}}
        input.field(:value="currentItem.date" disabled)
    .task-actions
        .button
            .task-button.-create(v-if="isAdd") {{staticText.create}}
            .task-button.-change(v-else) {{staticText.change}}
        .button
            .task-button.-delete {{staticText.delete}}
</template>

<script>
    export default {
        name: 'TaskItem',
        props: {
            item: Object,
            isAdd: Boolean
        },
        data() {
            return {
                staticText: {
                    id: 'ID',
                    name: 'Имя',
                    description: 'Описание',
                    status: 'Статус',
                    date: 'Дата',
                    change: 'Изменить',
                    create: 'Создать',
                    delete: 'Удалить',
                },
                currentItem: {},
            }
        },
        methods: {
            checkCurrentItem(){
                this.currentItem.id = this.item.id ? this.item.id : 1;
                this.currentItem.name = this.item.name ? this.item.name : '';
                this.currentItem.description = this.item.description ? this.item.description : '';
                this.currentItem.status = this.item.status ? this.item.status : 0;
                this.currentItem.date = this.item.date ? this.item.date : this.getCurrentDate();
            },
            getCurrentDate(){
                return Math.floor(Date.now() / 1000);
            }
        },
        beforeMount() {
            this.checkCurrentItem();
        }
    }
</script>

<style lang="scss">
    .task-form{
        max-width: 600px;
        margin: 0 auto;
        & > .field{
            margin-bottom: 20px;
        }
    }

    .task-field{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-align: left;
        &,
        & > .field,
        & > .label{
            flex-basis: 100%;
            width: 100%;
        }

        & > .label{
            font-size: 20px;
            flex-basis: 500px;
            margin-bottom: 8px;
        }
        & > .field{
            font-size: 18px;
            width: 100%;
            line-height: 1;
            border: 0;
            height: 30px;
            padding: 10px 20px;
            border-radius: 30px 30px 0 0;
            outline: none;
            box-shadow: 0 -1px 3px rgba(0,0,0, .8);
            &[disabled] {
                background: rgba(0,0,0, .2);
            }
        }

        &.-textarea{
            & > .field{
                height: 60px;
            }
        }

        &.-select{
            & > .field {
                height: 50px;
                appearance: none;
                transition: all .2s ease-in-out;
            }
        }
    }

    .task-textarea{
        width: 100%;
        height: 100%;
        font: inherit;
        resize: none;
        border: 0;
        outline: none;
        overflow:hidden;
    }
</style>
