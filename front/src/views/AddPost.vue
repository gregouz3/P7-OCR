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
      <div class="form-group">
        <label for="title">Title</label>
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
      
      <button @click="pickFilee" class="btn btn-success">Submit</button>
    </div>
     <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click=" newPost">Add</button>
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
</style>