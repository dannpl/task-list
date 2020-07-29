<template>
  <div>
    <v-app-bar :color="color" dense dark>
      <v-toolbar-title>nTodo</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="wrapper-menu">
        <v-switch
          class="mode"
          v-model="isDark"
          @change="changeMode"
          :color="isDark ? 'white' : 'black'"
          label="Dark Mode"
        ></v-switch>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list class="list">
            <v-list-item-title>Change Colors</v-list-item-title>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :permanent="permanent"
      absolute
      dark
      class="sidebar"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Daniel Cardoso</v-list-item-title>
            <v-list-item-subtitle>Front-end</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isDark: false,
      drawer: true,
      items: [{ title: 'Board', icon: 'mdi-view-dashboard' }],
      color: 'primary',
      permanent: false,
      miniVariant: true,
      expandOnHover: true
    };
  },
  mounted() {
    const isDarkStorage = localStorage.getItem('isDark');

    this.isDark = isDarkStorage === 'true';
    this.changeMode();
  },
  methods: {
    changeMode() {
      this.$store.dispatch('setDarkMode', {
        dark: this.isDark,
        vuetify: this.$vuetify
      });

      localStorage.setItem('isDark', this.isDark);
    }
  },
  computed: {
    getIsDark() {
      return this.$store.getters.getIsDark;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: calc(100vh - 48px) !important;
  top: unset !important;
  bottom: 0 !important;
}

.list {
  .v-list-item__title {
    padding: 0 15px;
    cursor: pointer;
  }
}

.wrapper-menu {
  display: flex;
  align-items: baseline;
  margin-top: 10px;

  .v-input__slot {
    .v-label {
      font-size: 11px !important;
    }
  }
}
</style>
