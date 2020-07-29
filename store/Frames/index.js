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
  resetState({ commit }) {
    commit('resetState');
  }
};
