<template>
  <div class="container">
    <header class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
       <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Poste:</strong>
      {{currentUser.poste}}
    </p>
    </header>
  <div>
    <h4> Bienvenue sur le réseau interne de groupamia !</h4>
  </div>
     

   
  </div>
</template>

<script>
import axios from "axios";

export default {
      name: 'Profile',
    computed: {
        currentUser() {
          return this.$store.state.auth.user;
        } 
      },
 
  data() {
    return {
      selectedFile: "",
    };
  },
   methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file

     // sending file to the backend
      axios
        .post("http://localhost:8080/upload", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

}}
</script>