<template>
  <div class="store_setting">
    <!-- 店舗登録 -->
    <Management />
    <h2>店舗登録</h2>
    <table>
      <tr>
        <th>店名:</th>
        <td><input type="text" id="store_name" v-model="name" /></td>
      </tr>
      <tr>
        <th>店舗説明:</th>
        <td>
          <textarea
            type="text"
            size="20"
            id="store_detail"
            rows="5"
            cols="30"
            wrap="”soft”"
            v-model="overview"
          ></textarea>
        </td>
      </tr>
      <tr>
        <th>店舗画像:</th>
        <td>
          <input type="file" @change="onFileChange" accept="image/*" />
          <div class="image" v-if="preview">
            <img :src="preview" />
          </div>
        </td>
      </tr>
      <tr>
        <th>エリア:</th>
        <td>
          <select id="store_area" v-model="area_id">
            <option value="" hidden class="pull_down">エリア</option>
            <option v-for="(area, index) in areas" :key="index" :value="area.id"
              >{{ area.area }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>ジャンル:</th>
        <td>
          <select id="store_genre" v-model="genre_id">
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

    <button class="button" @click="createStore">
      <p v-if="loading">登録</p>
      <vue-loading
        type="barsCylon"
        color="#fff"
        v-else
        class="loading"
      ></vue-loading>
    </button>
  </div>
</template>

<style scoped></style>

<script>
import axios from "axios";
import Management from "../components/Management.vue";
import { VueLoading } from "vue-loading-template";
export default {
  props: ["val"],
  data() {
    return {
      preview: "",
      file: "",
      areas: [],
      genres: [],
      name: "",
      overview: "",
      area_id: "",
      genre_id: "",
      loading: true,
    };
  },
  components: {
    Management,
    VueLoading,
  },
  methods: {
    // 画像プレビュー
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
    // エリア、ジャンル情報取得
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
    // 店舗登録
    createStore() {
      this.loading = false;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("name", this.name);
      formData.append("overview", this.overview);
      formData.append("area_id", this.area_id);
      formData.append("genre_id", this.genre_id);

      axios
        .post("https://rese-booking.herokuapp.com/api/stores", formData)
        .then((response) => {
          console.log(response);
          alert("店舗を登録しました。")
          this.loading = true;
        })
        .catch((error) => {
          console.log(error);
          alert("登録できませんでした。お手数ですが、再度お試しください。");
          this.loading = true;
        });
    },
  },
  created() {
    this.getStores();
  },
};
</script>

<style scoped>
/* ====================
      店舗登録
==================== */
  .store_setting {
    width: 80%;
    margin-left: 200px;
  }
  h2 {
    font-size: 25px;
  }
  table {
    width: 100%;
    margin-top: 20px;
    text-align: left;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  tr {
    border: 1px solid #c2c2c2;
  }
  th {
    width: 25%;
    font-size: 18px;
    padding: 40px 20px;
    background-color: rgb(212, 208, 201);
  }
  td {
    width: 60%;
    padding: 15px;
  }
  td:nth-of-type(1) {
    padding-bottom: 30px;
  }
  input,
  textarea,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    font-size: 18px;
  }
  textarea {
    display: block;
  }
  .image {
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
  .button {
    margin: 20px 0 20px 50%;
    width: 100px;
    height: 35px;
    font-weight: bold;
    transform: translate(-50%);
    background-color: rgb(108, 209, 115);
  }
  .loading {
    margin-right: 20px;
  }
</style>
