<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardActeur from "../components/CardActeur.vue";

let films = ref('')
let acteurs = ref('')

onMounted(async () => {

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
    <h2>Acteurs</h2>
    <article class="movies-container">
      <div v-for="acteur in acteurs" :key="acteur.id" style="flex: 1">
        <card-acteur :acteur="acteur"/>
      </div>
    </article>
  </section>
</template>
