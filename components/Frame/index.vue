<template>
  <div>
    <v-card class="drop list">
      <div v-if="title === null" class="wrapper-input">
        <v-text-field v-model="frameName" class="input"></v-text-field>
        <v-icon dark class="circle-save" @click="saveNewFrame()"
          >mdi-checkbox-marked-circle</v-icon
        >
        <v-icon dark class="circle-cancel" @click="cancelNewFrame()"
          >mdi-close</v-icon
        >
      </div>
      <div class="wrapper-title" v-if="title !== null">
        <p class="text--primary">{{ title }}</p>
        <v-icon dark class="more text--primary" @click="showEditFrame()"
          >mdi-dots-vertical</v-icon
        >
      </div>

      <draggable
        v-model="tasks"
        group="tasks"
        @start="drag = true"
        @end="drag = false"
        @change="changed"
      >
        <div class="drag" v-for="item in tasks" :key="item.id">
          <v-card @click="editTask(item)" class="mx-auto card">
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
        </div>
      </draggable>

      <div v-if="title" @click="addNewTask()" class="addNew text--primary">
        <v-icon class="icon-plus">mdi-plus</v-icon>
        <span class="text--primary">Add new task</span>
      </div>
    </v-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
var _ = require('lodash');

export default {
  components: { draggable },
  props: ['frame', 'handleDrop', 'title', 'new', 'id'],
  data() {
    return {
      frameName: '',
      drag: false,
      tasks: []
    };
  },
  mounted() {
    this.tasks = this.frame;
  },
  methods: {
    onDrop(frame, arg) {
      this.$emit('handleDrop', { toList: frame, data: arg });
    },
    changed(item) {
      this.$emit('handleDrop', {
        item: item,
        frameId: this.id,
        newArray: this.tasks
      });
    },
    saveNewFrame() {
      this.$emit('saveNewFrame', { title: this.frameName });
    },
    addNewTask() {
      this.$emit('addNewTask', {
        frameId: this.id,
        frameTodoLength: this.frame.length
      });
    },
    editTask(task) {
      this.$emit('editTask', {
        task: task,
        frameId: this.id,
        frameTodoLength: this.frame.length
      });
    },
    cancelNewFrame() {
      this.$emit('cancelNewFrame');
    },
    showEditFrame() {
      this.$emit('showEditFrame', { title: this.title, id: this.id });
    }
  },
  watch: {
    frame() {
      if (this.tasks.length !== this.frame.length) {
        this.tasks = _.orderBy(this.frame, 'order');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  position: relative;
  height: auto;
  border-radius: 4px;
  padding: 10px 12px 1px 12px;

  .wrapper-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -6px;

    .input {
      max-width: 90%;
      margin: 0px !important;
      padding: 0px !important;
    }

    .circle-save {
      color: #1dd037;
      cursor: pointer;
    }

    .circle-cancel {
      color: #ff0202;
      cursor: pointer;
    }
  }
}

.addNew {
  width: 100%;
  display: flex;
  margin-left: -5px;
  margin-bottom: 5px;
  border-radius: 4px;
  align-items: center;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;

    .icon-plus,
    span {
      color: rgba(0, 0, 0, 0.87) !important;
    }
  }
}

.wrapper-title {
  width: 100%;
  justify-content: space-between;
  display: flex;
  .more {
    margin-top: -12px;
    margin-right: -8px;
  }
}

.v-icon.v-icon::after {
  background-color: transparent !important;
}

.drag {
  cursor: pointer;
  border-radius: 4px;

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
