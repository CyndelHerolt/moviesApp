<script setup>
const props = defineProps(['film'])
const movie = props.film

const date = new Date(movie.releaseDate)
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
movie.releaseDate = date.toLocaleDateString('fr-FR', options)
</script>

<template>
  <h1>test</h1>
<h2>{{movie.title}}</h2>
  <em>{{movie.description}}</em>
  <hr>
  <div>
    <small>{{movie.releaseDate}}</small>
    <span> | </span>
    <small>{{movie.duration}} minutes</small>
  </div>
</template>

<style scoped>

</style>