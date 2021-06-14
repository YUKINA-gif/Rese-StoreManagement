<template>
  <div class="management flex">
    <div class="tabs">
      <nav>
        <ul class="contents">
          <li @click="$router.push('/store/create')">
           店舗登録
          </li>
           <li @click="$router.push('/store/change')">店舗情報変更
          </li>
          <li @click="$router.push('/booking/state')">予約状況確認
          </li>
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
      postItem: []
    }
  },
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