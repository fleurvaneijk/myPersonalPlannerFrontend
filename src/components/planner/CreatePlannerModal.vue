<template>
  <div id="modal" v-show="value">
    <h1>Create Planner</h1>
    <label>
      <input type="text" placeholder="Title" v-model="title" required>
    </label>
    <button @click="createPlanner">Submit</button>
    <button @click="close">Close</button>
  </div>
</template>

<script>
  import { plannerService } from "../../services/planner.service";

  export default {
    name: 'CreatePlannerModal',
    props: ['value'],
    data() {
      return {
        title: ""
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

</style>
