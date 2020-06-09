<template>
  <div id="modal" v-show="value">
    <h2>Add Task</h2>

    <form v-if="!isNullOrEmpty(planner.users)">
      <label>
        <p>Choose User:</p>
        <select @change="changeUser(username)" v-model="username" required>
          <option  v-for="user in users" v-bind:key="user.id"
                   :value="user.username">{{user.username}}
          </option>
        </select>

        <p>Choose Day:</p>
        <select @change="changeDay(day)" v-model="day" required>
          <option  v-for="day in daysInWeek" v-bind:key="day.id"
                   :value="day">{{day.long}}
          </option>
        </select>
        <input type="text" placeholder="Title" v-model="title" required>
        <input type="text" placeholder="Description" v-model="description">
      </label>
    </form>

    <button class="btn btn-primary"  @click="addItem">Submit</button>
    <button class="btn btn-danger" @click="close">Close</button>
  </div>
</template>

<script>
  import {days} from "../../store/store";
  import {isNullOrEmpty} from "../../store/actions";
  import {plannerService} from "../../services/planner.service";

  export default {
    name: 'AddItemModal',
    props: ['value', 'planner'],
    watch: {
      planner: function() {
        this.users = this.planner.users.models;
      }
    },
    data() {
      return {
        username: null,
        users: this.planner.users.models,
        daysInWeek: days,
        userId: null,
        day: null,
        title: null,
        description: "",
      }
    },
    created() {

    },
    methods: {
      addItem() {
        plannerService.addItem(this.planner.id, this.userId, this.day.id, this.title, this.description);
      },
      changeUser(username){
        let user = this.users.filter((user) => {
          return user.username === username;
        })[0]
        this.userId = user.id;
      },
      changeDay(day){
        this.day = day;
      },
      close() {
        this.$parent.openCloseItemModal();
      },
      isNullOrEmpty(x) {
        return isNullOrEmpty(x);
      }
    }
  };
</script>


<style scoped lang="scss" >
  @import "src/variables";

  #modal {
    width: 20%;
    min-width: 280px;
    height: 40%;
    min-height: 326px;
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

  input {
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
