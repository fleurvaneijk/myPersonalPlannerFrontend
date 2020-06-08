<template>
  <div>
    <h3>Delete account</h3>
    <form v-on:submit.prevent="deleteAccount">
      <label for="username">
        <input type="text" placeholder="username" id="username" v-model="user.username" required>
      </label>
      <br>
      <label for="password">
        <input type="password" placeholder="Password" id="password" v-model="user.password" required>
      </label>
      <br>
      <button type="submit" class="btn btn-danger">Delete account</button>
    </form>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default {
    data() {
      return{
        user: {
          username: null,
          password: null,
        },
      }
    },
    methods: {
      deleteAccount() {
        if (this.user.username == null || this.user.username === "" ||
          this.user.password == null || this.user.password === "") {
          console.log("null found");
        } else {
          userService.deleteAccount(this.user.username, this.user.password).then(() =>{
            this.$router.push("/login");
            location.reload();
          });
        }
      }
    },
  }
</script>
<style scoped>
  label {
    margin: 5px 0px;
  }
  button {
    width: 140px;
  }
</style>
