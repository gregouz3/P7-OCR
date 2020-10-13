<template>

    <div class="col-md-12">

        <div class="posts"
          v-for="(post, index) in posts"
          :key="index">
          <h3  class="post_titre">
          {{ post.title }},  <strong class="ml-3"> by {{ post.author}}</strong>
          </h3>
          <p class="post_description">
          {{ post.description }}
          </p>
          <div 
             class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${post.imgUrl})` }">
          </div>
   
        </div>
    </div>
   
</template>

<script>
import PostDataService from "../services/PostDataService";
import UploadService from "../services/uploadFileService";


export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: "",
      file: []

    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {
          this.posts= response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveFile() {

      UploadService.getFiles() 
        .then(response => {
          this.file = response.data;
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
    }
    
  
  },
  mounted() {
    this.retrievePosts();
    this.retrieveFile();
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
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>