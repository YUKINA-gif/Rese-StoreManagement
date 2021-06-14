<template>
  <div class="booking_state">
    <Management />
    <h2>予約状況</h2>
    <table>
      <tr>
        <th>ユーザーID</th>
        <th>予約店舗</th>
        <th>予約日</th>
        <th>予約時間</th>
        <th>予約人数</th>
        <th>ステータス</th>
      </tr>
      <tr>
        <td>aaa</td>
        <td>aaa</td>
        <td>aaa</td>
        <td>aaa</td>
        <td>aaa</td>
      </tr>
    </table>
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
  },
}
</script>

<style scoped>
  .booking_state{
    width: 80%;
    margin-left: 200px;
  }
  h2{
    font-size: 25px;
  }
  table{
    width: 100%;
    text-align: left;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  th{
    border: 1px solid rgb(199, 198, 198);
    background-color: rgb(212, 208, 201);
    padding: 10px;
  }
  td{
    padding: 10px;
  }
</style>