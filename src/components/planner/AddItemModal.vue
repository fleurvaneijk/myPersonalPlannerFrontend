<template>
  <div id="modal" v-show="value">
      <H1>Add Item</H1>
      <h2>Subtitle</h2>
      <button @click="close">Close</button>
  </div>
</template>

<script>
  export default {
    name: 'AddItemModal',
    props: ['value', 'plannerId'],
    data() {
      return {

      }
    },
    created() {
      //TODO
    },
    methods: {

      close() {
        this.$parent.openCloseItemModal();
      },
    }
  };
</script>


<style scoped lang="scss" >
  @import "src/variables";

  #modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid $primary-blue;
    border-radius: 3px;
    width: 15%;
    min-width: 200px;
    height: 40%;
    min-height: 300px;
    text-align: center;

  }
</style>
