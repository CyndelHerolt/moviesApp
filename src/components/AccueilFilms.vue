<script setup>
import { watch, ref, onMounted } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash'
import CardFilm from "./CardFilm.vue";
import CardActeur from "./CardActeur.vue";

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

console.log(token)

let films = ref('')
let acteurs = ref('')
let searchString = ref('')

const apiCall = debounce(async () => {
  const URI = `https://185.216.25.179/wr506/api/movies?online=true&page=1&title=${searchString.value}`
  const filmResponse = await axios.get(
      URI,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  )
  films.value = filmResponse.data

  const acteurResponse = await axios.get(
      'https://185.216.25.179/wr506/api/actors?page=1',
      {
        headers: {
          'Accept': 'application/json',
        }
      }
  )
  acteurs.value = acteurResponse.data
}, 500)

// When searchString is updated, call the apiCall function
watch(searchString, apiCall)

// Make API request when mounted.
onMounted(apiCall)
</script>

<template>
  <section>
    <article>
      <input
          type="text"
          v-model="searchString"
          placeholder="Rechercher par titre de film"
      />
      <h2>Films à la Une</h2>
      <div class="movies-container">
        <div v-for="film in films.slice(0, 4)" :key="film.id" class="card-container">
          <card-film :film="film"/>
        </div>
      </div>
    </article>
  </section>

  <section>
    <article>
      <h2>4 acteurs (API)</h2>
      <div class="movies-container">
        <div v-for="acteur in acteurs.slice(0,4)" :key="acteur.id" style="flex: 1">
          <card-acteur :acteur="acteur"/>
        </div>
      </div>
    </article>
  </section>
</template>