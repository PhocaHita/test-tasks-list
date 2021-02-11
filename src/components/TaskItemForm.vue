<template lang="pug">
.task-form
    .field.task-field
        .label {{staticText.id}}
        input.field(:value="currentItem.id" disabled)
    .field.task-field
        .label {{staticText.name}}
        input.field(v-model="currentItem.name" :class="{'-red': fieldErrors.name}")
        .error(v-if="fieldErrors.name") {{staticText.errors.name}}
    .field.task-field.-textarea
        .label {{staticText.description}}
        .field
            textarea.task-textarea(v-model="currentItem.description")
    .field.task-field.-select
        .label {{staticText.status}}
        select.field(v-model="currentItem.status" :class="fieldColorModier || {'-red': fieldErrors.status}")
            option(:selected="currentItem.status === 0" :value="0" disabled)
            option(:selected="currentItem.status === 1" :value="1") {{staticText.statusOptions.new}}
            option(:selected="currentItem.status === 2" :value="2") {{staticText.statusOptions.inProgress}}
            option(:selected="currentItem.status === 3" :value="3") {{staticText.statusOptions.done}}
        .error(v-if="fieldErrors.status") {{staticText.errors.status}}
    .field.task-field
        .label {{staticText.date}}
        input.field(:value="currentItem.date" disabled)
    .task-actions
        template(v-if="isAdd")
            .button
                .task-button.-create(@click="checkComplite('add')") {{staticText.create}}
            .button
                router-link.task-button.-delete(to="/") {{staticText.cancel}}
        template(v-else)
            .button
                .task-button.-change(@click="checkComplite('edit')") {{staticText.change}}

            .button
                .task-button.-delete(@click="deleteTask") {{staticText.delete}}
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
                    name: 'Имя*',
                    description: 'Описание',
                    status: 'Статус*',
                    date: 'Дата',
                    change: 'Изменить',
                    create: 'Создать',
                    delete: 'Удалить',
                    cancel: 'Отмена',
                    errors: {
                        name: 'Необходимо именовать задачу',
                        status: 'Необходимо выбрать статус задачи'
                    },
                    statusOptions: {
                        new: 'Новая',
                        inProgress: 'В работе',
                        done: 'Выполнена',
                    }
                },
                fieldErrors: {
                    name: false,
                    status: false
                },
                currentItem: {},
                fieldColorModier: null
            }
        },
        watch: {
            'currentItem.status': function(newStatusId) {
               this.setSelectColor(newStatusId);
            }
        },
        methods: {
            checkCurrentItem(){
                this.currentItem.id = this.item.id ? this.item.id : this.checkLastID() + 1;
                this.currentItem.name = this.item.name ? this.item.name : '';
                this.currentItem.description = this.item.description ? this.item.description : '';
                this.currentItem.status = this.item.status ? this.item.status : 0;
                this.currentItem.date = this.item.date ? this.item.date : this.getCurrentDate();
            },
            getCurrentDate(){
                return Math.floor(Date.now() / 1000);
            },
            checkLastID(){
                return this.$store.getters.getLastID;
            },
            setSelectColor(statusId){
                switch (statusId) {
                    case 1:
                        this.fieldColorModier = '-green';
                        break;
                    case 2:
                        this.fieldColorModier = '-orange';
                        break;
                    case 3:
                        this.fieldColorModier = '-blue';
                        break;
                }
            },
            checkComplite(type){
                this.fieldErrors.name = !this.currentItem.name;
                this.fieldErrors.status = !this.currentItem.status;

                if (this.fieldErrors.name || this.fieldErrors.status) return false;

                switch (type) {
                    case 'add':
                         this.createTask();
                        break;
                    case 'edit':
                        this.editTask();
                        break;
                }
            },
            deleteTask(){
                this.$store.dispatch('deleteTask', this.currentItem);
                this.$router.push('/');
            },
            createTask(){
                this.$store.dispatch('updateLastID', this.currentItem.id);
                this.$store.dispatch('addTask', this.currentItem);
                this.$router.push('/');
            },
            editTask(){
                this.$store.dispatch('editTask', this.currentItem);
                this.$router.push('/');
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
            margin-bottom: 30px;
        }
    }

    .task-field{
        position: relative;
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
                background: rgba(0,0,0, .1);
            }
            &.-green{
                background-color: rgba(143, 188, 143, .3);
            }
            &.-orange{
                background-color: rgba(255, 165, 0, .3);
            }
            &.-blue{
                background-color: rgba(135, 206, 250, 0.3);
            }
            &.-red{
                background-color: rgba(255, 0, 0, 0.3);
            }
        }

        & > .error {
            position: absolute;
            top: calc(100% + 5px);
            left: 0;
            color: red;
            font-size: 12px;
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
