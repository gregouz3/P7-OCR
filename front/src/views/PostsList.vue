<template>
    <div class="list row" v-if="posts.length !== 0">
       <div class="col-md-12 mt-2 ml-2 ">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn " type="button"
            @click="searchTitle"
          >
            <span class="log">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="col-md-12" >

        <div class="posts"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post, index)">
          <div class="d-flex jumbotron flex-column">
            <div class="d-flex align-items-center flex-column">
                 <h3  class="post_titre ">
               Titre : 
          {{ post.title }}, </h3>
          <p title="Voir le profil" class="post_titre mt-1 mb-2 ml-2"> <a class="post_titre " :href="'/profile/' + post.userId"> 
           par {{ post.author}}</a></p>
         
            </div>
            
          <div class="post_title">
           <h3>Description :</h3>
          <p class="desc d-flex justify-content-center">{{ post.description }}</p>
          </div>
         
          <div v-if="post.userId === currentUser.id || currentUser.isAdmin === 1">
           <a class="btn d-flex justify-content-center"
          :href="'/posts/' + post.id"
        >
          <span class="log">Modifier ou supprimer</span>
        </a></div>
           <button  class="btn mt-3" @click="afficheCom(post.id)" title="voir les commentaires">
              <span class="log">Voir les commentaires </span>
           </button>
          <div class="com" v-if="postId === post.id">
            <div class="post_com"  v-for="(comment, index) in comments" v-bind:key="index" outlined>    
              <div class="posts d-flex flex-column justify-content-center">
                <p class="post_titre" title="Voir le profil"> 
                    {{comment.content}}
               , par 
                   <a class="post_titre" :href="'/profile/' + comment.userId">{{comment.author}}</a></p>
               
                <div class=" mr" v-if="comment.userId === currentUser.id  ||currentUser.isAdmin === 1">
                  <a class="btn d-flex justify-content-center"
          :href="'/posts/' + post.id + '/comments/' + comment.id">
          <span class="log" >Modifier ou supprimer</span>
        </a></div>
                </div>
              </div>
           
            </div>
          <div class="d-flex  justify-content-center">
          <button v-if="postId === post.id" title="commenter le post" class="btn my-2" 
           @click="afficheFormCom(post.id)">
            <span class="log">Publier un commentaire</span>
          </button></div>

            <div  v-if="formCom">
                <div  ref="form" class="form-group d-flex  justify-content-center"  v-if="form && post.id === postId">
                    <textarea v-model="com.content"  :counter="255" label="Commentaire"  required></textarea>
                </div>
                <div class="d-flex justify-content-center">
                 <button  v-if="post.id === postId" class="btn ma-2" @click="sendCom(post.id)"><span class="log">Publier</span></button></div>
             
            </div>
          
        </div>
       
    </div>
          </div>
      <div class="ml-4">
         <button v-if="currentUser.isAdmin === 1" class="m-3 btn btn-md " @click="removeAll">
        <span class="log">Supprimer les publications</span>
      </button>
      </div>
    
    </div>
    <div v-else>
      <p>Aucune publication trouvée.</p>
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
      formCom: false,
      postId: "",
      comments: [],
      com:{
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
            this.formCom = true;
        },

     afficheCom(pId){
            this.postId = pId;
            this.formCom = false;
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
            content: this.com.content,
            author:  this.$store.state.auth.user.username,
            userId:  this.$store.state.auth.user.id,
          };
       
           PostDataService.createComment(pId, data)
        .then(response => {
          this.formCom=false;
          console.log(response.data);
          this.afficheCom(pId);
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
 .post_titre {
   color: black;
   font-size: 1.4rem;
   overflow-x: auto;
   overflow-y: hidden;
   height: auto;

 }
 .post_titre a{
   color: black;
   text-decoration: none;
   font-size: 1.4rem
 }
.post_description {
  color: red;
  margin: 1rem;
  max-width: 750px;



}
.mr {
  height: 38px;
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
.log {
  color: #fff!important;
  text-decoration: none;
}
.btn a {
  text-decoration: none;
}
.desc {
  font-size: 1.4rem;
  font-style: italic;
   flex-wrap: wrap;
   display: flex;
   overflow: auto;

}

.btn {
 background-color: #343a40!important;
 width: auto;

}
.btn:hover {
  opacity: 0.6;
}
</style>