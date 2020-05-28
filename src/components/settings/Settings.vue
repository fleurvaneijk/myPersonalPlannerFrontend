<template>
  <div class="container nav-component">
    <div class="row">
      <div class="col-md-6">
        <h3>Settings</h3>
        <ul>
          <li><router-link tag="button" class="btn btn-primary" :to="'/settings/username'">Change username</router-link></li>
          <li><router-link tag="button" class="btn btn-primary" :to="'/settings/password'">Change password</router-link></li>
          <li><router-link tag="button" class="btn btn-danger" :to="'/settings/delete-account'">Delete account</router-link></li>
        </ul>
      </div>
      <div class="col-md-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {

    }
  }
</script>
<style scoped>
  button {
    width: 140px;
    margin: 5px 0px;
  }
  h3 {
    justify-content: center;
  }
  ul {
    padding: 0;
    list-style: none;
  }
</style>
