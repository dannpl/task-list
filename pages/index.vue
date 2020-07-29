<template>
  <div class="container-dragDrop">
    <div class="container-list" v-for="frame in frames" :key="frame.id">
      <Frame
        :title="frame.title"
        :id="frame.id"
        :frame="frame.todos"
        @handleDrop="handleDrop"
        @saveNewFrame="saveNewFrame"
        @cancelNewFrame="cancelNewFrame"
        @showEditFrame="setEditFrame"
      ></Frame>
    </div>
    <div
      v-if="
        (this.frames[this.frames.length - 1] &&
          this.frames[this.frames.length - 1].title) ||
          this.frames.length === 0
      "
      @click="addNewFrame()"
      class="addNew"
    >
      <v-icon class="icon-plus" @click="cancelNewFrame()">mdi-plus</v-icon>
      Add new frame
    </div>
    <EditFrame
      :dialog="showEditFrame"
      :frame="currentFrame"
      @closeModal="showEditFrame = false"
      @deleteFrame="deleteFrame"
      @editFrame="editFrame"
    ></EditFrame>
  </div>
</template>

<script>
import Repository from '@/services/repository';
import Frame from '@/components/Frame';
import EditFrame from '@/components/EditFrame';
import { Drag, Drop } from 'vue-drag-drop';
var _ = require('lodash');

export default {
  components: { Drag, Drop, Frame, EditFrame },
  data() {
    return {
      api: new Repository(),
      showEditFrame: false,
      currentFrame: {}
    };
  },
  methods: {
    async getFrames() {
      try {
        const response = await this.api.getFrames();

        this.$store.dispatch('Frames/setFrames', response.data.data);
      } catch {}
    },
    addNewFrame() {
      this.$store.dispatch('Frames/addNewFrame', {
        title: null,
        todos: []
      });
    },
    handleDrop({ toList, data }) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort((a, b) => a > b);
      }
    },
    async saveNewFrame(data) {
      const response = await this.api.createFrame({
        title: data.title,
        order: this.frames.length
      });

      this.getFrames();
    },
    cancelNewFrame(data) {
      this.$store.dispatch('Frames/cancelNewFrame');
    },
    setEditFrame(value) {
      this.currentFrame = value;
      this.showEditFrame = true;
    },
    async editFrame(data) {
      try {
        const response = await this.api.editFrame(data);

        this.$store.dispatch('Frames/editFrame', data);

        this.showEditFrame = false;
      } catch {}
    },
    async deleteFrame() {
      try {
        const response = await this.api.deleteFrame(this.currentFrame.id);

        this.$store.dispatch('Frames/deleteFrame', {
          id: this.currentFrame.id
        });

        this.showEditFrame = false;
      } catch {}
    }
  },
  mounted() {
    this.getFrames();
  },
  computed: {
    frames() {
      return _.orderBy(this.$store.getters['Frames/getFrames'], 'order');
    }
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

  .addNew {
    display: flex;
    align-items: center;
    min-width: 282px;
    cursor: pointer;
    margin-left: 8px;
    max-width: 282px;
    height: 40px;
    border-radius: 4px;
    padding: 0px 12px 1px 12px;
    background-color: rgb(244, 245, 247);

    &:hover {
      background-color: #e5e5e5;
    }
  }
}
.icon-plus {
  color: #565656;
}
</style>
