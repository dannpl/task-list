<template>
  <div class="text-center">
    <v-dialog @click:outside="closeModal" :value="dialog" width="500">
      <v-card>
        <v-card-title class="headline lighten-2">
          {{ frame.title }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="New Title"
            v-model="frameName"
            class="input"
          ></v-text-field>
        </v-card-text>

        <v-card-text>
          <v-btn small color="error" @click="dialogDelete = true"
            >Delete Frame</v-btn
          >

          <v-dialog v-model="dialogDelete" max-width="290">
            <v-card>
              <v-card-title>Are you sure you want to delete?</v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary darken-1"
                  text
                  @click="deleteFrame(false)"
                >
                  No
                </v-btn>

                <v-btn color="red darken-1" text @click="deleteFrame(true)">
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
            :disabled="frameName.length === 0"
            color="primary"
            text
            @click="editFrame"
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
  props: ['dialog', 'frame'],
  data() {
    return {
      frameName: '',
      dialogDelete: false
    };
  },
  methods: {
    closeModal() {
      this.frameName = '';
      this.$emit('closeModal', true);
    },
    deleteFrame(value) {
      this.dialogDelete = false;
      this.frameName = '';
      if (value) this.$emit('deleteFrame', value);
    },
    editFrame() {
      this.$emit('editFrame', { title: this.frameName, id: this.frame.id });
      this.frameName = '';
    }
  }
};
</script>
