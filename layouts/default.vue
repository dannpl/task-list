<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/Header';
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
.container {
  min-width: 100% !important;
  width: 100% !important;
  max-width: 100% !important;
  padding-left: 56px !important;
  height: calc(100vh - 48px);
}
.v-label {
  font-size: 11px;
}
</style>
