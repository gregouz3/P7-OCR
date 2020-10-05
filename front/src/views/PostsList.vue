<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group my-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12">

        <div class="posts"
          v-for="(post, index) in posts"
          :key="index">
          <h3  class="post_titre">Titre:
          {{ post.title }}, by {{ post.author}}
          </h3>
          <p class="post_description">
          {{ post.description }}
          </p>
        </div>
    </div>
   
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
    },

    removeAllPosts() {
      PostDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePosts();
  },
  computed: {
    currentUser() {
          return this.$store.state.auth.user;
    }
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.posts {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
  
}
</style>