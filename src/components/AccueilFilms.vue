<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import CardFilm from "./CardFilm.vue";

let data = ref('')
const dataAll = ref('')

onMounted(async () => {
  const response = await axios.get(
      'http://localhost:8000/api/movies?page=1',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
  )
  data.value = response.data
  dataAll.value = data.value;
  // console.log(response)
})
</script>

<template>

  <div v-for="(film, key) in data">
    <card-film v-if="key < 4" :film="film"/>
  </div>

</template>
