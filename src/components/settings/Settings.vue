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
<style scoped lang="scss">
  @import "src/variables";

  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
    clear: both;
    overflow: auto;
    min-height: 100%;
  }

  .wrapper {
    background-color: rgba(255, 255, 255, 0.75);
    clear: both;
    overflow: auto;
    min-height: 100%;
  }

  .content {
    padding-left: 5%;
  }

  button {
    width: 160px;
    margin: 5px 0;
  }

  .btn-primary {
    background-color: $secondary-blue;
    border: none;
  }

  .btn-danger {
    background-color: $tertiary-orange;
    border: none;
  }

  h3 {
    justify-content: center;
  }
  ul {
    padding: 0;
    list-style: none;
  }
</style>
