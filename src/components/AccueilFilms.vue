<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardFilm from "./CardFilm.vue";
import CardActeur from "./CardActeur.vue";

let films = ref('')
let acteurs = ref('')

onMounted(async () => {
  const filmResponse = await axios.get(
      'http://localhost:8000/api/movies?page=1',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
  )
  films.value = filmResponse.data

  const acteurResponse = await axios.get(
      'http://localhost:8000/api/actors?page=1',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
  )
  console.log(acteurResponse)
  acteurs.value = acteurResponse.data

})
</script>

<template>
  <section>
    <h2>Films à la Une</h2>
    <article class="movies-container">
      <div v-for="film in films.slice(0,4)" :key="film.id" class="card-container">
        <card-film :film="film"/>
      </div>
    </article>
  </section>

  <section>
    <h2>4 acteurs (API)</h2>
    <article class="movies-container">
    <div v-for="acteur in acteurs.slice(0,4)" :key="acteur.id" style="flex: 1">
      <card-acteur :acteur="acteur"/>
    </div>
    </article>
  </section>
</template>
