<template>
  <div class="background">
    <div class="wrapper nav-component">
      <h1>Planner</h1>
      <h3 v-if="isNullOrEmpty(planners)">You don't have any planners yet!</h3> <!--TODO: misschien veranderen naar enkelvoud-->

      <div id="start" v-if="isNullOrEmpty(planners)">
        <img class="start-planner" @click="createNewPlanner" src="../../assets/create.png" alt="Create new planner">
        <p>Create new planner</p>
      </div>

      <div id="planner" v-if="!isNullOrEmpty(planners)">
        <div class="grid-container">
<!--          <ul class="grid-item" v-for="user in users" v-bind:key="user.username">-->
<!--            <li>-->
<!--              <p>{{user.username}}</p>-->
<!--            </li>-->
<!--          </ul>-->

          <ul class="grid-item">
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
        </div>

        <plannertable id="table" ></plannertable>
      </div>

    </div>
  </div>
</template>

<script>
  import plannertable  from './Table.vue'
  import { plannerService } from "../../services/planner.service"
  import Planner, {Planners} from "../../models/Planner";
  import { PlannerItems } from "../../models/PlannerItem";
  import {isNullOrEmpty} from '../../store/actions';

  export default {
    name: 'Planner',
    components: {
      plannertable
    },
    data() {
      return{
        planners: null
      }
    },
    created() {
      this.getPlanners();

    },
    methods: {
      isNullOrEmpty(x){
        return isNullOrEmpty(x)
      },

      async getPlanners() {
        let plannerIds = await plannerService.getPlannerIds();
        this.planners = new Planners();

        for (const id of plannerIds) {
          let planner = await plannerService.getPlanner(id);
          let items = await plannerService.getPlannerItems(id)

          let itemsModel = new PlannerItems();
          items.forEach(item => {
            itemsModel.add(item);
          })

          let plannerModel = new Planner({id: planner.id, title: planner.title, plannerItems: itemsModel});
          this.planners.add(plannerModel)
        }

        console.log(this.planners);

      },

      createNewPlanner() {
        console.log("create new planner");
      },

      joinPlanner() {
        console.log("join planner");
      },

      addTask() {
        console.log("add task");
      },

      addUser() {
        console.log("add / invite user");
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/variables";

  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
  }

  .wrapper{
    background-color: rgba(255, 255, 255, 0.75);
    margin: 0 15%;
    /*min-width: 1050px;*/

    h1 {
      padding-top: 30px;
    }

    h1, h3 {
      padding-left: 50px;
    }


    #start {
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
        margin-top: 3%;
      }
    }

  }

  @media(max-width:1620px){
    .wrapper {
      margin: 0 5%;
    }
  }

  @media(max-width:1260px){
    .wrapper {
      margin: 0 1%;
    }
  }
</style>
