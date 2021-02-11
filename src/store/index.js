import {createStore} from 'vuex';

export default createStore({
    state: {
        lastID: 0,
        changingTask: {},
        tasks: [],
    },
    mutations: {
        SET_OLD_DATA(state, data) {
            state.lastID = data.lastID;
            state.changingTask = data.changingTask;
            state.tasks = data.tasks;
        },
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
        updateStorage({state}){
            let storageData = JSON.stringify(state);
            localStorage.setItem('state', storageData);
        },

        setOldData({commit}, data){
            commit('SET_OLD_DATA', data);
        },

        async updateLastID({commit, dispatch}, id) {
            await commit('UPDATE_LAST_ID', id);
            dispatch('updateStorage');
        },

        async setChangingTask({commit, getters, dispatch}, id) {
            let tasksArr = [... getters.getTasks],
                task;

            task = tasksArr.filter(el => {
                return el.id === id;
            });

            await commit('SET_CHANGING_TASK', task[0]);
            dispatch('updateStorage');
        },

        async addTask({commit, dispatch}, task) {
            await commit('ADD_TASK', task);
            dispatch('updateStorage');
        },

        async editTask({commit, getters, dispatch}, task) {
            let tasksArr = [... getters.getTasks];

            tasksArr = [...tasksArr.map(el => {
                if (el.id === task.id){
                    return task;
                } else {
                    return el;
                }
            })];

            await commit('CHANGE_TASKS', tasksArr);
            dispatch('updateStorage');
        },

        async deleteTask({commit, getters, dispatch}, task,) {
            let tasksArr = [... getters.getTasks];

            tasksArr = [...tasksArr.filter(el => {
                if (el.id !== task.id){
                    return el;
                }
            })];

            await commit('CHANGE_TASKS', tasksArr);
            dispatch('updateStorage');
        },
    },
});
