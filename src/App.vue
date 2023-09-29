<script setup>

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
            Accueil
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/movies">
            Films
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/acteurs">
            Acteurs
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">
            Catégories
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

  <HomeView/>

</template>

<style scoped>

</style>
