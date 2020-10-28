<template>
 <div class="col-md-12">
    <div class="card card-container mt-2">
  <div v-if="currentUser" class="edit-form">
    <h4 class="mt-3">Informations du profile:</h4>
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="currentUser.id === uId || isAd === 1">
          
         <div  class="form-group">
          

            <label for="username">Username</label>
            <input 
              v-model="currentUser.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
           <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="currentUser.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          


          <div  class="form-group d-flex justify-content-center">
         <button type="submit" class="btn form-control "
          @click="mvAccount(currentUser.id)"
        > <span class="log">Update</span>
        </button></div>
      </div>
      </form>
  </div>
  <div class="d-flex flex-column justify-content-center mt-5 ">
         <div class="d-flex ml-5">
        <strong>Username  :</strong> <p class=" user ml-3"> {{currentUser.username}}</p>
      </div>
      <div class="d-flex ml-5 user "><a title="Contacter par email" :href="'mailto:'+ currentUser.email">
        <strong>Email  :</strong>{{currentUser.email}}</a>
      </div>
  </div>
       
    </div>
 </div>
</template>

<script>
import Auth from "../services/auth.service"
import User from '../models/user';

export default {
  name: "upProfile",
  data() {
    return {
      currentUser: null,
      message: '',
      submitted: false,
      user: new User('', '', '', '', ''),
      id: this.$route.params.id,
      isAd: this.$store.state.auth.user.isAdmin,
      uId: this.$store.state.auth.user.id,
      successful: false,



    };
  },
  methods: {
    getUser(id) {
      Auth.findOne(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
        handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
        }
      });
    },

    mvAccount() {
      Auth.mvAccount(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'The User was updated successfully!';
          if (this.isAd === 1) {
            this.$router.push('/profile');
          }
          else {
              localStorage.removeItem('user');
          this.$store.dispatch('auth/logout');

          this.$router.push('/login');
          }

        

        })
        .catch(e => {
          console.log(e);
        });
    },
   

  
  },
    computed: {
        currentUserss() {
          return this.$store.state.auth.user;
        } 
      },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
   
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.user {
  overflow-x: scroll;
  overflow: hidden;
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

a {
  text-decoration: none;
  color: black;
}
a:hover{
  opacity: 0.6;
  color: black;
}
</style>