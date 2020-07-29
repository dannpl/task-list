<template>
  <div class="text-center">
    <v-dialog @click:outside="closeModal" :value="true" width="500">
      <v-card>
        <v-card-title class="headline lighten-2">
          {{ task.title }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Title"
            v-model="form.title"
            class="input"
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="form.description"
            class="input"
          ></v-text-field>
          <v-switch v-model="form.open" label="Open"></v-switch>
        </v-card-text>

        <v-card-text>
          <v-btn small color="error" v-if="task.id" @click="dialogDelete = true"
            >Delete Task</v-btn
          >

          <v-dialog v-model="dialogDelete" max-width="290">
            <v-card>
              <v-card-title>Are you sure you want to delete?</v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary darken-1"
                  text
                  @click="deleteTask(false)"
                >
                  No
                </v-btn>

                <v-btn color="red darken-1" text @click="deleteTask(true)">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>
          <v-btn
            :disabled="!form.title && !form.description"
            color="primary"
            text
            @click="saveTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialog', 'task'],
  data() {
    return {
      form: {
        title: null,
        description: null,
        open: true
      },
      closed: true,
      dialogDelete: false
    };
  },
  mounted() {
    this.form = {
      title: this.task.title,
      description: this.task.description,
      open: this.task.open
    };
  },
  methods: {
    closeModal() {
      this.form = { title: null, description: null, open: true };
      this.$emit('closeModal', true);
    },
    deleteTask(value) {
      this.dialogDelete = false;
      this.form = { title: null, description: null, open: true };
      if (value) this.$emit('deleteTask', value);
    },
    saveTask() {
      this.$emit('saveTask', { form: this.form, task: this.task });
      this.form = { title: null, description: null, open: true };
    }
  }
};
</script>
