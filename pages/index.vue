<template>
  <div class="container"></div>
</template>

<script>
import Repository from '@/services/repository';

export default {
  data() {
    return {
      api: new Repository()
    };
  },
  methods: {
    async getFrames() {
      const response = await this.api.getFrames();

      console.log(response.data);
    }
  },
  mounted() {
    this.getFrames();
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style lang="scss" scoped></style>
