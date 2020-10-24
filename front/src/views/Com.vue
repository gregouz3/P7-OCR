<template>
  <div v-if="currentCom" class="edit-form">
    <h4>Com</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCom.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCom.description"
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
import ComDataService from "../services/ComDataService";

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
      ComDataService.get(id)
        .then(response => {
          this.currentCom = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCom() {
      ComDataService.update(this.currentCom.id, this.currentCom)
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
      ComDataService.delete(this.currentCom.id)
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