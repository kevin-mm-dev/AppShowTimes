<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Show Times</router-link>
      <div class="navbar-nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/movies/new">Create Movie</router-link>
          </li>
          <li class="nav-item">
            <meta-mask></meta-mask>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, handleError } from '@vue/runtime-core';
import MetaMask from '@/components/MetaMask.vue';
export default defineComponent({
  name: 'NavBar',
  components: {
    MetaMask
  }

})

</script>