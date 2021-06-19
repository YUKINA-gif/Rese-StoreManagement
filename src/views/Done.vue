<template>
  <div class="done">
    <h3>店舗登録が完了しました</h3>
    <button class="button" @click="$router.push('/store/create')">戻る</button>
  </div>
</template>

<style scoped>
  .done {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 120px;
  }
  h3 {
    font-size: 25px;
    margin-bottom: 15px;
  }
  .button{
    background-color: #000;
    padding: 5px 15px;
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .done{
    width: 90%;
  }
  .button{
    padding: 10px 30px;
  }
}
</style>