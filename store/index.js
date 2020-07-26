// GLOBAL Module
const getDefaultState = () => {
  return {
    user: {},
  };
};

export const state = getDefaultState;

export const mutations = {
  SET_USERS(state, obj) {
    state.user = obj;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export const getters = {
  getUser: (state) => {
    return state.user;
  },
};

export const actions = {
  setServices({ commit }, obj) {
    commit("SET_USER", obj);
  },
  resetState({ commit }) {
    commit("resetState");
  },
};
