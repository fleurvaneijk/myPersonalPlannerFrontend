<template>
  <div id="wrapper">
    <div id="signup">
      <h1>Sign up</h1>

      <form v-on:submit.prevent="signUp">
        <div class="alert alert-danger" role="alert" v-if="errorUsername">
          Username is taken
        </div>
        <div class="alert alert-danger" role="alert" v-if="errorNotSame">
          Passwords are not the same
        </div>
        <label for="uname">
          <input type="text" placeholder="Username" id="uname" v-model="username" required>
        </label>
        <br>
        <label for="psw">
          <input type="password" placeholder="Password" id="psw" v-model="psw" required>
        </label>
        <br>
        <label for="psw2">
          <input type="password" placeholder="Confirm Password" id="psw2" v-model="psw2" required>
        </label>
        <br>
        <button type="submit">Sign Up</button>
      </form>

    </div>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default {
    name: 'signup',
    components: {

    },
    data() {
      return{
        username: null,
        psw: null,
        psw2: null,
        errorUsername: false,
        errorNotSame: false
      }
    },
    methods: {
      signUp: function() {
        if (this.username == null || this.username === "" ||
          this.psw == null || this.psw === "" ||
          this.psw2 == null || this.psw2 === "") {
          console.log("null found")
        } else if(this.psw !== this.psw2) {
          this.errorNotSame = true;
        } else {
          userService.register(this.username, this.psw).then(() => {
            this.$router.push("/login")
          }).catch(() => {
            this.errorUsername = true;
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

    #signup {
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
    }
  }
</style>
