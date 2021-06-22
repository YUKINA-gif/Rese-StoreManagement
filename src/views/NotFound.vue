<template>
  <div class="not_found">
    <!-- Not Found -->
    <p>404 Not Found</p>
    <p>ページがありません</p>
    <button class="button" @click="back">戻る</button>
  </div>
</template>

<script>
export default {
  methods:{
    back(){
      if (this.$store.state.auth == true) {
        this.$router.push("/store/create");
      } else {
        this.$router.push("/");
      }
    }
  }
}
</script>
<style scoped>
/* ====================
      Not Found
==================== */
  .not_found{
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }
  p{
    font-size: 25px;
    font-weight: bold;
  }
  .button{
    margin-top: 20px;
    background-color: #000;
    padding: 5px 15px;
  }
</style>