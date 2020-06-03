<template>
  <table>
    <thead>
      <tr>
        <td></td>
        <th v-for="day in daysInWeek" v-bind:key="day.id">
          <span id="day-name-long">{{ day.long }}</span>
          <span id="day-name-short">{{ day.short }}</span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in this.users" v-bind:key="user.id">
        <td id="username">{{ user.username }}</td>
        <td id="cell" v-for="day in daysInWeek" v-bind:key="day.id">
          <template v-for="appoinment in getAppointments(day.id, user)">
            <div class="item" v-bind:key="appoinment.id">
              <p id="title">{{ appoinment.title }} </p>
              <p id="description">{{ appoinment.description }}</p>
            </div>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { plannerService } from "../../services/planner.service"
  import {days} from "../../store/store";

  export default ({
    props: ['planner'],
    data () {
      return {
        daysInWeek: days,
        users: null,
        itemsForUser: {}
      }
    },
    created() {
      this.users = this.getUsers();
    },
    methods: {
      getUsers() {
        plannerService.getUsersInPlanner(this.planner.id).then((users)=>{
          this.getItemsForUsers(users);
          this.users = users;
        });
      },

      getAppointments(day, user) {
        let items = this.itemsForUser[user.id][day];
        return items.models;
      },
      getItemsForUsers(users) {
        for (const userIndex in users) {
          const user = users[userIndex];
          let itemsInDay = {}
          for (let dayIndex in this.daysInWeek) {
            let plannerItems = this.planner.plannerItems.getAppointmentsForDayAndUser(dayIndex, user);
            itemsInDay[dayIndex] = plannerItems;
          }
          this.itemsForUser[user.id] = itemsInDay;
        }
      }
    }
  });
</script>

<style scoped lang="scss">
  @import "src/variables";

  table {
    width: 100%;

    thead {
      background-color: rgba(255, 255, 255, 0.50);
      color: $black;

      th {
        border-left: dotted 1px $tertiary-orange;
        height: 50px;
        text-align: center;

        span#day-name-short {
          display: none;
        }
      }
    }

    tbody {
      tr {

        td#cell {
          /*max-width: 180px;*/
          border: dotted 1px $tertiary-orange;
          vertical-align: top;
          text-align: center;
        }

        td#username {
          width: 30px;
          vertical-align: center;
          text-align: center;
          font-weight: bold;
          background-color: #fcf0f7;
          color: $black;
          border-top: dotted 1px $tertiary-orange;
          border-bottom: dotted 1px $tertiary-orange;
        }

        .item {
          text-align: left;
          display: inline-block;
          margin: 10px;
          padding: 3px 8px;
          width: 120px;
          height: 85px;
          border-radius: 5px;
          border: 2px solid $primary-blue-transparent; /*TODO: make color user bound*/
          background-color: $secondary-blue-transparent;
          color: $background-grey;
        }
      }
    }
  }

  @media(max-width:960px){
    span#day-name-long {
      display: none;
    }
    span#day-name-short {
      display: block !important;
    }
  }

  @media(max-width: 1160px){
    .item {
      width: 100px !important;
      height: 75px !important;
      margin: 3px !important;
    }
  }

  @media(max-width: 820px){
    .item {
      width: 80px !important;
      height: 50px !important;
    }
    p#description {
      display: none;
    }
  }

</style>
