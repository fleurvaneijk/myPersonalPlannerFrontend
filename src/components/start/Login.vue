<template>
  <div id="wrapper">
    <div id="login">
      <h1>Login</h1>

      <form v-on:submit.prevent="logIn">
        <div class="alert alert-danger" role="alert" v-if="error">
          Username or Password is incorrect
        </div>
        <label for="username">
          <input type="text" placeholder="Username" id="username" v-model="username" required>
        </label>
        <br>
        <label for="psw">
          <input type="password" placeholder="Password" id="psw" v-model="psw" required>
        </label>
        <br>
        <button type="submit">Login</button>
      </form>

      <span>Don't have an account yet? <a href="/signup" id="link">Sign up here</a></span>

    </div>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default {
    name: 'login',
    components: {

    },
    data() {
      return{
        username: null,
        psw: null,
        error: false
      }
    },
    methods: {
      logIn: function() {
        if (this.username == null || this.username === "" ||
          this.psw == null || this.psw === "") {
          console.log("null found")
        } else {
          userService.login(this.username, this.psw).then(() => {
            this.$router.push("/")
          }).catch(() => {
            this.error = true;
          })
        }

      }
    },
  };
</script>

<style scoped lang="scss">
  @import "src/variables";

  #wrapper {
    height: 100%;
    background-image: url("../../assets/background.jpg");
    text-align: center;

    #login {
      background-color: rgba(255, 255, 255, 0.75);
      padding: 0 5% 0 5%;
      height: 100%;
      width: 40%;
      min-width: 249px;
      display: inline-block;

      label, input, button {
        width: 100%
      }

      input {
        background: $background-grey;
        border: 1px solid #70728F;
        margin: 5px 0;
        padding: 8px;
      }

      button {
        background: $secondary-blue;
        padding: 9px 0;
        margin: 10px 0 20px;
        text-transform: uppercase;
        color: $white;
        border: 0;
        border-radius: 3px;
      }

      #link {
        color: $tertiary-orange;
        text-decoration: underline;
      }
    }
  }

  @media(max-width:1620px){
    .wrapper {
      margin: 0 5%;
    }
  }

  @media(max-width:1260px){
    .wrapper {
      margin: 0 1%;
    }
  }

</style>
