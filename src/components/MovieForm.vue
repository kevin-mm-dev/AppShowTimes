<template>
<div class="container">
  <div class="col-md-4 offset-md-4">
    <form @submit.prevent="SaveMovie" class="card card-body">
      <h4 class="text-center">Create Movie</h4>
        <img
          :src="myImage.display != null ? myImage.display : noImage"
              class="img-fluid mb-3"
              alt="movieImage"
          />
          <div class="row" id="input_file">
              <input
              type="file"
              aria-label="Archivo"
              name="input_file"
              id="img_perfil"
              @change="ImageHandler"
              accept="image/*"
              class="form-control"
              />
          </div>
      <input v-model="movie.title" type="text" placeholder="Write a title" class="form-control mb-3" autofocus>
      <textarea v-model="movie.description" rows="3" id="" placeholder="Write a description" class="form-control mb-3"></textarea>


      <p :class="'mb-3 text-'+(currentError.status<300?'success':'danger')">{{ currentError.message }}</p>

      
      <button class="btn btn-primary" :disabled="!movie.title || !movie.description || !myImage.data">Save</button>
    </form>
  </div>
    
</div>

</template>

<script lang="ts">
import noImage from "@/assets/no-image.png";
import { defineComponent } from 'vue';
import {Movie} from '@/interfaces/movie';
import {MyImage} from '@/interfaces/myImage';
import {CreateMovie} from '@/services/MovieService';


export default defineComponent({
  name: 'App',
  data(){
    return {
      movie:{} as Movie,
      myImage:{} as MyImage,
      noImage: noImage,
      currentError:{
        message:'',
        status:0,
      },
      errors:{
        400:{
          is_active:false,
          message:'Make sure you send valid information.'
        },
        404:{
          is_active:false,
          message:'Not Found'
        },
        500:{
          is_active:false,
          message:'The server has encountered a situation that it does not know how to handle.'
        }
      }
    }
  },
  methods:{
    async SaveMovie(){
      let formData = new FormData();
      formData.append("imageMovie", this.myImage.data);
      formData.append("title", this.movie.title);
      formData.append("description", this.movie.description);
      const {data,status}= await CreateMovie(formData);
      this.currentError.message=data.message;
      this.currentError.status=status;
      if (status !=201){
        console.log('error');        
      }else{
        setTimeout(() => {
          this.$router.push({name:"movies"})
        }, 250);
      }
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
        }
      };
      reader.readAsDataURL(file);
  },
 
  }

});
</script>

<style>

</style>