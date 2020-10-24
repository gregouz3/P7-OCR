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
   <div class="d-flex justify-space-between">
      <button class="btn" @click="rmProfile">Supprimer</button>
  </div>
  </div>
</template>

<script>
import AuthService from "../services/auth.service";

export default {
      name: 'Profile',
    computed: {
        currentUser() {
          return this.$store.state.auth.user;
        } 
      },
 
  data() {
    return {

    };
  },
   methods: {

     rmProfile() {
       AuthService.deleteAccount(this.$store.state.auth.user.id)
          .then(response => {
          console.log(response.data);
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
          })
          
        .catch(e => {
          console.log(e);
        });
       
     }
 
    }

}
</script>