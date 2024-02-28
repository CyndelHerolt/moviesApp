<script setup>
import {useRoute} from "vue-router"
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardActeur from "../components/CardActeur.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const route = useRoute()
const id = route.params.id
let film = ref('')
let categories = ref('')

const userToken = ref(localStorage.getItem('user-token'));

let selectedCategoryId = ref(null)

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
  selectedCategoryId.value = film.value.category.id
})

onMounted(async () => {
  const filmCategoriesResponse = await axios.get(
      'http://localhost:8000/api/categories?page=1',
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken.value}`
        }
      }
  )
  categories.value = filmCategoriesResponse.data
})


let posterPath = "/src/assets/posters/"; // Le chemin d'accès à l'image

let editMode = ref(false)
let uploadImg = ref(false)
let fileInput = ref(null)

async function updateFilm() {
  await axios.patch(
      `http://localhost:8000/api/movies/${id}`,
      {
        title: film.value.title,
        description: film.value.description,
        duration: film.value.duration,
        category: `http://localhost:8000/api/categories/${film.value.category.id}`,
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

function toggleUploadImg() {
  uploadImg.value = !uploadImg.value
}

function updateFileInput(event) {
  fileInput.value = event.target;
}

async function uploadImage() {
  const formData = new FormData()
  formData.append('file', fileInput.value.files[0])
  await axios.post(
      `http://localhost:8000/api/media_objects`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken.value}`
        }
      }
  )
  uploadImg.value = false
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
}

</script>

<template>
  <div v-if="film === ''">Loading...</div>
  <section v-else>
    <article class="fiche-article">
      <div class="banniereContainer">
        <div v-if="uploadImg">
          <form @submit.prevent="uploadImage">
            <input type="file" :ref="fileInput" @change="updateFileInput"/>
            <button type="submit">Envoyer</button>
            <button @click="toggleUploadImg(film.id)">Annuler</button>
          </form>
        </div>
        <div v-else>
          <img class="banniere" :src="posterPath+film.image" alt="affiche du film">
          <button @click="toggleUploadImg(film.id)">
            <font-awesome-icon :icon="['fal', 'pen-to-square']" size="xl"/>
          </button>
        </div>
      </div>

      <div>

        <div v-if="editMode">
          <form @submit.prevent="updateFilm">

            <div class="title">
              <label for="title">Titre</label>
              <input v-model="film.title" id="title" type="text">
            </div>

            <div class="tag">
              <label for="category">Catégorie</label>
              <select v-model="selectedCategoryId" name="categories" id="category">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="description">
              <label for="description">Description</label>
              <textarea v-model="film.description" id="description" rows="4"></textarea>
            </div>

            <div class="duration">
              <label for="duration">Durée</label>
              <input v-model="film.duration" id="duration" type="text">
            </div>

            <button type="submit" class="edit-btn">Mettre à jour</button>

          </form>
          <button class="edit-btn" @click="toggleDetails(film.id)">Annuler</button>
        </div>
        <div v-else>
          <div class="title-actions">
            <h1>{{ film.title }}</h1>
            <font-awesome-icon class="edit" @click="toggleDetails(film.id)" :icon="['fal', 'pen-to-square']" size="xl"/>
          </div>

          <div class="tag">
            {{ film.category.name }}
          </div>

          <p>{{ film.description }}</p>
          <small>{{ film.duration }} minutes</small>

        </div>
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