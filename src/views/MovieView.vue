<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardFilm from "../components/CardFilm.vue";

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
})
</script>

<template>
  <section>
    <h2>Films à la Une</h2>
    <article class="movies-container">
      <div v-for="film in films" :key="film.id" class="card-container">
        <card-film :film="film"/>
      </div>
    </article>
  </section>
</template>
