import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile-details',
      // lazy-loaded
      component: () => import('./views/mvProfile.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import("./views/PostsList.vue")
    },
    {
      path: "/posts/:id",
      name: "post-details",
      component: () => import("./views/Post.vue")
    },
    {
      path: "/posts/:id/comments/:id",
      name: "com-details",
      component: () => import("./views/Com.vue")
    },



   
    
   

    {
      path: "/add",
      name: "add",
      component: () => import("./views/AddPost.vue")
    }
   
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});