<script setup>
import {useRoute} from "vue-router"
import {onMounted, ref} from 'vue'
import axios from 'axios'

const route = useRoute()
const id = route.params.id
let film = ref('')

onMounted(async () => {
  const filmResponse = await axios.get(
      'http://localhost:8000/api/movie/' + id,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
  )
  film.value = filmResponse.data
})
</script>
<template>
  <div class="about">
    <h1>{{ film.title }}</h1>
    <p>{{ film.description }}</p>
  </div>
</template>