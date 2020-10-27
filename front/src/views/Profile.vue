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
   
    </header>
  <div>
    <h4> Bienvenue sur le réseau interne de groupamia !</h4>
  </div>
    <a class="m-3 btn btn-sm btn-danger" :href="'/profile/'+ currentUser.id">
        mv your profile      </a>
       
     
   <button v-if="currentUser.isAdmin === 0" class="m-3 btn btn-sm btn-danger" @click="removeUser">
        Remove your profile      </button>
     <div v-if="currentUser.isAdmin === 1">
      list Users
       <button v-if="currentUser.isAdmin === 1" class="m-3 btn btn-sm btn-danger" @click="removeAll">
        Remove All
      </button>
      <div class="posts"
          v-for="(user, index) in users"
          :key="index"
>
          <h3  class="post_titre" v-if="user.username !== 'admin'">
          {{ user.username }},  <strong class="ml-3"> by {{ user.email}}</strong>
          <span> {{ user.id}}</span>
          <button class="m-3 btn btn-sm btn-danger" @click="removeUsers(user.id)">
        Remove your profile      </button>
          </h3>
          
            <a class="m-3 btn btn-sm btn-danger" :href="'/profile/'+ user.id">
        mv your profile      </a>
       
      </div>
  </div>
  </div>

</template>

<script>
import Auth from "../services/auth.service"

export default {
      name: 'Profile',
    computed: {
        currentUser() {
          return this.$store.state.auth.user;
        } 
      },
 
  data() {
    return {

      users: []
    };
  },
   methods: {
    retrieveUsers() {

      Auth.findAll()
        .then(response => {
          this.users= response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
     removeUser(){
      Auth.deleteAccount(this.$store.state.auth.user.id);
      localStorage.removeItem('user');
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');

     },
      removeUsers(idU){
      Auth.deleteAccount(idU);
      window.location.reload();

     },
       removeAll() {
      Auth.deleteAll()
        .then(response => {
          console.log(response.data);
      window.location.reload();
          
        })
        .catch(e => {
          console.log(e);
        });
    }
   },
     mounted() {
    this.retrieveUsers();
    
  },

   
}
</script>