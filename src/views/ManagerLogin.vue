<template>
  <div class="management_login">
    <div class="tabs flex">
      <input type="radio" id="tab1" value="1" v-model="isActive" class="radio"/>
        <label for="tab1" class="tab">店舗代表者ログイン</label>
        <input type="radio" id="tab2" value="2" v-model="isActive" class="radio"/>
        <label for="tab2" class="tab">管理者ログイン</label>
    </div>
    <div class="login_card">
      <h2 v-if="isActive === '1'">店舗代表者ログイン</h2>
      <h2 v-if="isActive === '2'">管理者ログイン</h2>
      <form action="">
        <div  v-if="isActive === '1'">
        <ul>
          <li>
            <label for="id">ID:</label>
            <input
              type=""
              id="id"
              placeholder="IDを入力してください"
              v-model="id"
            /></li>
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
              v-model="password"
            />
          </li>
          <li class="error" v-if="password_required">パスワードが入力されていません
          </li>
        <button @click="manage_login" type="button" class="button">ログイン</button>
        </ul>
        </div>
        <div v-else-if="isActive === '2'">
          <ul>
            <li><label for="id">ID:</label>
              <input
                type=""
                id="id"
                placeholder="IDを入力してください"
                v-model="id"
              /></li>
            <li class="error" v-if="id_required">IDが入力されていません</li>
            <li class="error" v-if="not_email">既定のIDで入力してください</li>
            <li>
              <label for="password">パスワード:</label>
              <input
                type="password"
                id="password"
                placeholder="パスワードを入力してください"
                v-model="password"
              />
            </li>
            <li class="error" v-if="password_required">パスワードが入力されていません
            </li>
        </ul>
      <button @click="manage_login" type="button" class="button">ログイン</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id :"",
      password: "",
      isActive: "1",
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
  .management_login {
    width: 50%;
    margin: 140px auto 0;
  }
  .login_card {
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #c2c2c2;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    line-height: 3;
    text-align: center;
  }
  input {
    width: 60%;
    padding: 8px;
  }
  label {
    display: inline-block;
    width: 30%;
  }
  li {
    text-align: left;
    margin: 30px 0;
  }
  h2 {
    font-size: 25px;
  }
  .button {
    padding: 10px 15px;
  }
  .error{
    color: red;
    margin-left: 30%;
  }
  label{
    font-weight: bold;
  }
  .radio{
    display: none;
  }
  .tabs{
    text-align: center;
  }
  .tab{
    width: 150px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.4);
    font-weight: normal;
  }
  .tabs :checked + label {
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
  }
  .button{
    background-color: rgba(0, 0, 0, 0.9);
  }
/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .login {
    width: 90%;
  }
  label,
  input {
    width: 90%;
  }
  .error{
    margin: 0;
  }
}
</style>