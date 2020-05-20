<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand"><img src="../assets/logo2.png" alt=""></router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/agenda" activeClass="active" tag="li"><a>Agenda</a></router-link>
          <router-link to="/planner" activeClass="active" tag="li"><a>Planner</a></router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li
            class="dropdown"
            :class="{open: isDropdownOpen}"
            @click="isDropdownOpen = !isDropdownOpen">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">More <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <router-link to="/settings" activeClass="active" tag="li"><a>Settings</a></router-link>
              <li><a href="#" @click="logOut">Log out</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        isDropdownOpen: false
      }
    },
    methods: {
      logOut() {
        console.log("log uit niet geimplementeerd :)");
      }
    },
  }
</script>
<style>
  img {
    width: 100px;
  }
</style>
