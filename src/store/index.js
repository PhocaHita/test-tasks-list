import {createStore} from 'vuex';

export default createStore({
    state: {
        lastID: 0,
        changingTask: {},
        tasks: [],
    },
    mutations: {
        UPDATE_LAST_ID(state, id) {
            state.lastID = id;
        },
        SET_CHANGING_TASK(state, task) {
            state.changingTask = task;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        CHANGE_TASKS(state, tasks) {
            state.tasks = tasks;
        },
    },
    getters: {
        getLastID: state => {
            return state.lastID;
        },
        getTasks: state => {
            return state.tasks;
        },
        getChangingTask: state => {
            return state.changingTask;
        },
    },
    actions: {
        updateLastID({commit}, id) {
            commit('UPDATE_LAST_ID', id);
        },

        setChangingTask({commit, getters}, id) {
            let tasksArr = [... getters.getTasks],
                task;
            task = tasksArr.filter(el => {
                return el.id === id;
            });
            commit('SET_CHANGING_TASK', task[0]);
        },

        addTask({commit}, task) {
            commit('ADD_TASK', task);
        },

        editTask({commit, getters}, task) {
            let tasksArr = [... getters.getTasks];

            tasksArr = [...tasksArr.map(el => {
                if (el.id === task.id){
                    return task;
                } else {
                    return el;
                }
            })];

            commit('CHANGE_TASKS', tasksArr);
        },

        deleteTask({commit, getters}, task) {
            let tasksArr = [... getters.getTasks];

            tasksArr = [...tasksArr.filter(el => {
                if (el.id !== task.id){
                    return el;
                }
            })];

            commit('CHANGE_TASKS', tasksArr);
        },
    },
});
