<template>
  <div class="wrapper">
    <div class="planner nav-component">
      <h1>Planner</h1>
      <h3 v-if="!plannerExists">You don't have any planners yet!</h3> <!--TODO: misschien veranderen naar enkelvoud-->

      <ul id="start" v-if="!plannerExists">
        <li>
          <img class="start-planner" @click="createNewPlanner" src="../../assets/create.png" alt="Create new planner">
          <p>Create new planner</p>
        </li>
        <li>
          <img class="start-planner" @click="joinPlanner" src="../../assets/join.png" alt="Join planner">
          <p>Join planner</p>
        </li>
      </ul>

      <div id="planner" v-if="plannerExists">
        <ul>
          <li>
            <button>
              <img class="planner-action" @click="addTask" src="../../assets/create.png" alt="Join planner">
              <p>Add Task</p>
            </button>
          </li>
          <li>
            <button>
              <img class="planner-action" @click="addUser" src="../../assets/create.png" alt="Join planner">
              <p>Add User</p>
            </button>
          </li>
        </ul>


        <plannertable id="table" ></plannertable>
      </div>

    </div>
  </div>
</template>

<script>
  import plannertable  from './Table.vue'

  export default {
    name: 'Planner',
    components: {
      plannertable
    },
    data() {
      return{
        plannerExists: false,
      }
    },
    created() {
      //TODO: checken of er al een planner is
    },
    methods: {
      createNewPlanner() {
        console.log("create new planner");
        this.plannerExists = true;
      },

      joinPlanner() {
        console.log("join planner");
      },

      addTask() {
        console.log("add task");
        this.plannerExists = true;
      },

      addUser() {
        console.log("add / invite user");
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/variables";

  .wrapper {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
  }

  .planner{
    background-color: rgba(255, 255, 255, 0.75);
    margin: 0 15%;
    min-width: 1050px;

    h1 {
      padding-top: 30px;
    }

    h1, h3 {
      padding-left: 50px;
    }

    ul#start {
      padding: 0;
      padding-top: 5%;
      list-style: none;
      horiz-align: center;
      text-align: center;

      li {
        margin: 0 10%;
        display: inline-block;
        text-align: center;

        img.start-planner {
          zoom: 100%;
          margin-bottom: 10px;
          cursor: pointer;
        }

        p {
          font-weight: bold;
          font-size: 1.5em;
        }
      }
    }

    #planner {

      text-align: center;

      ul {
        list-style: none;

        button{
          padding: 0;
          width: 70px;
          height: 60px;
        }

        li {
          margin: 0 3%;
          display: inline-block;
        }

        img.planner-action {
          zoom: 38%;
        }

        p{
          padding: 0;
          margin: 0;
        }
      }

      #table {
        margin-top: 1%;
      }
    }

  }

  @media(max-width:1620px){
    .planner {
      margin: 0 5%;
    }
  }

  @media(max-width:1260px){
    .planner {
      margin: 0 1%;
    }
  }
</style>
