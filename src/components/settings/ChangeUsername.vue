<template>
  <div class="container">
    <h3>Change username</h3>
    <form>
      <label for="oldUsername">
        <input type="text" placeholder="Username" id="oldUsername" v-model="oldUsername" required>
      </label>
      <br>
      <label for="newUsername">
        <input type="text" placeholder="New username" id="newUsername" v-model="newUsername" required>
      </label>
      <br>
      <label for="password">
        <input type="password" placeholder="Password" id="password" v-model="password" required>
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
        oldUsername: null,
        newUsername: null,
        password: null
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
