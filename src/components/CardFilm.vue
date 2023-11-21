<script setup>
const props = defineProps(['film'])
const movie = props.film

const date = new Date(movie.releaseDate)
const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
movie.releaseDate = date.toLocaleDateString('fr-FR', options)

let posterPath = "src/assets/posters/" + movie.image; // Le chemin d'accès à l'image
</script>

<template>
  <routerLink :to="'/fiche-movie/'+movie.id"  class="card">
    <div>
      <p class="categorie">{{movie.category.name}}</p>
      <img :src="posterPath" alt="affiche du film">
      <div class="infos">

        <h3>{{ movie.title }}</h3>

        <em>{{ movie.description }}</em>

        <div>
          <small>Date de sortie : {{ movie.releaseDate }}</small>
<!--          <span> | </span>-->
          <br>
          <small>Durée : {{ movie.duration }} minutes</small>
        </div>
        <h4>Acteurs principaux</h4>
        <ul>
          <li v-for="acteur in movie.actor">{{ acteur.firstName }}</li>
        </ul>
      </div>
    </div>
  </routerLink>
</template>

<style scoped>

</style>