<template>
  <div class="management_login">
    <!-- ログイン -->
    <div class="login_card">
      <h2>店舗代表者ログイン</h2>
        <div>
        <ul>
          <li>
            <!-- ID -->
            <label for="login_id">ID:</label>
            <input
              type="text"
              id="login_id"
              placeholder="IDを入力してください"
              v-model="login_id"
            /><!-- IDエラーメッセージ -->
            <span class="error" v-if="login_id_required">IDが入力されていません</span>
          </li>
          <!-- パスワード -->
          <li>
            <label for="password">パスワード:</label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力してください"
              v-model="password"
            />
            <!-- パスワードエラーメッセージ -->
            <span class="error" v-if="password_required">パスワードが入力されていません</span>
          </li>
        <button @click="login" type="button" class="button">ログイン</button>
        </ul>    
      </div>  
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      login_id :"",
      password: "",
      isActive: "1",
      login_id_required: false,
      password_required: false,
    }
  },
  methods: {
    // ログイン
    login(){
      // バリデーション
      // IDが空ならメッセージ表示
      if (this.login_id == ""){
        this.login_id_required = true
        // パスワードが空ならメッセージ表示
      } if (this.password == ""){
        this.password_required = true
      } else {
        // 上記以外ならログイン
      this.$store.dispatch("login", {
        login_id: this.login_id,
        password: this.password,
      });
      }
    }
  },
}
</script>

<style scoped>
/* ====================
      ログイン
==================== */
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
    background-color: rgba(0, 0, 0, 0.9);
  }
  .error{
    color: red;
    margin-left: 30%;
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