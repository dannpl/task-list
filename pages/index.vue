<template>
  <div class="container-dragDrop">
    <div class="container-list" v-for="frame in frames" :key="frame.id">
      <drop class="drop list" @drop="dropFrame(frame, ...arguments)">
        <drag :transfer-data="{ frame: frame }">
          <Frame
            :title="frame.title"
            :id="frame.id"
            :frame="frame.todos"
            @handleDrop="handleDrop"
            @saveNewFrame="saveNewFrame"
            @cancelNewFrame="cancelNewFrame"
            @showEditFrame="setEditFrame"
          ></Frame>
        </drag>
      </drop>
    </div>
    <v-card
      v-if="
        (this.frames[this.frames.length - 1] &&
          this.frames[this.frames.length - 1].title) ||
          this.frames.length === 0
      "
      @click="addNewFrame()"
      class="addNew"
    >
      <v-icon class="icon-plus text--primary" @click="cancelNewFrame()"
        >mdi-plus</v-icon
      >
      Add new frame
    </v-card>
    <EditFrame
      :dialog="showEditFrame"
      :frame="currentFrame"
      @closeModal="showEditFrame = false"
      @deleteFrame="deleteFrame"
      @editFrame="editFrame"
    ></EditFrame>

    <v-alert class="alert" v-if="alert.show" :type="alert.type">
      {{ alert.message }}
    </v-alert>
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
      currentFrame: {},
      alert: {
        show: false,
        type: 'success',
        message: ''
      }
    };
  },
  methods: {
    async getFrames() {
      try {
        const response = await this.api.getFrames();

        this.$store.dispatch('Frames/setFrames', response.data.data);
      } catch {
        this.setAlert(true, 'error', 'Error');
      }
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
        order: this.frames.length - 1
      });

      this.getFrames();
    },
    async dropFrame(old, newFrame) {
      const frames = this.frames;
      const temp = frames[old.order];
      frames[old.order] = newFrame.frame;
      frames[newFrame.frame.order] = temp;

      if (old.order !== newFrame.frame.order) {
        frames.map((frame, i) => {
          this.api.editFrame({ ...frame, order: i });
        });

        this.getFrames();
      }
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
        this.setAlert(true, 'success', 'Saved with success');
      } catch {
        this.setAlert(true, 'error', 'Error to edit frame');
      }
    },
    async deleteFrame() {
      try {
        const response = await this.api.deleteFrame(this.currentFrame.id);

        this.$store.dispatch('Frames/deleteFrame', {
          id: this.currentFrame.id
        });

        this.showEditFrame = false;
        this.setAlert(true, 'success', 'Frame deleted with success');
      } catch {
        this.setAlert(true, 'error', 'Error to delete frame');
      }
    },
    setAlert(show, type, message) {
      this.alert = { show, type, message };

      setTimeout(() => {
        this.alert.show = false;
      }, 1500);
    }
  },
  mounted() {
    this.getFrames();
  },
  computed: {
    frames() {
      return _.orderBy(this.$store.getters['Frames/getFrames'], 'order');
    }
  },
  watch: {
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

    &:hover {
      background-color: #e5e5e5;
      color: rgba(0, 0, 0, 0.87) !important;

      .icon-plus {
        color: rgba(0, 0, 0, 0.87) !important;
      }
    }
  }
}
.alert {
  width: 44%;
  position: fixed;
  bottom: 50px;
  left: 0px;
  margin: auto;
  right: 0px;
}
</style>
