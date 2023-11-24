<script setup>
import {watch, onMounted, ref} from 'vue'
import axios from 'axios'
import { debounce } from 'lodash'
import CardFilm from "../components/CardFilm.vue";

let films = ref('')
let searchString = ref('')

const userToken = ref(localStorage.getItem('user-token'))

const next = ref('')
const previous = ref('')

const getMovies = debounce( async (url) => {
  const URI = url || `http://localhost:8000/api/movies?online=true&order[title]=asc&page=1&title=${searchString.value}`;
  const filmResponse = await axios.get(
      URI,
      {
        headers: {
          'Accept': 'application/ld+json',
          'Authorization': `Bearer ${userToken.value}`,
        },
      }
  )
  films.value = filmResponse.data['hydra:member']

  next.value = filmResponse.data['hydra:view']['hydra:next']
  console.log(next.value)
  previous.value = filmResponse.data['hydra:view']['hydra:previous']
}, 500)

function previousPage() {
  if (previous.value != null) {
    axios.get('http://localhost:8000'+previous.value, {
      headers: {
        'Accept': 'application/ld+json',
        'Authorization': `Bearer ${userToken.value}`,
      },
    }).then(response => {
      films.value = response.data['hydra:member']
      next.value = response.data['hydra:view']['hydra:next']
      previous.value = response.data['hydra:view']['hydra:previous']
    })
  }
}

function nextPage() {
  if (next.value != null) {
    axios.get('http://localhost:8000'+next.value, {
      headers: {
        'Accept': 'application/ld+json',
        'Authorization': `Bearer ${userToken.value}`,
      },
    }).then(response => {
      films.value = response.data['hydra:member']
      next.value = response.data['hydra:view']['hydra:next']
      previous.value = response.data['hydra:view']['hydra:previous']
    })
  }
}

// Watch searchString and call the getMovies function.
watch(searchString, () => getMovies())

// Make API request when mounted.
onMounted(getMovies)

// When searchString is updated, call the getMovies function.
watch(searchString, () => getMovies())
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
            <button class="nav_btn" @click="previousPage()" v-if="previous != null">Page précédente</button>
            <button class="nav_btn" @click="nextPage()" v-if="next != null">Page suivante</button>
      <div class="movies-container">
        <div v-for="film in films" :key="film.id" class="card-container">
          <card-film :film="film"/>
        </div>
      </div>
    </article>
  </section>
</template>