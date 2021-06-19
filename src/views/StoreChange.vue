<template>
  <div class="store_update">
    <!-- 店舗情報変更・削除 -->
    <Management />
    <h2>店舗情報変更・削除</h2>
    <!-- 店舗検索 -->
    <div class="flex search_flex">
      <!-- 店舗検索（エリア） -->
      <select name="エリア" v-model="searchArea">
        <option value="" hidden class="pull_down">エリア </option>
        <option value="0">すべて</option>
        <option v-for="(area, index) in areas" :key="index" :value="area.id"
          >{{ area.area }}
        </option>
      </select>
      <!-- 店舗検索（ジャンル） -->
      <select name="ジャンル" v-model="searchGenre">
        <option value="" hidden class="pull_down">ジャンル</option>
        <option value="0">すべて</option>
        <option
          v-for="(genre, index) in genres"
          :key="index"
          :value="genre.id"
          >{{ genre.genre }}</option
        >
      </select>
      <!-- 店舗検索（店名） -->
      <input type="search" placeholder="店名" v-model="searchStoreName" />
      <button type="submit" class="button search_button" @click="storeSearch">
        検索
      </button>
    </div>
    <!-- 店舗一覧 -->
    <div class="stores_container">
      <h3 id="store_title">店舗</h3>
      <p v-if="searchResult">検索店舗はありません</p>
      <div class="wrap store_flex" v-else>
        <vue-loading
          type="spin"
          color="#000"
          :size="{ width: '60px', height: '60px' }"
          v-if="loading"
          class="loading"
        ></vue-loading>
        <div
          class="flex store_card"
          v-for="(store, index) in stores"
          :key="index"
          v-else
        >
          <img
            :src="
              'https://rese-image.s3.ap-northeast-3.amazonaws.com/' +
                store.image
            "
            alt=""
            class="store_image image"
          />
          <div class="store_detail">
            <span class="store_name">{{ store.name }}</span>
            <div>
              <p class="tag">#{{ store.area.area }}</p>
              <p class="tag">#{{ store.genre.genre }}</p>
            </div>
          </div>
          <div class="store_overview">
            <p>{{ store.overview }}</p>
          </div>
          <div>
            <button
              class="button store_button update_button"
              @click="openModal(store)"
            >
              店舗情報変更
            </button>
            <button
              class="button store_button delete_button"
              @click="openModalDel(store)"
            >
              店舗削除
            </button>
          </div>
        </div>
        <!-- 店舗情報変更画面 -->
        <Modal
          v-if="modal"
          @close="closeModal"
          :val="sendStoreData"
          :areaData="areaData"
          :genreData="genreData"
        ></Modal>
        <!-- 店舗削除画面 -->
        <ModalDel
          v-if="modal_del"
          @close="closeModalDel"
          :val="deleteItem"
        ></ModalDel>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import Management from "../components/Management.vue";
import Modal from "../components/StoreUpdate.vue";
import ModalDel from "../components/StoreDelete.vue";
import axios from "axios";
import { VueLoading } from "vue-loading-template";
export default {
  data() {
    return {
      preview: "",
      file: "",
      stores: [],
      areas: [],
      genres: [],
      searchArea: "",
      searchGenre: "",
      searchStoreName: "",
      searchResult: false,
      modal: false,
      modal_del: false,
      loading: false,
    };
  },
  components: {
    Management,
    Modal,
    ModalDel,
    VueLoading,
  },
  methods: {
    // 店舗一覧
    async getStores() {
      this.loading = true;
      await axios
        .get(
          "https://rese-booking.herokuapp.com/api/stores/0"
        )
        .then((response) => {
          this.stores = response.data.item.store;
          this.areas = response.data.item.area;
          this.genres = response.data.item.genre;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 店舗検索
    async storeSearch() {
      await axios
        .get(
          "https://rese-booking.herokuapp.com/api/storesSeach/0",
          {
            params: {
              name: this.searchStoreName,
              area_id: this.searchArea,
              genre_id: this.searchGenre,
            },
          }
        )
        .then((response) => {
          this.stores = response.data.store;
          this.searchResult = false;
        })
        .catch(() => {
          this.searchResult = true;
        });
    },
    // 店舗情報変更モーダルウィンドウ表示
    openModal(store) {
      this.modal = true;
      this.sendStoreData = store;
      this.areaData = this.areas;
      this.genreData = this.genres;
    },
    closeModal() {
      this.modal = false;
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      });
    },
    // 店舗削除モーダルウィンドウ表示
    openModalDel(store) {
      this.modal_del = true;
      this.deleteItem = store;
    },
    closeModalDel() {
      this.modal_del = false;
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
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
      全体設計
==================== */
  .store_update {
    width: 80%;
    margin-left: 200px;
  }
  .search_flex {
    margin-top: 20px;
  }
/* ====================
      店舗検索
==================== */
  .search {
    margin-top: 10px;
    font-weight: bold;
    color: #000;
  }
  select,
  input {
    padding: 7px;
    margin-right: 10px;
  }
  select {
    width: 15%;
  }
  input {
    width: 25%;
  }
  h2 {
    font-size: 25px;
    margin-bottom: 10px;
  }
  .button {
    width: 100px;
    font-weight: bold;
    background-color: rgb(212, 208, 201);
    margin-left: 10px;
  }
/* ====================
    店舗一覧
==================== */
  #store_title {
    font-size: 22px;
    margin: 10px 0;
  }
  .stores_container {
    line-height: 2;
  }
  .store_name {
    font-weight: bold;
    font-size: 20px;
  }
  .store_heart {
    justify-content: space-between;
  }
  .png {
    margin-right: 10px;
  }
  .store_button {
    width: 130px;
    padding: 7px 15px;
    font-size: 15px;
    margin: 20px 20px 0 20px;
    color: #fff;
    background-color: rgb(0, 0, 0, 0.7);
  }
  .tag {
    margin-left: 10px;
    color: gray;
  }
  span {
    margin-left: 10px;
  }
  .store_card {
    width: 100%;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  .store_image {
    width: 30%;
  }
  .store_detail {
    width: 20%;
    display: block;
    padding: 10px;
  }
  .store_overview {
    width: 40%;
    display: block;
    padding: 10px;
  }
  .loading {
    margin: 150px auto;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .store_button {
    width: 80%;
  }
  .search_flex {
    flex-wrap: wrap;
  }
  .search {
    width: 70%;
    text-align: center;
  }
  select {
    width: 100%;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
  }
  .search_button,
  .delete_search {
    height: 40px;
    width: 40%;
    margin: 0 auto;
  }
}
</style>
