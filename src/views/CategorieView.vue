<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardCategorie from "../components/CardCategorie.vue";

let categories = ref('')
let acteurs = ref('')

onMounted(async () => {
  const filmResponse = await axios.get(
      'http://localhost:8000/api/categories?page=1',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
  )
  categories.value = filmResponse.data
})
</script>

<template>
  <section>
    <h2>Catégories</h2>
    <article class="movies-container">
      <div v-for="categorie in categories" :key="categorie.id" class="card-container">
        <card-categorie :categorie="categorie"/>
      </div>
    </article>
  </section>
</template>
