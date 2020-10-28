<template>

  <div class="submit-form">
    <!--
      <div v-if="progressInfos">
      <div class="mb-2"
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
      >
        <div class="progress">
          <div class="progress-bar progress-bar-info"
            role="progressbar"
            :aria-valuenow="progressInfo.percentage"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: progressInfo.percentage + '%' }"
          >
            {{progressInfo.percentage}}%
          </div>
        </div>
      </div>
    </div>-->
    <div v-if="!submitted">
      <div class="form-group mt-3">
        <label for="title">Titre</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="post.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="post.description"
          name="description"
        ></textarea>
      </div>
      <div class="d-flex flex-column justify-content-center ">
              <button @click="pickFilee" class="btn "><span class="log" >Publier</span></button>
      </div>
    </div>
     <div v-else class="d-flex flex-column justify-content-center mt-5">
      <h4 class="d-flex justify-content-center mb-3">Publication enregistrée </h4>
      <button class="btn " @click=" newPost"><span class="log">Ajouter une publication</span></button>
    </div>
   
    
    
  </div>

</template>

<script>
import PostDataService from "../services/PostDataService";


 
export default {
  name: "add-post",
 
  
  data() {
    return {
      post: {
        id: "",
        userId: "",
        title: "",
        description: "",
        author:""
      
      },
      selectedFiles: undefined,
      progressInfos: [],
      message: "",
      fileInfos: [],
      submitted: false,
      previewImage: null
      
    }
  },
  
  methods: {
      pickFilee() {
          var data = {
            userId: this.$store.state.auth.user.id,
            title: this.post.title,
            description: this.post.description,
            author:  this.$store.state.auth.user.username
          };
       
           PostDataService.create(data)
        .then(response => {
          this.post.id = response.data.id;
          console.log(  response.data);
          console.log(response.data.id);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    newPost() {
      this.submitted = false;
      this.post = {};
    },
     mounted() {
  }
  }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
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
 .log {
  color: #fff!important;
}

.btn {
 background-color: #343a40!important;
}
.btn:hover {
  opacity: 0.6;
}
</style>