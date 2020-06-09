<template>
  <div>
    <h1>Weather</h1>
    <iframe
      class="weerplazaWidget"
      scrolling="no"
      src="https://www.weerplaza.nl/weerwidgets/vandaag/19344/">
    </iframe>
  </div>
</template>

<style scoped lang="scss">
  .weerplazaWidget {
    margin: 50px 0 0 0;
    padding: 10px;
    width: 100%;
    max-width: 400px;
    height: 258px;
    border: 1px solid rgb(244, 244, 244);
    box-sizing: border-box;
  }

</style>
