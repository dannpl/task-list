// GLOBAL Module
const getDefaultState = () => {
  return {
    user: {},
    styledVars: {
      theme: {
        dark: true,
        themes: {
          light: {
            primary: '#2196f3',
            secondary: '#f4f5f7',
            accent: '#9c27b0',
            error: '#f44336',
            warning: '#ff9800',
            info: '#00bcd4',
            success: '#4caf50'
          },
          dark: {
            primary: '#2196f3',
            secondary: '#2196f3',
            accent: '#9c27b0',
            error: '#f44336',
            warning: '#ff9800',
            info: '#00bcd4',
            success: '#4caf50'
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
  setUser({ commit }, obj) {
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
