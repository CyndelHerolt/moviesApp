<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, computed} from 'vue';

const userToken = ref(localStorage.getItem('user-token'));

const isLoggedIn = computed(() => {
  return userToken.value != null;
});

const logout = () => {
  localStorage.removeItem('user-token');
  location.reload();
};
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
      <ul v-if="isLoggedIn">
        <li>
          <RouterLink to="/">
            <font-awesome-icon :icon="['fal', 'house-heart']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/movies">
            <font-awesome-icon :icon="['fal', 'film']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/acteurs">
            <font-awesome-icon :icon="['fal', 'users']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">
            <font-awesome-icon :icon="['fal', 'list-timeline']"/>
          </RouterLink>
        </li>
        <li @click="logout">
          <font-awesome-icon :icon="['fal', 'user-large-slash']"/>
        </li>
      </ul>
      <ul v-else>
        <li>
          <RouterLink to="/login">
            <font-awesome-icon :icon="['fal', 'user']"/>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

  <RouterView/>

</template>

<style scoped>

</style>
