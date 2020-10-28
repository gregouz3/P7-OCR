<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">

    <a class="navbar-brand"><img src="../public/logo.png" alt="logo groupamia"/> </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
       <ul v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </ul>
      <ul v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
            <a href="/posts" class="nav-link">Publication</a>
        </li>
        
        <li class="nav-item">
            <a href="/add" class="nav-link">Publier</a>
        </li>
        
        
      
         
      </ul>
       <ul v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </ul>
      </div>
    </nav>
    
    <div class="container">
      <router-view />

    </div>
     
   
  </div>
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
    
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
  .navbar-brand img {
      width: 200px;
      height: 70px;
  }

.nav-item {
  font-size: 1.3rem;
}

</style>