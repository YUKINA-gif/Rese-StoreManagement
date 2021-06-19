<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
        <h2 id="title">店舗情報更新</h2>
      <div class="flex">
        <div class="image_container">
        <h3>店舗画像:</h3>
          <input type="file" @change="onFileChange" accept="image/*" class="image_input">
          <div class="flex">
          <div class="store_image">
            <img :src="'https://rese-image.s3.ap-northeast-3.amazonaws.com/' + val.image" alt="" class="image" >
          </div>
          <span v-if="selectImage">→</span>
          <div v-if="preview" class="store_image">
            <img :src="preview" class="image" />
          </div>
          </div>
          <button class="button image_button" @click="imageUpdate"><p v-if="image_loading">画像更新</p><vue-loading
          type="barsCylon"
          color="#fff"
          v-else
          class="loading"
    ></vue-loading></button>
        </div>
    <div class="table">
    <table>
      <tr>
        <th>店名:</th>
        <td><input type="text" id="store_name" v-model="val.name"></td>
      </tr>
      <tr>
        <th>店舗説明:</th>
        <td><textarea type="text" size="20" id="store_detail" rows="5" cols="30" wrap=”soft” v-model="val.overview"></textarea></td>
      </tr>
      <tr>
        <th>エリア:</th>
        <td><select id="store_area" v-model="val.area_id">
              <option value="" hidden class="pull_down">{{val.area.area}}</option>
              <option
                v-for="(area, index) in areaData"
                :key="index"
                :value="area.id"
                >{{ area.area }}
              </option>
          </select></td>
      </tr>
      <tr>
        <th>ジャンル:</th>
        <td>
          <select id="store_genre" v-model="val.genre_id">
            <option value="" hidden class="pull_down">{{val.genre.genre}}</option>
              <option
                v-for="(genre, index) in genreData"
                :key="index"
                :value="genre.id"
                >{{ genre.genre }}
              </option>
          </select>
        </td>
      </tr>
    </table>
    <button class="button update_button" @click="updateStore"><p v-if="loading">情報更新</p><vue-loading
          type="barsCylon"
          color="#fff"
          v-else
          class="loading"
    ></vue-loading></button>
    </div>
  </div>

      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import { VueLoading } from "vue-loading-template";
export default {
  props: ["val","areaData","genreData"],
  data() {
    return {
      selectImage: false,
      preview: "",
      file: "",
      area_id: "",
      genre_id: "",
      image_loading: true,
      loading: true,
    };
  },
  components:{
    VueLoading
  },
  methods: {
    imageUpdate(){
      this.image_loading = false;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("id", this.val.id);
      axios.post("https://rese-booking.herokuapp.com/api/storeImageUpdate",formData)
      .then(() => {
        alert("画像を更新しました。")
        this.image_loading = true;
      })
      .catch(() => {
        alert("画像を更新できませんでした。お手数ですが再度お試しください。")
        this.image_loading = true;
      })
    },
    updateStore(){
      this.loading = false;
      axios.put("https://rese-booking.herokuapp.com/api/stores",{
        "id" : this.val.id,
        "name":this.val.name,
        "overview": this.val.overview,
        "area_id": this.val.area_id,
        "genre_id": this.val.genre_id,
      })
      .then((response) => {
        console.log(response);
        alert("店舗情報を更新しました。");
        this.$emit("input", false);
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true,
        });
        this.loading = true;
      })
      .catch((err) => {
        console.log(err);
        alert("更新できませんでした。お手数ですが再度お試しください。")
        this.loading = true;
      })
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }
      const reader = new FileReader();
      (reader.onload = (e) => {
        this.preview = e.target.result;
        this.selectImage = true;
      }),
        reader.readAsDataURL(event.target.files[0]);
    },
    reset() {
      (this.preview = null),
      (this.file = null),
      (this.$el.querySelector('input[type="file"]').value = null);
      this.selectImage = false;
    },
  },
};
</script>

<style scoped>
/* ====================
      店舗情報更新
==================== */
  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal_window {
    text-align: left;
    z-index: 2;
    width: 80%;
    padding: 10px;
    background: #fff;
    position: relative;
  }
  .store_image{
    width: 48%;
    margin: 10px 0 20px;
  }
  .image_container{
    width: 50%;
    margin-right: 10px;
  }
  .image_button{
    width: 50%;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
  }
  /* ====================
        テーブル
==================== */
  .table{
    width: 50%;
    text-align: left;
    margin-bottom: 60px;
  }
  tr{
    border: 1px solid #c2c2c2;
  }
  th{
    width: 25%;
    font-size: 16px;
    background-color: rgb(212, 208, 201);
    padding: 10px;
  }
  td{
    width: 60%;
    padding: 10px;
  }
  .update_button {
    background-color: rgb(2, 223, 186);
  }
 
  input,textarea,select{
    width: 100%;
    box-sizing:border-box;
    padding: 5px;
    font-size: 18px;
  }
  textarea{
    display: block;
  }
  .flex{
    justify-content: space-between;
  }
  .update_button{
    width: 50%;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
  }
  span{
    margin-top: 6%;
    font-size: 25px;
    font-weight: bold;
  }
</style>
