<template>
  <div id="modal" v-show="value">
    <H1>Remove User</H1>

    <form v-if="!isNullOrEmpty(planner.users)">
      <label>
        <select @change="changeUser(username)" v-model="username" required>
          <option  v-for="user in users" v-bind:key="user.id"
                   :value="user.username">{{user.username}}
          </option>
        </select>
      </label>
    </form>

    <button @click="removeUser">Submit</button>
    <button @click="close">Close</button>
  </div>
</template>

<script>
  import {isNullOrEmpty} from "../../store/actions";
  import {plannerService} from "../../services/planner.service";

  export default {
    name: 'RemoveUserModal',
    props: ['value', 'planner'],
    data() {
      return {
        username: null,
        users: this.planner.users.models,
      }
    },
    created() {

    },
    methods: {
      removeUser() {
        plannerService.removeUserFromPlanner(this.planner.id, this.username);
      },
      changeUser(username){
        this.username = username;
      },
      isNullOrEmpty(x) {
        return isNullOrEmpty(x);
      },
      close() {
        this.$parent.openCloseRemoveUserModal();
      }
    }
  };
</script>


<style scoped lang="scss" >
  @import "src/variables";

</style>
