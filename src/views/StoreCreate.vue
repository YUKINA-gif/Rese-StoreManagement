<template>
  <div class="store_setting">
    <Management />
    <h2>店舗登録</h2>
    <table>
      <tr>
        <th>店名:</th>
        <td><input type="text" id="store_name"></td>
      </tr>
      <tr>
        <th>店舗説明:</th>
        <td><textarea type="text" size="20" id="store_detail" rows="5" cols="30" wrap=”soft”></textarea></td>
      </tr>
      <tr>
        <th>店舗画像:</th>
        <td>
          <input type="file" @change="onFileChange" accept="image/*">
           <div class="image" v-if="preview">
            <img :src="preview" />
          </div>
        </td>
      </tr>
      <tr>
        <th>エリア:</th>
        <td><select id="store_area">
              <option value="" hidden class="pull_down">エリア</option>
              <option
                v-for="(area, index) in areas"
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
            <option value="" hidden class="pull_down">ジャンル</option>
              <option
                v-for="(genre, index) in genres"
                :key="index"
                :value="genre.id"
                >{{ genre.genre }}
              </option>
          </select>
        </td>
      </tr>
    </table>
  <button class="button">登録</button>
   
  </div>
</template>

<style scoped>

</style>

<script>
import axios from 'axios';
import Management from '../components/Management.vue';
export default {
  props:["val"],
  data() {
    return {
      preview: "",
      file: "",
      areas: [],
      genres: [],
    }
  },
  components:{
    Management
  },
  methods: {
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
      }),
        reader.readAsDataURL(event.target.files[0]);
    },
    reset() {
      (this.preview = null),
        (this.file = null),
        (this.$el.querySelector('input[type="file"]').value = null);
    },
    getStores() {
      axios
        .get(
          "https://rese-booking.herokuapp.com/api/stores/" +
            this.$store.state.user.id
        )
        .then((response) => {
          this.areas = response.data.item.area;
          this.genres = response.data.item.genre;
        });
    },
  },
  created() {
    this.getStores();
  },
}
</script>

<style scoped>
.store_setting{
  width:80%;
  margin-left: 200px;
}
h2{
  font-size:25px;
}
table{
  width: 100%;
  margin-top: 20px;
  text-align: left;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}
tr{
  border: 1px solid #c2c2c2;
}
th{
  width: 25%;
  font-size: 18px;
  padding:40px 20px;
  background-color: rgb(212, 208, 201);
}
td{
  width: 60%;
  padding: 15px;
}
td:nth-of-type(1){
  padding-bottom: 30px;
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
.image{
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 60%;
  margin: 10px 0;
}
.image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.button{
  margin: 20px 0 20px 50%;
  width: 100px;
  font-weight: bold;
  transform: translate(-50%);
  background-color: rgb(108, 209, 115);
}
</style>