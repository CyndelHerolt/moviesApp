<script setup>
const props = defineProps(['film'])
const movie = props.film

const date = new Date(movie.releaseDate)
const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
movie.releaseDate = date.toLocaleDateString('fr-FR', options)

let posterPath = "/src/assets/posters/" + movie.image; // Le chemin d'accès à l'image

import axios from 'axios';

const deleteMovie = async () => {
  try {
    await axios.delete(`https://185.216.25.179/wr506/api/movies/${movie.id}`, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
</script>

<template>
  <routerLink :to="'/fiche-movie/'+movie.id" class="card">
    <div>
      <p v-if="movie.category" class="categorie">{{movie.category.name}}</p>
      <img :src="posterPath" alt="affiche du film">
      <div class="infos">

        <h3>{{ movie.title }}</h3>
        <em>{{ movie.description }}</em>
        <div>
          <small>Date de sortie : {{ movie.releaseDate }}</small>
          <br>
          <small>Durée : {{ movie.duration }} minutes</small>
        </div>
        <h4>Acteurs principaux</h4>
        <ul>
          <li v-for="acteur in movie.actor">{{ acteur.firstName }} {{ acteur.lastName }}</li>
        </ul>
      </div>
    </div>
  </routerLink>
  <button @click="deleteMovie">Supprimer le film</button>
</template>

<style scoped>

</style>