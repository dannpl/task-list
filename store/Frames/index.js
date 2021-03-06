import Repository from './../../services/repository';

const api = new Repository();
// GLOBAL Module
const getDefaultState = () => {
  return {
    frames: []
  };
};

export const state = getDefaultState;

export const mutations = {
  SET_FRAMES(state, data) {
    state.frames = data;
  },
  UPDATE_LIST(state, data) {
    state = data.map((item, i) => {
      item.order = i;
    });
  },
  ADD_NEW_FRAME(state, obj) {
    state.frames.push(obj);
  },
  CANCEL_NEW_FRAME(state) {
    state.frames.pop();
  },
  EDIT_FRAME(state, obj) {
    state.frames.map(item => {
      if (item.id === obj.id) item.title = obj.title;
    });
  },
  EDIT_TASK(state, obj) {
    state.frames.map(item => {
      if (item.id === obj.frame_id) {
        const temp = item.todos;
        item.todos = [];
        temp.map(todo => {
          if (todo.id === obj.id) {
            todo = obj;
          }
          item.todos.push(todo);
        });
      }
    });
  },
  DELETE_FRAME(state, obj) {
    const index = state.frames.findIndex(item => item.id === obj.id);

    state.frames.splice(index, 1);
  },
  CHANGE_TODO_ORDER(state, data) {
    state.frames.map(item => {
      if (item.id === data.frameId) {
        item.todos = data.newArray;
      }
    });

    if (!data.item.added && !data.item.moved) return;

    data.newArray.map((item, i) => {
      const payload = item;

      if (data.item.added) {
        if (item.id === data.item.added.element.id)
          payload.frame_id = data.frameId;
      }

      api.editTodo({ ...payload, order: i });
    });
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  }
};

export const getters = {
  getFrames: state => {
    return state.frames;
  }
};

export const actions = {
  setFrames({ commit }, data) {
    commit('SET_FRAMES', data);
  },
  addNewFrame({ commit }, obj) {
    commit('ADD_NEW_FRAME', obj);
  },
  cancelNewFrame({ commit }) {
    commit('CANCEL_NEW_FRAME');
  },
  editFrame({ commit }, obj) {
    commit('EDIT_FRAME', obj);
  },
  deleteFrame({ commit }, obj) {
    commit('DELETE_FRAME', obj);
  },
  updateList({ commit }, data) {
    commit('UPDATE_LIST', data);
  },
  editTask({ commit }, obj) {
    commit('EDIT_TASK', obj);
  },
  changeTodoOrder({ commit }, data) {
    commit('CHANGE_TODO_ORDER', data);
  },
  resetState({ commit }) {
    commit('resetState');
  }
};
