<template>
  <drop class="drop list" @drop="onDrop(list, ...arguments)">
    <p>{{ title }}</p>
    <drag
      v-for="(item, i) in list"
      class="drag"
      :key="i"
      :transfer-data="{ item: item, list: list, example: 'lists' }"
    >
      <v-card class="mx-auto card">
        <v-card-text>
          <p class="status" :style="{ color: item.open ? 'green' : 'red' }">
            ●
          </p>
          <p class="title text--primary">
            {{ item.title }}
          </p>
          <div class="desc text--primary">
            {{ item.description }}
          </div>
        </v-card-text>
      </v-card>
    </drag>
  </drop>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';

export default {
  components: { Drag, Drop },
  props: ['list', 'handleDrop', 'title'],
  methods: {
    onDrop(list, arg) {
      this.$emit('handleDrop', { toList: list, data: arg });
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: auto;
  border-radius: 4px;
  padding: 10px 12px 1px 12px;
  background-color: rgb(244, 245, 247);
}

.drag {
  cursor: pointer;
  border-radius: 4px;
  background-color: white;

  .card {
    margin-bottom: 15px;

    .v-card__text {
      padding: 5px 10px !important;

      .status {
        top: 0px;
        font-size: 18px !important;
        position: absolute;
        right: 5px;
      }

      .title {
        font-size: 14px !important;
        margin-bottom: 0px !important;
      }

      .desc {
        font-size: 13px !important;
      }
    }
  }
}
</style>
