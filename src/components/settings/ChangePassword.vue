<template>
  <div>
    <h3>Change password</h3>
    <form v-on:submit.prevent="changePassword">
      <label for="username">
        <input type="text" placeholder="Username" id="username" v-model="changePasswordUser.username" required>
      </label>
      <br>
      <label for="password">
        <input type="password" placeholder="Old password" id="password" v-model="changePasswordUser.password" required>
      </label>
      <br>
      <label for="newPassword">
        <input type="password" placeholder="New password" id="newPassword" v-model="changePasswordUser.newPassword" required>
      </label>
      <br>
      <label for="confirmNewPassword">
        <input type="password" placeholder="Confirm new password" id="confirmNewPassword" v-model="confirmNewPassword" required>
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
      return{
        changePasswordUser: {
          username: null,
          password: null,
          newPassword: null,
        },
        confirmNewPassword: null,
      }
    },
    methods: {
      changePassword: function() {
        if (this.changePasswordUser.username == null || this.changePasswordUser.username === "" ||
          this.changePasswordUser.password == null || this.changePasswordUser.password === "" ||
          this.changePasswordUser.newPassword == null || this.changePasswordUser.newPassword === "") {
          console.log("Null found");
        } else if(this.changePasswordUser.password === this.confirmNewPassword) {
          console.log("Password can not be the same");
        } else if(this.changePasswordUser.newPassword === this.confirmNewPassword) {
          userService.changePassword(this.changePasswordUser.username, this.changePasswordUser.password, this.changePasswordUser.newPassword);
        } else {
          console.log("New password not identical");
        }
      }
    },
  }
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
