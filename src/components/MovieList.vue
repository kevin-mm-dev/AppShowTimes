<template>
  <div class="row">
    <div class="col-md-4 p-4"  style="cursor: pointer" v-for="(item,index) in movies" :key="index">
      <div class="card card-img"  @click="$router.push(`/movies/${item._id}`)">
          <div class="card-header">
            {{ item.title }}
          </div>
          <img :src="item.imgPath?('http://localhost:3000/'+item.imgPath):no_image" alt="movieImagen" class="img-card-top w-100">
          <div class="card-body">
            {{ item.description }}
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import no_image from "@/assets/no-image.png";
import { Movie } from '@/interfaces/movie';
import { GetMovies } from '@/services/MovieService';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      movies: [] as Movie[],
      no_image: no_image,

    }
  },
  methods: {
    async LoadMovies() {
      const { data, status } = await GetMovies();
      if (status != 200) {
        console.log('error');
      }
      this.movies = data;
    }
  },
  mounted() {
    this.LoadMovies();
  },
});
</script>

<style>
.card-img{
  cursor:pointer;
}
.card-img:hover{
  border:1px solid #333;
}
.card-img img{
  max-height: 185px;
}
</style>
