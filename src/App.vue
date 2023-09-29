<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from "./views/HomeView.vue";
</script>
<template>
  <header>
    <div class="wrapper">
      <div>
        <h1>MOVIEs APP</h1>
        <em>Requêtes API vers un projet Symfony pour récupérer et afficher des films.
          <!--          <font-awesome-icon :icon="['fal', 'question-square']" @click="info = !info"/>-->
        </em>
      </div>
    </div>
  </header>

  <aside class="side_menu">
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <font-awesome-icon :icon="['fal', 'house-heart']" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/movies">
            <font-awesome-icon :icon="['fal', 'film']" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/acteurs">
            <font-awesome-icon :icon="['fal', 'users']" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">
            <font-awesome-icon :icon="['fal', 'list-timeline']" />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

  <RouterView/>

</template>

<style scoped>

</style>
