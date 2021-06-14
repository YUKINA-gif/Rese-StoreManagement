<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
        <h2 id="title">店舗情報更新</h2>
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
        <th>店舗画像:</th>
        <td>
          <input type="file" @change="onFileChange" accept="image/*">
          <div class="flex">
          <div class="store_image">
            <img :src="val.image" alt="" class="image" >
          </div>
          <span v-if="selectImage">→</span>
          <div v-if="preview" class="store_image">
            <img :src="preview" class="image" />
          </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>エリア:</th>
        <td><select id="store_area">
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
          <select id="store_genre">
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
  <button class="button update_button">更新</button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  props: ["val","areaData","genreData"],
  data() {
    return {
      selectImage: false,
      preview: "",
    };
  },
  methods: {
    booking_update() {
      axios
        
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
    width: 60%;
    padding: 10px;
    background: #fff;
  }
  table{
    width: 100%;
    text-align: left;
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
  .store_image{
    width: 35%;
    margin-top: 10px;
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
    margin: 10px 0 0 50%;
    transform: translate(-50%);
    width: 100px;
    background-color: #000;
  }
  span{
    margin-top: 6%;
    font-size: 25px;
    font-weight: bold;
  }
</style>
