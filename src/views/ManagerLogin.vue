<template>
  <div class="management_login">
    <h2>管理者ログイン</h2>
    <div class="login_card">
      <form action="">
        <ul>
          <li>
            <label for="id">ID:</label>
            <input
              type=""
              id="id"
              placeholder="IDを入力してください"
              v-model="id"
            />
            <div class="error" v-if="id_required">IDが入力されていません</div>
            <div class="error" v-if="not_email">既定のIDで入力してください</div>
          </li>
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
              v-model="password"
            />
            <div class="error" v-if="password_required">パスワードが入力されていません</div>
          </li>
        </ul>
        <button @click="manage_login" type="button" class="button">ログイン</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id :"",
      password: ""
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
  .management_login {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .login_card {
    width: 80%;
    margin: 50px auto;
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
    margin-top: 120px;
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