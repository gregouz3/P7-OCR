<template>

  <div class="submit-form">
      <div v-if="progressInfos">
      <div class="mb-2"
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
      >
        <span>{{progressInfo.fileName}}</span>
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
    </div>
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
        <input
          class="form-control"
          id="description"
          v-model="post.description"
          name="description"
        />
      </div>
       <div>
       

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          @change="selectFile">
      </div>
       <div v-if="message" class="alert alert-light" role="alert">
      <ul>
        <li v-for="(ms, i) in message.split('\n')" :key="i">
          {{ ms }}
        </li>
      </ul>
    </div>
    
    <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage">
    </div>
         <button class="btn btn-success"
      :disabled="!selectedFiles"
      @click="uploadFiles"
    >
      Upload
    </button>
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
import UploadService from "../services/uploadFileService";


 
export default {
  name: "add-post",
 
  
  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
        author:"",
        published: false,
        imgUrl: ""
      
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
      selectImage () {
          this.$refs.fileInput.click()
      },
    selectFile() {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      this.progressInfos = [];

      this.selectedFiles = event.target.files;
      console.log(this.$refs.fileInput.files[0].name);
      this.post.imgUrl = this.$refs.fileInput.files[0].name;

    },
    
      uploadFiles() {
      this.message = "";

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
     upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name };

      UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;

          return UploadService
          .getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos[idx].percentage = 0;
          this.message = "Could not upload the file:" + file.name;
        });
    },
     

      pickFilee () {
        
          var data = {
            title: this.post.title,
            description: this.post.description,
            author:  this.$store.state.auth.user.username,
            imgUrl: this.post.imgUrl
          };
       
           PostDataService.create(data)
        .then(response => {
          this.post.id = response.data.id;

          console.log(response.data);
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
    PostDataService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
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