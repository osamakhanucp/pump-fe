<template>
  <div class="body">
    <form id="loginform" method="" action="">
      <input v-model="email" class="input" placeholder="E-mail" />
      <input
        type="password"
        v-model="password"
        class="input"
        placeholder="Password"
      />
      <input type="submit" @click="login" class="loginbutton" value="SIGN IN" />
      <a href="#">Click here for new users</a>
    </form>
    <img src="assets/gas-pump.png" alt="" />
  </div>
</template>

<script>
import { AuthService } from "../../services/AuthService";
export default {
  name: "Login",

  components: {},

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      AuthService.login({ username: this.email, password: this.password })
        .then((res) => {
          console.log(res);
          localStorage.setItem("jwt",res.data.jwt)
          this.$router.push({
            name: "dashboard"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    localStorage.clear()
  },

  validations: function () {
    return {};
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";

.body {
  background-color: #212529;
  color: #f5f5f5;
  text-align: center;
  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
    "DejaVu Sans", Verdana, sans-serif;
  height: 100vh;
  position: relative;
  z-index: 10;
}

a {
  color: #fff;
  text-decoration: none;
}

#loginform {
  //   padding-top: 150px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.input {
  width: 500px;
  padding: 15px 25px;
  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
    "DejaVu Sans", Verdana, sans-serif;
  background: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #333;
  font-size: 14px;
  margin-top: 15px;
}

.loginbutton {
  background-color: #4caf50;
  border-radius: 5px/5px;
  -webkit-border-radius: 5px/5px;
  -moz-border-radius: 5px/5px;
  color: #333;
  display: inline-block;
  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
    "DejaVu Sans", Verdana, sans-serif;
  font-size: 18px;
  font-weight: bold;
  width: 500px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: 0;
  cursor: pointer;
}

.loginbutton:active {
  position: relative;
  top: 1px;
}

.loginbutton:hover {
  background-color: #5caf55;
}
img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  opacity: 0.3;
  z-index: 2;
}
</style>