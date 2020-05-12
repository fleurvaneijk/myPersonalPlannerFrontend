<template>
  <div class="wrapper">
    <div class="login">
      <h1>Login</h1>

      <form>
        <label for="username">
          <input type="text" placeholder="Username" id="username" v-model="username" required>
        </label>
        <br>
        <label for="psw">
          <input type="password" placeholder="Password" id="psw" v-model="psw" required>
        </label>
        <br>
        <button @click="logIn">Login</button>
      </form>

      <span>Don't have an account yet? <a href="/#/signup" class="link">Sign up here</a></span>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    components: {

    },
    data() {
      return{
        username: null,
        psw: null
      }
    },
    methods: {
      logIn: function() {
        if (this.username == null || this.username === "" ||
          this.psw == null || this.psw === "") {
          console.log("null found")
        } else {
          console.log(this.username, this.psw)
        }

      }
    },
  };
</script>

<style lang="scss">
  @import "src/variables";

  .wrapper {
    width: 100%;
    text-align: center;

    .login {
      width: 50%;
      min-width: 175px;
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

      .link {
        color: $tertiary-orange;
        text-decoration: underline;
      }
    }
  }


</style>
