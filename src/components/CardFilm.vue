<script setup>
const props = defineProps(['film'])
const movie = props.film

const date = new Date(movie.releaseDate)
const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
movie.releaseDate = date.toLocaleDateString('fr-FR', options)
</script>

<template>
  <div class="card">
    <h3>{{ movie.title }}</h3>
    <em>{{ movie.description }}</em>

    <div>
      <small>{{ movie.releaseDate }}</small>
      <span> | </span>
      <small>{{ movie.duration }} minutes</small>
    </div>
    <hr>
    <h4>Acteurs</h4>
    <ul>
    <li v-for="acteur in movie.actor">{{acteur.firstName}}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>