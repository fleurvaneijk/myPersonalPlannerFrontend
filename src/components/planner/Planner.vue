<template>
  <div class="background">
    <div class="wrapper nav-component">
      <h1>Planner</h1>

      <form v-if="!isNullOrEmpty(planners)">
        <label>
          <select @change="changeCurrentPlanner(currentPlanner)" v-model="currentPlanner">
            <option  v-for="planner in planners.models" v-bind:key="planner.id"
                     :value="planner">{{planner.title}}
            </option>
          </select>
        </label>
      </form>

      <h3 v-if="isNullOrEmpty(planners)">You don't have any planners yet!</h3>

      <div id="start" v-if="isNullOrEmpty(planners)">
        <img class="start-planner" @click="createNewPlanner" src="../../assets/create.png" alt="Create new planner">
        <p>Create new planner</p>
      </div>

      <div id="planner" v-if="!isNullOrEmpty(planners)">
        <div>
          <div class="grid-container">
            <h2 class="grid-item">{{this.currentPlanner.title}}</h2>
            <ul class="grid-item">
              <li>
                <button @click="openCloseItemModal()">
                  <img class="planner-action" src="../../assets/create.png" alt="Join planner">
                  <p>Add Task</p>
                </button>
                <add-item-modal :plannerId="this.currentPlanner.id" v-model="itemModalOpen"></add-item-modal>
              </li>
              <li> <!--TODO: only show if user is owner-->
                <button @click="openCloseUserModal()">
                  <img class="planner-action" src="../../assets/create.png" alt="Join planner">
                  <p>Add User</p>
                </button>
                <add-user-modal :plannerId="this.currentPlanner.id" v-model="userModalOpen"></add-user-modal>
              </li>
            </ul>
          </div>

          <planner-table id="table" :planner="this.currentPlanner"></planner-table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Table  from './Table.vue';
  import AddUserModal from "./AddUserModal";
  import AddItemModal from "./AddItemModal";
  import { plannerService } from "../../services/planner.service";
  import {Planners} from "../../models/Planner";
  import {isNullOrEmpty} from "../../store/actions";

  export default {
    name: 'Planner',
    components: {
      "planner-table" : Table,
      "add-user-modal" : AddUserModal,
      "add-item-modal" : AddItemModal
    },
    data() {
      return{
        planners: null,
        userModalOpen: false,
        itemModalOpen: false,
        currentPlanner: null,
      }
    },
    async created() {
      this.planners = await this.getPlanners();
      this.currentPlanner = this.planners.models[0];
    },
    methods: {

      async getPlanners() {
        let planners = new Planners();
        planners.add(await plannerService.getPlanners());
        return planners;
      },

      changeCurrentPlanner(planner){
        this.currentPlanner = planner;
      },

      createNewPlanner() {
        console.log("create new planner");
      },

      openCloseItemModal() {
        if (this.userModalOpen) {
          this.userModalOpen = !this.userModalOpen
        }
        this.itemModalOpen = !this.itemModalOpen;
      },

      openCloseUserModal() {
        if (this.itemModalOpen) {
          this.itemModalOpen = !this.itemModalOpen
        }
        this.userModalOpen = !this.userModalOpen;
      },

      isNullOrEmpty(x) {
        return isNullOrEmpty(x);
      }
    }
  }
</script>

<style scoped lang="scss">

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
      .grid-container{
        margin-left: 4%;
      }

      .grid-item {
        display: inline-block;
        vertical-align: bottom;
      }

      ul {
        list-style: none;
        text-align: right;

        button{
          padding: 0;
          width: 70px;
          height: 60px;
          background-color: transparent;
          border-color: transparent;
        }

        li {
          margin: 0 10px;
          display: inline-block;
        }


        img.planner-action {
          zoom: 38%;
        }

        p{
          padding: 0;
          margin: 0;
          font-weight: bold;
        }
      }

      #table {
        margin-top: 1%;
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
