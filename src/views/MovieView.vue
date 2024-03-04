<script setup>
import {watch, onMounted, ref} from 'vue'
import axios from 'axios'
import {debounce} from 'lodash'
import CardFilm from "../components/CardFilm.vue";

let films = ref('')
let searchString = ref('')

const userToken = ref(localStorage.getItem('user-token'))

const next = ref('')
const previous = ref('')

const getMovies = debounce(async (url) => {
  const URI = url || `https://185.216.25.179/wr506/api/movies?online=true&order[title]=asc&page=1&title=${searchString.value}`;
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
    axios.get('http://localhost:8000' + previous.value, {
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
    axios.get('http://localhost:8000' + next.value, {
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

watch(searchString, () => getMovies())
onMounted(getMovies)
watch(searchString, () => getMovies())

const categories = ref([]);
const actors = ref([]);

onMounted(async () => {
  try {
    const categoriesResponse = await axios.get('https://185.216.25.179/wr506/api/categories', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    categories.value = categoriesResponse.data;

    const actorsResponse = await axios.get('https://185.216.25.179/wr506/api/actors', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    actors.value = actorsResponse.data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

const movie = ref({
  title: '',
  description: '',
  releaseDate: '',
  duration: '',
  category: '',
  actor: [],
  image: '',
  online: true
});

const createMovie = async () => {
  try {
    await axios.post('https://185.216.25.179/wr506/api/movies', movie.value, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  movie.image = file;
};

const showForm = ref(false);

const toggleForm = () => {
  showForm.value = !showForm.value;
};

// console.log(categories)
// console.log(actors)
</script>

<template>
  <section>
    <button v-if="!showForm" @click="toggleForm">Ajouter un film</button>
    <button v-if="showForm" @click="toggleForm">Retour</button>
    <form v-if="showForm" @submit.prevent="createMovie">
      <div class="form-content">
        <div class="form-row">
          <label for="title">Titre</label>
          <input v-model="movie.title" placeholder="Title" required/>
        </div>
        <div class="form-row">
          <label for="description">Description</label>
          <textarea v-model="movie.description" placeholder="Description" required></textarea>
        </div>
        <div class="form-row">
          <label for="releaseDate">Date de sortie</label>
          <input v-model="movie.releaseDate" type="date" placeholder="Release Date" required/>
        </div>
        <div class="form-row">
          <label for="duration">Durée</label>
          <input v-model="movie.duration" type="text" placeholder="Duration" required/>
        </div>
        <div class="form-row">
          <label for="category">Catégorie</label>
          <select v-model="movie.category" required>
            <option value="" disabled selected>Sélectionner une catégorie</option>
            <option v-for="category in categories" :value="category.url" :key="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <label for="category">Acteurs</label>
          <select v-model="movie.actor" required>
            <option value="" disabled selected>Sélectionner un acteur</option>
            <option v-for="actor in actors" :value="actor.url" :key="actor.id">
              {{ actor.firstName }} {{ actor.lastName }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <label for="image">Image</label>
          <input type="file" @change="onFileChange" value="" required/>
        </div>
        <div class="form-row">
          <label for="online">En ligne</label>
          <input type="checkbox" id="online" v-model="movie.online"/>
        </div>
      </div>
      <button type="submit">Create Movie</button>
    </form>
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

<style scoped>
form {

  .form-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;

    .form-row {
      display: flex;
      flex-direction: column;

      input, textarea, select {
        width: 500px
      }
    }
  }
}
</style>