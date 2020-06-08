<template>
  <div id="modal" v-show="value">
      <H1>Add User</H1>
    <label>
      <input type="text" placeholder="Username" v-model="username" required>
    </label>
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

    },
    methods: {
      addUser() {
        plannerService.addUser(this.plannerId, this.username);
      },
      close() {
        this.$parent.openCloseUserModal();
      }
    }
  };
</script>


<style scoped lang="scss" >
  @import "src/variables";

</style>
