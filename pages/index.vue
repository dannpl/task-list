<template>
  <div class="container">
    <v-alert class="alert" v-if="alert.show" :type="alert.type">{{
      alert.message
    }}</v-alert>
  </div>
</template>

<script>
import Repository from "@/services/repository";

export default {
  data() {
    return {};
  },
  methods: {
    getAllUsers() {
      this.api.getUsers().then(
        (res) => {
          this.$store.dispatch("setServices", res.data);
        },
        (error) => {
          this.alert;
          this.setAlert(true, "error", error.message);
        }
      );
    },
  },
  mounted() {
    this.getAllUsers();
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="scss" scoped></style>
