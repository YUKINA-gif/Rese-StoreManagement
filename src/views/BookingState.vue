<template>
  <div class="booking_state">
    <Management />
    <!-- 予約状況 -->
    <h2>予約状況</h2>
    <table>
      <tr>
        <th>予約店舗</th>
        <th>予約日</th>
        <th>予約時間</th>
        <th>予約人数</th>
        <th>ユーザー</th>
        <th>ステータス</th>
      </tr>
      <tr v-for="(booking, index) in bookings" :key="index">
        <td>{{ booking.store.name }}</td>
        <td>{{ booking.booking_date }}</td>
        <td>{{ booking.booking_time.substr(0, 5) }}</td>
        <td>{{ booking.booking_number }}</td>
        <td>{{ booking.user.name }} 様</td>
        <!-- キャンセルステータス -->
        <td>
          <div>
            <p v-if="cancel(booking)" class="cancel">キャンセル</p>
            <p v-else-if="status(booking)" class="confirm">予約確定</p>
            <p v-else></p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Management from "../components/Management.vue";
import moment from "moment";
export default {
  data() {
    return {
      bookings: [],
    };
  },
  components: {
    Management,
  },
  methods: {
    // 予約情報取得
    async getAllBookings() {
      await axios
        .get("https://rese-booking.herokuapp.com/api/booking")
        .then((response) => {
          this.bookings = response.data.booking;
        });
    },
    // 予約日以降ならステータスを予約確定
    status(booking) {
      const today = new Date();
      if (moment(booking.booking_date) > today) {
        return false;
      } else {
        return true;
      }
    },
    // 予約キャンセルならステータスをキャンセル
    cancel(booking) {
      if (booking.is_booking === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.getAllBookings();
  },
};
</script>

<style scoped>
/* ====================
      予約状況
==================== */
  .booking_state {
    width: 80%;
    margin-left: 200px;
  }
  h2 {
    font-size: 25px;
  }
  table {
    width: 100%;
    text-align: left;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  }
  th {
    border: 1px solid rgb(199, 198, 198);
    background-color: rgb(212, 208, 201);
    padding: 10px;
  }
  td {
    height: 30px;
    padding: 10px;
  }
  .cancel,
  .confirm {
    width: 80px;
    background-color: red;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  .confirm {
    background-color: rgb(61, 223, 61);
  }
  .stay {
    width: 80px;
    background-color: #ffa500;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
  }
</style>
