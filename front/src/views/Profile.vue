<template>
  <div>
    <header class="jumbotron d-flex flex-column mt-2 ">
      <h1 class="mb-5"> Mes informations : </h1>
      <div class="d-flex flex-column justify-content-center">
         <div class="d-flex ml-5">
        <strong>Username  :</strong> <p class="user ml-3"> {{currentUser.username}}</p>
      </div>
      <div class="d-flex ml-5">
        <strong>Email:</strong> <p class="user ml-3"> {{currentUser.email}}</p>
      </div>
       
      </div>
     
   
    </header>
  <div>
    <h4 class="d-flex justify-content-center"> Bienvenue sur le réseau de groupamia !</h4>
  </div>
  <div class="d-flex justify-content-center">
    <a class="m-3 btn btn-sm " :href="'/profile/'+ currentUser.id"> <span class="log">  Modifier mes informations  </span>
        </a>
     <button v-if="currentUser.isAdmin === 0" class="m-3 btn  btn-sm " @click="removeUser"> <span class="log">Supprimer mon compte</span>
           </button>
  </div>
       
  
  
     <div class="d-flex flex-column justify-content-center align-items-center" v-if="currentUser.isAdmin === 1">
      <h3>Administration: </h3>
       <button v-if="currentUser.isAdmin === 1 && users.length>1" class="m-3  btn-sm btn" @click="removeAll">
        <span class="log">Tout supprimer</span>
      </button>
      <div  class="user-list"
          v-for="(user, index) in users"
          :key="index"
>
          <div class="user d-flex ml-4" >
           <strong class="mr-2">Name : </strong>{{ user.username }}
          <p class="ml-2"><strong>,id : </strong>{{ user.id}}</p>

          </div>
          <div class="user  d-flex ml-4">
           <strong class="mr-2">Email : </strong>{{ user.email}}

          </div>
          <div class="d-flex">
          <button class="m-3 btn btn-sm btn" @click="removeUsers(user.id)">
        <span class="log">Supprimer le compte</span>     </button>
             <a class="m-3 btn btn-sm btn" :href="'/profile/'+ user.id"><span class="log"> Modifer les informations</span>
       </a>
          </div>
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
<style scoped>



.log {
  color: #fff!important;
}

.btn {
 background-color: #343a40!important;
 width: 200px;
}
.btn:hover {
  opacity: 0.6;
}

.user-list {
  border: 2px solid #343A40;
  margin: 1rem;
}

.user {
  overflow-x: scroll;
  overflow: hidden;
}
</style>