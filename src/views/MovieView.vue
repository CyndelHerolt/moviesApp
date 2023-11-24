<script setup>
import {watch, onMounted, ref} from 'vue'
import axios from 'axios'
import CardFilm from "../components/CardFilm.vue";

let films = ref('')
let searchString = ref('')

const userToken = ref(localStorage.getItem('user-token'))

const getMovies = async () => {
  const URI = `http://localhost:8000/api/movies?online=true&order[title]=asc&page=1&title=${searchString.value}`
  const filmResponse = await axios.get(
      URI,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken.value}`,
        },
      }
  )
  films.value = filmResponse.data
}

// Make API request when mounted.
onMounted(getMovies)

// When searchString is updated, call the getMovies function.
watch(searchString, getMovies)
</script>

<template>
  <section>
    <article>
      <input
          type="text"
          v-model="searchString"
          placeholder="Rechercher par titre"
      />
      <h2>Films à la Une</h2>
      <div class="movies-container">
        <div v-for="film in films" :key="film.id" class="card-container">
          <card-film :film="film"/>
        </div>
      </div>
    </article>
  </section>
</template>