<template>
  <div class="management flex">
    <div class="tabs">
      <nav>
        <ul class="contents">
          <li @click="$router.push('/store/create')" v-if="managerPage">
           店舗登録
          </li>
           <li @click="$router.push('/store/change')" v-if="managerPage">店舗情報変更
          </li>
          <li @click="$router.push('/booking/state')" v-if="managerPage">予約状況確認
          </li>
          <li @click="$router.push('/store/manager')" v-else>店舗代表者権限発行</li>
        </ul>
      </nav>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "1",
      stores: [],
      areas: [],
      genres: [],
      postItem: [],
    }
  },
  methods:{
    managerPage(){
      if (this.$route.name == "StoreManager") {
        this.managerPage = false;
      }
    }
  },
  created(){
    this.managerPage()
  }
}
</script>

<style scoped>
.management{
  width: 100%;
}
.tabs{
  position: fixed;
  top: 10;
  left: 0;
  height: 100%;
  width: 170px;
  background-color: rgb(53, 52, 52);
  line-height: 4;
  color: #fff;
}
.contents li{
  padding-left: 10px;
  cursor: pointer;
}
.contents li:hover{
  background-color: #ffa500;
}
</style>