<script setup>
const props = defineProps(['acteur'])
const actor = props.acteur
</script>

<template>
  <div class="card actor">
    <h3>{{ actor.firstName }} {{ actor.lastName }}</h3>
    <small v-for="nationalite in actor.nationalite">{{nationalite}}</small>
    <hr>
    <ul>
      <li v-for="movie in actor.movies"><routerLink :to="'/fiche-movie/'+movie.id" class="link">{{ movie.title }}</routerLink></li>
    </ul>
  </div>
</template>

<style scoped>

</style>