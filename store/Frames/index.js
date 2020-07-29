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
  DELETE_FRAME(state, obj) {
    const index = state.frames.findIndex(item => item.id === obj.id);

    state.frames.splice(index, 1);
  },
  CHANGE_TODO_ORDER(state, data) {
    console.log(data);
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
  changeTodoOrder({ commit }, data) {
    commit('CHANGE_TODO_ORDER', data);
  },
  resetState({ commit }) {
    commit('resetState');
  }
};
