<template>
  <div>
    <h3>Change username</h3>
    <form v-on:submit.prevent="changeUsername">
      <div class="alert alert-danger" role="alert" v-if="error">
        Username is taken or Password is wrong
      </div>
      <div class="alert alert-success" role="alert" v-if="success">
        Username is changed
      </div>
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

  export default ({
    data() {
      return {
        changeUsernameUser: {
          username: null,
          password: null,
          newUsername: null,
        },
        error: false,
        success: false
      }
    },

    methods: {
      changeUsername: function() {
        if (this.changeUsernameUser.username == null || this.changeUsernameUser.username === "" ||
          this.changeUsernameUser.newUsername == null || this.changeUsernameUser.newUsername === "" ||
          this.changeUsernameUser.password == null || this.changeUsernameUser.password === "") {
          console.log("null found");
        } else if(this.changeUsernameUser.username !== this.changeUsernameUser.newUsername) {
          userService.changeUsername(this.changeUsernameUser.username, this.changeUsernameUser.password, this.changeUsernameUser.newUsername)
            .then(() => {
              this.success = true;
            })
            .catch(() => {
              this.error = true;
          })
        } else {
          this.error = true;
        }
      }
    },
  })
</script>
<style scoped>
  input {
    width: 250px;
    height: 30px;
    margin-bottom: 5px;
  }
  button {
    width: 140px;
  }
</style>
