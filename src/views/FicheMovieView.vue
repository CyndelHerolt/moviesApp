<script setup>
import {useRoute} from "vue-router"
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardActeur from "../components/CardActeur.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const route = useRoute()
const id = route.params.id
let film = ref('')

const userToken = ref(localStorage.getItem('user-token'));

onMounted(async () => {
  const filmResponse = await axios.get(
      'http://localhost:8000/api/movie/' + id,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken.value}`
        }
      }
  )
  film.value = filmResponse.data
})

let posterPath = "/src/assets/posters/"; // Le chemin d'accès à l'image

let editMode = ref(false)

async function updateFilm() {
  await axios.patch(
      `http://localhost:8000/api/movies/${id}`,
      {
        title: film.value.title
      },
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Authorization': `Bearer ${userToken.value}`
        }
      }
  )
  editMode.value = false
}

function toggleDetails() {
  editMode.value = !editMode.value
}
</script>
<template>
  <div v-if="film === ''">Loading...</div>
  <section v-else>
    <article class="fiche-article">
      <img class="banniere" :src="posterPath+film.image" alt="affiche du film">
      <div>
        <div v-if="editMode">
          <form @submit.prevent="updateFilm">
            <label class="hidden" for="title">Titre</label>
            <input v-model="film.title" id="title" type="text">
            <button type="submit" class="edit-btn">Mettre à jour</button>
          </form>
          <button class="edit-btn" @click="toggleDetails(film.id)">Annuler</button>
        </div>
        <div v-else class="title-actions">
          <h1>{{ film.title }}</h1>
            <font-awesome-icon class="edit" @click="toggleDetails(film.id)" :icon="['fal', 'pen-to-square']" size="xl" />
        </div>
        <div class="tag">
          {{ film.category.name }}
        </div>
        <p>{{ film.description }}</p>
        <small>{{ film.duration }} minutes</small>
      </div>
    </article>
    <article>
      <h2>Acteurs figurants dans ce film</h2>
      <div v-for="acteur in film.actor" :key="acteur.id">
        <card-acteur :acteur="acteur"/>
      </div>
    </article>
    <div>
      <h2></h2>
    </div>
  </section>
</template>

<style scoped>
.hidden {
  display: none;
}

.title-actions {
  display: flex;
  align-items: center;
}

.edit {
  margin: 1rem;
}

.edit-btn {
  border: solid 1px white;
  background-color: transparent;
  color: white;
}
</style>