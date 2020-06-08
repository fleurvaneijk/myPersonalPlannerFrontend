<template>
  <div class="background">
    <div class="wrapper nav-component">
      <h1>Planner</h1>
      <br>
      <div id="start" v-if="!plannersExist">
        <h3>You don't have any planners yet!</h3>
        <img class="start-planner" @click="openCloseCreatePlannerModal" src="../../assets/create.png" alt="Create new planner">
        <p>Create a planner!</p>
        <create-planner-modal class="custom-modal" v-model="createPlannerModalOpen"></create-planner-modal>
      </div>

      <div id="planner" v-if="plannersExist">
        <div>
          <div class="grid-container">

            <div class="grid-item left">
              <label>
                <select class="dropdown" @change="changeCurrentPlanner(currentPlanner)" v-model="currentPlanner">
                  <option id="option" v-for="planner in planners.models" v-bind:key="planner.id"
                          :value="planner">{{planner.title}}
                  </option>
                </select>
                <span title="Create new planner">
                  <button class="left" @click="openCloseCreatePlannerModal()">
                    <img class="planner-action plus" src="../../assets/plus.png" alt="Add Planner">
                  </button>
                  <create-planner-modal class="custom-modal" v-model="createPlannerModalOpen"></create-planner-modal>
                </span>
                <span v-if="owner" title="Delete this planner">
                  <button class="left" @click="deletePlanner()">
                    <img class="planner-action cross" src="../../assets/cross.png" alt="Delete Planner">
                  </button>
                </span>
              </label>

            </div>

            <ul class="grid-item right">
              <li>
                <button @click="openCloseItemModal()">
                  <img class="planner-action" src="../../assets/create.png" alt="Add task">
                  <p>Add Task</p>
                </button>
                <add-item-modal class="custom-modal" :planner="this.currentPlanner" v-model="itemModalOpen"></add-item-modal>
              </li>
              <li v-if="owner">
                <button @click="openCloseUserModal()">
                  <img class="planner-action" src="../../assets/create.png" alt="Add user">
                  <p>Add User</p>
                </button>
                <add-user-modal class="custom-modal" :plannerId="this.currentPlanner.id" v-model="userModalOpen"></add-user-modal>
              </li>
              <li v-if="owner">
                <button @click="openCloseRemoveUserModal()">
                  <img class="planner-action cross" src="../../assets/cross.png" alt="Remove user">
                  <p>Remove User</p>
                </button>
                <remove-user-modal class="custom-modal" :planner="this.currentPlanner" v-model="removeUserModalOpen"></remove-user-modal>
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
  import RemoveUserModal from "./RemoveUserModal";
  import CreatePlannerModal from "./CreatePlannerModal";
  import { plannerService } from "../../services/planner.service";
  import {Planners} from "../../models/Planner";
  import {isNullOrEmpty} from "../../store/actions";
  import {userService} from "../../services/user.service";

  export default {
    name: 'Planner',
    components: {
      "planner-table" : Table,
      "add-user-modal" : AddUserModal,
      "add-item-modal" : AddItemModal,
      "remove-user-modal" : RemoveUserModal,
      "create-planner-modal" : CreatePlannerModal
    },
    data() {
      return{
        planners: null,
        userModalOpen: false,
        itemModalOpen: false,
        removeUserModalOpen: false,
        createPlannerModalOpen: false,
        currentPlanner: null,
        owner: false,
        plannersExist: false
      }
    },
    async created() {
      this.planners = await this.getPlanners();
      if(this.isNullOrEmpty(this.planners) === false){
        this.currentPlanner = this.planners.models[0];
        this.checkIfUserIsOwner();
      }

    },
    methods: {
      checkIfUserIsOwner() {
        let loggedInUser = userService.getUserFromLocalstorage();
        this.owner = loggedInUser.id === this.currentPlanner.owner;
      },

      async getPlanners() {
        let planners = new Planners();
        let plannersData = await plannerService.getPlanners();
        if (plannersData) {
          planners.add(plannersData);
        }
        return planners;
      },

      deletePlanner() {
        if(confirm('Are you sure you want to delete this planner: "' + this.currentPlanner.title + '"?')){
          plannerService.deletePlanner(this.currentPlanner.id);
        }
      },

      changeCurrentPlanner(planner){
        this.checkIfUserIsOwner()
        this.currentPlanner = planner;
      },

      openCloseCreatePlannerModal() {
        this.createPlannerModalOpen = !this.createPlannerModalOpen;
      },

      openCloseItemModal() {
        this.closeOtherModals(this.itemModalOpen);
        this.itemModalOpen = !this.itemModalOpen;
      },

      openCloseUserModal() {
        this.closeOtherModals(this.userModalOpen);
        this.userModalOpen = !this.userModalOpen;
      },

      openCloseRemoveUserModal() {
        this.closeOtherModals(this.removeUserModalOpen);
        this.removeUserModalOpen = !this.removeUserModalOpen;
      },

      closeOtherModals(modal){
        if (this.itemModalOpen && this.itemModalOpen !== modal) {
          this.itemModalOpen = false;
        } else if (this.userModalOpen && this.userModalOpen !== modal) {
          this.userModalOpen = false
        } else if (this.removeUserModalOpen && this.removeUserModalOpen !== modal) {
          this.removeUserModalOpen = false;
        }
      },

      isNullOrEmpty(planners) {
       this.plannersExist = !isNullOrEmpty(planners);
       return isNullOrEmpty(planners);
      }
    }
  }
</script>

<style scoped lang="scss"> /*todo: cleanup this styling mess*/
  @import "src/variables";

  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
  }

  .wrapper{
    background-color: rgba(255, 255, 255, 0.75);
    margin: 0 15%;

    h1 {
      padding-top: 30px;
    }

    h1, h3 {
      margin-left: 50px;
    }

    .dropdown {
      background-color: #fcf0f7;
      border: 0.1px solid white;
      border-radius: 3px;
      height: 40px;
      min-width: 250px;
      font-size: 1.8em;

      #option {
        font-size: 1em;
      }
    }

    #start {
      width: 100%;
      display: inline-block;
      text-align: center;

      img.start-planner {
        zoom: 100%;
        margin: 50px auto 10px;
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

      ul.right {
        float: right;
        padding-right: 10px;
      }

      div.left {
        float: left;
        padding-left: 10px;
      }

      .grid-item {
        display: inline-block;
        list-style: none;

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
          width: 38px;
          height: 38px;
        }
        img.cross {
          width: 25px;
          height: 25px;
        }
        img.plus {
          width: 30px;
          height: 30px;
          vertical-align: center;

        }

        p{
          padding: 0;
          margin: 0;
          font-weight: bold;
        }
      }

      label{
        margin-bottom: 0;
      }

      select {
        cursor: pointer;
      }

      button.left{
        height: 40px;
        width: 40px;
      }

      #table {
        margin-top: 1%;
      }
    }

    .custom-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 1px solid $primary-blue;
      border-radius: 3px;
      width: 20%;
      min-width: 250px;
      height: 40%;
      min-height: 300px;
      text-align: center;
      z-index: 1;
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
