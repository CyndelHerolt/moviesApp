import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FicheMovieView from "../views/FicheMovieView.vue";
import FicheActorView from "../views/FicheActorView.vue";
import FicheCategoryView from "../views/FicheCategoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieView.vue')
    },
    {
      path: '/acteurs',
      name: 'acteurs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActorView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CategorieView.vue')
    },
    {
      path: '/fiche-movie/:id',
      name: 'ficheMovie',
      component: FicheMovieView
    },
    {
      path: '/fiche-actor/:id',
      name: 'ficheActor',
      component: FicheActorView
    },
    {
      path: '/fiche-categorie/:id',
      name: 'ficheCategorie',
      component: FicheCategoryView
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});

export default router
