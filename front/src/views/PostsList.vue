<template>
    <div class="list row">
       <div class="col-md-8">
      <div class="input-group mb-3">
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
          :key="index"
          @click="setActivePost(post, index)">

          <h3  class="post_titre">
          {{ post.title }}, 
          <p> <a :href="'/profile/' + post.userId"> <strong class="ml-3"> by {{ post.author}}</strong></a></p>
          </h3>
          <p class="post_description">
          {{ post.description }}
          </p>
         
          <div v-if="post.userId === currentUser.id || currentUser.isAdmin === 1">
           <a class="badge badge-warning"
          :href="'/posts/' + post.id"
        >
          Edit
        </a></div>
           <button  @click="afficheCom(post.id)" title="voir les commentaires">
              Commentaires
           </button>
           <div>
          
           </div>
          <div class="com" v-if="postId === post.id">
            <div class="post_com"  v-for="(comment, index) in comments" v-bind:key="index" outlined>    
              <div class="posts">
               
                {{comment.content}} , by  <strong>
                   <a :href="'/profile/' + comment.userId">{{comment.author}}</a></strong>
               
                <div v-if="comment.userId === currentUser.id  ||currentUser.isAdmin === 1">
                  <a class="badge badge-warning"
          :href="'/posts/' + post.id + '/comments/' + comment.id"
                  >
          Edit
        </a></div>
                </div>
              </div>
           
            </div>
          <div class="d-flex  justify-content-center">
          <button v-if="postId === post.id" title="commenter le post" class="" 
           @click="afficheFormCom(post.id)">
            Add comment
          </button></div>
            <div  v-if="afficheFrmCm ">
                <div  ref="form" class="form-group ma-3 d-flex  justify-content-center"  v-if="form && post.id === postId">
                    <textarea v-model="dataCom.content"  :counter="255" label="Commentaire"  required></textarea>
                </div>
                <div class="d-flex justify-content-center">
                 <button  v-if="post.id === postId" class="success ma-2" @click="sendCom(post.id)">Poster</button></div>
            </div>
          
        </div>
       
    </div>
     <button v-if="currentUser.isAdmin === 1" class="m-3 btn btn-sm btn-danger" @click="removeAll">
        Remove All
      </button>
    
       

       
    
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
      title: "",
      file: [],
      afficheFrmCm: false,
      postId: "",
      comments: [],
      dataCom:{
                id: "",
                userId: "",
                content:"",
                author: ""
            },
      form: true,






    };
  },
  methods: {
     afficheFormCom(){
            this.afficheFrmCm = true;
        },

     afficheCom(pId){
            this.postId = pId;
            this.afficheFrmCm = false;
            PostDataService.getAllc(pId)
                .then(response => {
                    let com = response.data;
                    this.comments = com;
                    console.log(com);

                })
                .catch(error => {
                console.log(error);
                });
        },
        sendCom(pId){
             var data = {
            content: this.dataCom.content,
            author:  this.$store.state.auth.user.username,
            userId:  this.$store.state.auth.user.id
          };
       
           PostDataService.createComment(pId, data)
        .then(response => {
          this.afficheFrmCm=false;

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          console.log(this.$store.state.auth.user.id);

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
    },
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
   
       

    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      if (post.userId === this.$store.state.auth.user.id) {
         this.currentPost = post;
         this.currentIndex = index;
      }
     
    },


    removeAll() {
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
.postCom {
  position: relative;
}
</style>