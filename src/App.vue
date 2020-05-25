<template>
    <div class="container-fluid">
      <router-view name="header-top" ></router-view>
      <transition name="slide" mode="out-in">
          <router-view></router-view>
      </transition>
   </div>
</template>

<script>
  export default {
}
</script>

<style lang="scss">
  @import "src/variables";

  body {
    height: 100vh;
    .container-fluid {
      padding: 0;
      height: 100%
    }
  }

  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
