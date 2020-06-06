<template>
  <div class="background">
    <div class="wrapper container nav-component">
      <div class="row">
        <div class="col-md-6 content">
          <h1>Settings</h1>
          <br>
          <ul>
            <li><router-link tag="button" class="btn btn-primary" :to="'/settings/change-agenda'">Change agenda</router-link></li>
            <li><router-link tag="button" class="btn btn-primary" :to="'/settings/username'">Change username</router-link></li>
            <li><router-link tag="button" class="btn btn-primary" :to="'/settings/password'">Change password</router-link></li>
            <li><router-link tag="button" class="btn btn-danger" :to="'/settings/delete-account'">Delete account</router-link></li>
          </ul>
        </div>
        <div class="col-md-6">
          <br>
          <br>
          <br>
          <router-view></router-view>
        </div>
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
  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
  }

  .wrapper {
    background-color: rgba(255, 255, 255, 0.75);
  }

  .content {
    padding-left: 5%;
  }

  button {
    width: 140px;
    margin: 5px 0;
  }
  h3 {
    justify-content: center;
  }
  ul {
    padding: 0;
    list-style: none;
  }
</style>
