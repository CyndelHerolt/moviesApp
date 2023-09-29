<script setup>
const props = defineProps(['acteur'])
const actor = props.acteur
</script>

<template>
  <div class="card">
    <h3>{{ actor.firstName }} {{ actor.lastName }}</h3>
    <small v-for="nationalite in actor.nationalite">{{nationalite}}</small>
  </div>
</template>

<style scoped>

</style>