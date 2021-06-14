<template>
  <transition name="modal">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal_window">
        <p id="title">店舗削除</p>
        <p class="check_text">本当にこの店舗を削除しますか?</p>

        <button class="button yes_button" @click="store_delete">はい</button>
        <button class="button no_button" @click.self="$emit('close')">
          いいえ
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  props: ["val"],
  data() {
    return {};
  },
  methods: {
    store_delete() {
      axios
   
    },
  },
};
</script>

<style scoped>
/* ====================
      予約取消
==================== */
  table {
    width: 100%;
    text-align: left;
  }
  th {
    width: 30%;
    background: #f8f3e9;
    padding: 15px 5px;
    border: 1px solid #fff;
  }
  td {
    padding-left: 5px;
  }
  #title {
    font-size: 18px;
    margin: 10px;
    font-weight: bold;
  }
  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal_window {
    text-align: center;
    z-index: 2;
    width: 40%;
    padding: 10px;
    background: #fff;
  }
  .yes_button {
    margin-right: 50px;
    padding: 5px 15px;
    color: black;
    background-color: #fff;
  }
  .no_button{
    background-color: #000
  }
  .check_text {
    margin-bottom: 20px;
  }
</style>