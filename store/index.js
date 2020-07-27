// GLOBAL Module
const getDefaultState = () => {
  return {
    user: {},
    styledVars: {
      theme: {
        dark: false,
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c'
          },
          dark: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c'
          }
        }
      }
    }
  };
};

export const state = getDefaultState;

export const mutations = {
  SET_USERS(state, obj) {
    state.user = obj;
  },
  CHANGE_DARK(state, { dark, vuetify }) {
    state.styledVars.theme.dark = dark;

    setNewVuetify(state, vuetify);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  }
};

export const getters = {
  getUser: state => {
    return state.user;
  },
  getIsDark: state => {
    return state.styledVars.theme.dark;
  }
};

export const actions = {
  setServices({ commit }, obj) {
    commit('SET_USER', obj);
  },
  setDarkMode({ commit }, obj) {
    commit('CHANGE_DARK', obj);
  },
  resetState({ commit }) {
    commit('resetState');
  }
};

const setNewVuetify = (state, vuetify) => {
  vuetify.theme = state.styledVars.theme;
};
