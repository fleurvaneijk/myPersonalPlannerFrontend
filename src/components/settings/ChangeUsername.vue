<template>
  <div>
    <h3>Change username</h3>
    <form v-on:submit.prevent="changeUsername">
    <label for="oldUsername">
        <input type="text" placeholder="Username" id="oldUsername" v-model="changeUsernameUser.username" required>
      </label>
      <br>
      <label for="newUsername">
        <input type="text" placeholder="New username" id="newUsername" v-model="changeUsernameUser.newUsername" required>
      </label>
      <br>
      <label for="password">
        <input type="password" placeholder="Password" id="password" v-model="changeUsernameUser.password" required>
      </label>
      <br>
      <button type="submit" class="btn btn-primary">Change</button>
    </form>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default {
    data() {
      return {
        changeUsernameUser: {
          username: null,
          password: null,
          newUsername: null,
        }
      }
    },

    methods: {
      changeUsername: function() {
        if (this.changeUsernameUser.username == null || this.changeUsernameUser.username === "" ||
          this.changeUsernameUser.newUsername == null || this.changeUsernameUser.newUsername === "" ||
          this.changeUsernameUser.password == null || this.changeUsernameUser.password === "") {
          console.log("null found");
        } else if(this.changeUsernameUser.username !== this.changeUsernameUser.newUsername) {
          userService.changeUsername(this.changeUsernameUser.username, this.changeUsernameUser.password, this.changeUsernameUser.newUsername);
        } else {
          console.log("Username can not be the same");
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
