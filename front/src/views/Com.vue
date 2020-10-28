<template>
  <div v-if="currentCom" class="edit-form">
    <h2>Commentaire:</h2>
    <form>
      <div class="form-group">
        <label for="title">Description</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCom.content"
        />
      </div>

    </form>
    <div class="b d-flex justify-content-center ">

    <button class="btn  mr-2"
      @click="deleteCom"
    >
      <span class="log">Supprimer</span>
    </button>

 <button class="btn  mr-2"
      @click="updateCom"
    >
      <span class="log">Modifier</span>
    </button>
    <p>{{ message }}</p>
  </div>
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
.log {
  color: #fff!important;
}

.btn {
 background-color: #343a40!important;
 width: 300px;

}
.btn:hover {
  opacity: 0.6;
}
</style>