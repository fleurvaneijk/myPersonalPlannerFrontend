<template>
  <div class="background">
    <div class="wrapper nav-component">
      <div class="container">
        <div class="row">
          <h1>Menu</h1>
        </div>
        <br>
        <div class="row">
          <div class="col-sm-5 col-md-5 column">
            <task-of-the-day></task-of-the-day>
          </div>
          <div class=".col-sm2 col-md-2"></div>
          <div class="col-sm-5 col-md-5 column">
            <weather></weather>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Totd from "./TaskOfTheDay";
  import Weather from "./Weather";

  export default {
    name: 'Menu',
    components: {
      "task-of-the-day" : Totd,
      "weather" : Weather,
    },
  }
</script>
<style scoped lang="scss">
  @import "src/variables";

  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
  }

  .wrapper {
    background-color: rgba(255, 255, 255, 0.75);
    margin: 0 15%;
    /*min-width: 1050px;*/

    h1 {
      padding-top: 30px;
    }

    p {
      font-weight: bold;
      font-size: 1.5em;
    }
  }

  .container {
    text-align: center;
  }

  .column {
    border: 2px #fcd8ea dashed;
    height: 70%;
    min-height: 500px;
    background-color: rgba(255, 255, 255, 0.7);

  }

  @media(max-width:1620px){
    .wrapper {
      margin: 0 5%;
    }
  }

  @media(max-width:1260px){
    .wrapper {
      margin: 0 1%;
    }
  }

</style>
