<template>
  <div class="container">
    <h3>Change password</h3>
    <form>
      <label for="oldPassword">
        <input type="text" placeholder="Old password" id="oldPassword" v-model="oldPassword" required>
      </label>
      <br>
      <label for="newPassword">
        <input type="text" placeholder="New password" id="newPassword" v-model="newPassword" required>
      </label>
      <br>
      <label for="confirmNewPassword">
        <input type="password" placeholder="Confirm new password" id="confirmNewPassword" v-model="confirmNewPassword" required>
      </label>
      <br>
      <button class="btn btn-primary">Change</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
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
