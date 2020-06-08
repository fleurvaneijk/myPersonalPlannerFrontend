<template>
  <div id="modal" v-show="value">
    <h2>Remove User</h2>

    <form v-if="!isNullOrEmpty(planner.users)">
      <label>
        <p>Choose User:</p>
        <select @change="changeUser(username)" v-model="username" required>
          <option  v-for="user in users" v-bind:key="user.id"
                   :value="user.username">{{user.username}}
          </option>
        </select>
      </label>
    </form>

    <button class="btn btn-primary"  @click="removeUser">Submit</button>
    <button class="btn btn-danger" @click="close">Close</button>
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

  #modal {
    height: 200px;
    width: 250px;
  }

  h2 {
    margin: 20px 10px;
  }

  p {
    margin-bottom: 2px;
  }

  label {
    width: 100%;
  }

  select {
    width: 90%;
    height: 30px;
    margin-bottom: 10px;
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
