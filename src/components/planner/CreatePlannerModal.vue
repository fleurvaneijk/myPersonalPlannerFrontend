<template>
  <div id="modal" v-show="value">
    <h2>Create Planner</h2>
    <label>
      <input type="text" placeholder="Title" v-model="title" required>
    </label>
    <button class="btn btn-primary" @click="createPlanner">Submit</button>
    <button class="btn btn-danger" @click="close">Close</button>
  </div>
</template>

<script>
  import { plannerService } from "../../services/planner.service";

  export default {
    name: 'CreatePlannerModal',
    props: ['value'],
    data() {
      return {
        title: null
      }
    },
    created() {

    },
    methods: {
      createPlanner() {
        plannerService.createPlanner(this.title);
      },
      close() {
        this.$parent.openCloseCreatePlannerModal();
      }
    }
  };
</script>


<style scoped lang="scss" >
  @import "src/variables";

  #modal {
    height: 200px;
    width: 250px;
  }

  h2 {
    margin: 20px 10px;
  }

  label {
    width: 100%;
  }

  input {
    width: 90%;
    height: 30px;
  }

  .btn-primary {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: $secondary-blue;
    border: none;
  }

  .btn-danger {
    position: absolute;
    left: 10px;
    bottom: 10px;
    background-color: $tertiary-orange;
    border: none;
  }
</style>
