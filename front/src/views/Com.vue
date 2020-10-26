<template>
  <div v-if="currentCom" class="edit-form">
    <h4>Com</h4>
    <form>
      <div class="form-group">
        <label for="title">Content</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCom.content"
        />
      </div>

    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteCom"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCom"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on your Post...</p>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "upCom",
  data() {
    return {
      currentCom: null,
      message: ''
    };
  },
  methods: {
    getCom(id) {
      PostDataService.getComments(id)
        .then(response => {
          this.currentCom = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCom() {
      PostDataService.updateC(this.currentCom.id, this.currentCom)
        .then(response => {
          console.log(response.data);
          this.message = 'The Com was updated successfully!';
          this.$router.push({ name: "posts" });

        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCom() {
      PostDataService.deleteC(this.currentCom.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "posts" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCom(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>