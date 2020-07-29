<template>
  <div class="container-dragDrop">
    <draggable
      class="drop list"
      v-model="frames"
      group="frames"
      @start="drag = true"
      @end="drag = false"
    >
      <div class="container-list" v-for="frame in frames" :key="frame.id">
        <Frame
          :title="frame.title"
          :id="frame.id"
          :frame="frame.todos"
          @handleDrop="handleDrop"
          @saveNewFrame="saveNewFrame"
          @cancelNewFrame="cancelNewFrame"
          @showEditFrame="setEditFrame"
          @addNewTask="addNewTask"
          @editTask="editTask"
        ></Frame>
      </div>
    </draggable>

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

    <div v-if="showEditTask">
      <EditTask
        :task="currentTask"
        @saveTask="saveTask"
        @deleteTask="deleteTask"
        @closeModal="showEditTask = false"
      ></EditTask>
    </div>

    <v-alert class="alert" v-if="alert.show" :type="alert.type">
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Repository from '@/services/repository';
import Frame from '@/components/Frame';
import EditTask from '@/components/EditTask';
import EditFrame from '@/components/EditFrame';
var _ = require('lodash');

export default {
  components: { draggable, Frame, EditFrame, EditTask },
  data() {
    return {
      api: new Repository(),
      showEditFrame: false,
      showEditTask: false,
      drag: false,
      currentFrame: {},
      currentTask: {},
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
    handleDrop(data) {
      this.$store.dispatch('Frames/changeTodoOrder', data);
    },
    async saveNewFrame(data) {
      const response = await this.api.createFrame({
        title: data.title,
        order: this.frames.length - 1
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
    addNewTask(task) {
      const data = {
        frame_id: task.frameId,
        frameTodoLength: task.frameTodoLength
      };
      this.currentTask = data;
      this.showEditTask = true;
    },
    editTask(task) {
      task.task.frameTodoLength = task.frameTodoLength;

      this.currentTask = task.task;
      this.showEditTask = true;
    },
    async saveTask(task) {
      const data = {
        title: task.form.title,
        description: task.form.description,
        id: task.task.id,
        frame_id: task.task.frame_id,
        open: task.form.open,
        order: task.task.order || task.task.frameTodoLength
      };

      if (task.task.id) {
        try {
          await this.api.editTodo(data);

          this.showEditTask = false;
          this.setAlert(true, 'success', 'Task edited with success');
        } catch {
          this.setAlert(true, 'error', 'Error to edit task');
        }
      } else {
        try {
          await this.api.createTodo(data);

          this.showEditTask = false;
          this.setAlert(true, 'success', 'Task created with success');
        } catch {
          this.setAlert(true, 'error', 'Error to edit task');
        }
      }

      this.getFrames();
    },
    async deleteTask() {
      try {
        const response = await this.api.deleteTodo(this.currentTask.id);

        this.showEditTask = false;
        this.setAlert(true, 'success', 'Task deleted with success');

        this.getFrames();
      } catch {
        this.setAlert(true, 'error', 'Error to delete Task');
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
    frames: {
      get() {
        return _.orderBy(this.$store.getters['Frames/getFrames'], 'order');
      },
      set(value) {
        this.$store.dispatch('Frames/updateList', value);

        value.map((frame, i) => {
          this.api.editFrame({ ...frame, order: i });
        });
      }
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

  .drop {
    display: flex;
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
