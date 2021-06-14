<template>
  <div class="store_manager">
    <Management />
    <h2>店舗代表者権限発行</h2>
    <table>
      <tr>
        <th>ID:</th>
        <td><input type="text"></td>
      </tr>
      <tr>
        <th>パスワード:</th>
        <td><input type="password"></td>
      </tr>
       <tr>
        <th>パスワード(確認):</th>
        <td><input type="password"></td>
      </tr>
    </table>
    <button class="button">登録</button>
  </div>
</template>
<script>
import Management from '../components/Management.vue';
export default {
  data() {
   return {
     
    }
  },
  components:{
    Management
  }
}
</script>

<style scoped>
  .store_manager{
    width: 80%;
    margin: 0 200px 0;
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
</style>