<template>
  <div class="header flex">
    <div class="flex">
      <h1>Rese</h1>
      <div class="management">
        <p>店舗管理画面</p>
      </div>
    </div>
    <p class="logout" @click="logout" v-if="this.$store.state.auth == true">ログアウト</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    logout(){
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
  .header {
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;
  }
  h1 {
    font-size: 28px;
    color: #ffa500;
  }
  .nav,
  h1 {
    margin-left: 20px;
  }
  .nav{
    position: absolute;
    right: 0;
  }
  .nav ul li {
    padding-right: 30px;
    font-weight: bold;
    cursor: pointer;
  }
  .management{
    margin-left: 20px;
    font-weight: bolder;
    padding: 0 10px;
  }
  .logout{
    margin-right: 20px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
