<template>
  <div class="container-dragDrop">
    <div class="container-list" v-for="(list, i) in lists" :key="i">
      <Frame
        :title="list.title"
        :list="list.todos"
        @handleDrop="handleDrop"
      ></Frame>
    </div>
  </div>
</template>

<script>
import Repository from '@/services/repository';
import Frame from '@/components/Frame';
import { Drag, Drop } from 'vue-drag-drop';

export default {
  components: { Drag, Drop, Frame },
  data() {
    return {
      lists: [
        {
          title: 'Todo',
          todos: [
            {
              title: 'My First Todo',
              description: 'Todo',
              frame_id: '5f0e24ba3f16db0373e04d70',
              open: true,
              order: 0
            },
            {
              title: 'My First Todo',
              description: 'Todo',
              frame_id: '5f0e24ba3f16db0373e04d70',
              open: true,
              order: 0
            },
            {
              title: 'My First Todo',
              description: 'Todo',
              frame_id: '5f0e24ba3f16db0373e04d70',
              open: true,
              order: 0
            }
          ]
        },
        {
          title: 'Doing',
          todos: []
        },
        {
          title: 'Done',
          todos: []
        },
        {
          title: 'Doing',
          todos: []
        },
        {
          title: 'Done',
          todos: []
        }
      ],
      api: new Repository()
    };
  },
  methods: {
    async getFrames() {
      const response = await this.api.getFrames();

      console.log(response);
    },
    handleDrop({ toList, data }) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort((a, b) => a > b);
      }
    }
  },
  mounted() {
    // this.getFrames();
  }
};
</script>

<style lang="scss" scoped>
.container-dragDrop {
  display: flex;
  padding: 20px 0px 25px 3px;
  width: 100%;
  overflow: auto;

  .container-list {
    margin: 0px 8px;
    min-width: 282px;
    max-width: 282px;
  }
}
</style>
