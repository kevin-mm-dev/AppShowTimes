<template>
  <div class="col-md-4 offset-md-4">
    <div class="card">

    <form @submit.prevent="HandleUpdate" class="card-body">
      <h4 class="text-center">Update Movie</h4>
      <img v-if="new_image" :src="''+myImage.display" class="img-fluid" alt="movieImage" />
      <img v-else :src="CheckImage() ?('http://localhost:3000/'+myImage.display) : no_image"  class="img-fluid" alt="movieImage"
          />
          <div class="row" id="input_file">
              <input
              type="file"
              aria-label="Archivo"
              name="input_file"
              id="img_perfil"
              @change="ImageHandler"
              accept="image/*"
              class="form-control mb-3"
              />
          </div>
      <input v-model="currentMovie.title" type="text" placeholder="Write a title" class="form-control mb-3" autofocus>
      <textarea v-model="currentMovie.description" rows="3" id="" placeholder="Write a description"
        class="form-control mb-3"></textarea>
      <button class="btn btn-primary w-100">Update</button>
    </form>
      <div class="card-footer text-muted">
        <button class="btn btn-danger w-100" @click="HandleDelete">Delete</button>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import no_image from "@/assets/no-image.png";
import {MyImage} from '@/interfaces/myImage';
import { Movie } from '@/interfaces/movie';
import { GetMovie, UpdateMovie, DeleteMovie, CreateMovie } from '@/services/MovieService';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      currentMovie: {} as Movie,
      myImage:{} as MyImage,
      no_image: no_image,
      new_image:false

    }
  },
  methods: {
    async LoadMovie(id: string) {
      const { data, status } = await GetMovie(id);
      if (status != 200) {
        console.log('error');
        return;
      }
      console.log('data', data);

      this.currentMovie = data;
      this.myImage.display=data.imgPath;

    },
    CheckImage(){
      return this.myImage.display != null && this.myImage.display != '';
    },
    async ImageHandler(e:any) {
      if (e) {
        let files = e?.target?.files;
          if (!files.length) {
            this.myImage.data = '';
            this.myImage.display = '';
            return;
          }
          this.CreateImage(files[0]); // display myImage.data only
          this.myImage.data = e.target.files[0];
      }
    },
    CreateImage(file:any) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e!=null && e['target']!=null) {
          const dis=JSON.parse(JSON.stringify(e['target']['result']));
          this.myImage.display = dis;
          this.new_image=true;
        }
      };
      reader.readAsDataURL(file);
    },
    async HandleUpdate() {
      if (typeof this.$route.params.id === "string") {
        let formData = new FormData();
        (this.new_image)&&(formData.append("imageMovie", this.myImage.data));
        formData.append("title", this.currentMovie.title);
        formData.append("description", this.currentMovie.description);
        const { data, status } = await UpdateMovie(this.$route.params.id, formData);
        if (status != 200) {
          console.log('error');
          return;
        }
      this.$router.push({name:"movies"})

      }
    },

    async HandleDelete() {
      if (typeof this.$route.params.id === "string") {
        const { data, status } = await DeleteMovie(this.$route.params.id);
        if (status != 200) {
          console.log('error');
          return;
        }
        this.$router.push({ name: "movies" })

      }
    }

  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.LoadMovie(this.$route.params.id);
    }
  },
});
</script>

<style>
</style>
