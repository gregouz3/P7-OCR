<template>
  <div v-if="currentPost" class="edit-form">
    <h2 class="my-4">Publication:</h2>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentPost.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentPost.description"
        />
      </div>
    </form>
    <div class="b d-flex justify-content-center ">
       <button class="btn mr-2"
      @click="deletePost"
    >
      <span class="log">Supprimer</span>
    </button>

    <button type="submit" class="btn"
      @click="updatePost"
    >
      <span class="log">Modifier</span>
    </button>
    </div>
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
  name: "upPost",
  data() {
    return {
      currentPost: null,
      message: ''
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then(response => {
          this.currentPost = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then(response => {
          console.log(response.data);
          this.message = 'The Post was updated successfully!';
          
          this.$router.push('/posts');

        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePost() {
      PostDataService.delete(this.currentPost.id)
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
    this.getPost(this.$route.params.id);
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
.b {
}
</style>