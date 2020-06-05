<template>
  <div id="modal" v-show="value">
      <H1>Add User</H1>
      <input type="text" placeholder="Username" v-model="username" required>
    <button @click="addUser">Submit</button>
    <button @click="close">Close</button>
  </div>
</template>

<script>
  import { plannerService } from "../../services/planner.service";

  export default {
    name: 'AddUserModal',
    props: ['value', 'plannerId'],
    data() {
      return {
        username: ""
      }
    },
    created() {
      // console.log(this.plannerId);
    },
    methods: {
      close() {
        this.$parent.openCloseUserModal();
      },
      addUser() {

        console.log("in modal: ", this.plannerId, this.username);

        plannerService.addUser(this.plannerId, this.username);

      }
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
