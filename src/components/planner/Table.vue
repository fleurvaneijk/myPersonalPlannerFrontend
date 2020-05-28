<template>
  <table >

    <thead>
      <tr>
        <td id="cornerblock"></td>
        <th v-for="day in daysInWeek" v-bind:key="day.id">
          <span id="long">{{ day.long }}</span>
          <span id="short">{{ day.short }}</span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in getUsers()" v-bind:key="user.username">

        <td id="username">{{ user.username }}</td>

        <td id="cell" v-for="day in daysInWeek" v-bind:key="day.id">

          <template v-for="appoinment in getAppointments(day.id, user.username)">

            <div class="item" v-bind:key="appoinment.get('id')">
              <p>{{ appoinment.get("title") }}</p>
              <p> {{ appoinment.get("description") }}</p>
            </div>

          </template>

        </td>

      </tr>

    </tbody>

  </table>
</template>

<script>
  import PlannerItem , {PlannerItems} from "./PlannerItem";
  import User, {Users} from "./User";
  import {days} from "../../store/store";

  let plannerItems;
  plannerItems = null;

  let users;
  users = null;

  export default ({
    data:() =>{
      return {
        daysInWeek: days,

      }
    },
    created() {
      plannerItems = new PlannerItems();
      let plannerItem1 = new PlannerItem({id: 1, day: 0, owner: "Fleur", title: "monday", description: "Test" });
      let plannerItem2 = new PlannerItem({id: 2, day: 1, owner: "Stefan", title: "tuesday", description: "Test" });
      let plannerItem3 = new PlannerItem({id: 3, day: 2, owner: "Simon", title: "wednesday 1", description: "Test" });
      let plannerItem4 = new PlannerItem({id: 4, day: 2, owner: "Simon", title: "wednesday 2", description: "Test" });
      let plannerItem5 = new PlannerItem({id: 5, day: 2, owner: "Stefan", title: "wednesday 3", description: "Test" });
      let plannerItem6 = new PlannerItem({id: 6, day: 3, owner: "Simon", title: "thursday", description: "Test" });
      let plannerItem7 = new PlannerItem({id: 7, day: 4, owner: "Fleur", title: "friday", description: "Test" });
      let plannerItem8 = new PlannerItem({id: 8, day: 5, owner: "Stefan", title: "saturday", description: "Test" });
      let plannerItem9 = new PlannerItem({id: 9, day: 6, owner: "Fleur", title: "sunday", description: "Test" });

      plannerItems.add(plannerItem1);
      plannerItems.add(plannerItem2);
      plannerItems.add(plannerItem3);
      plannerItems.add(plannerItem4);
      plannerItems.add(plannerItem5);
      plannerItems.add(plannerItem6);
      plannerItems.add(plannerItem7);
      plannerItems.add(plannerItem8);
      plannerItems.add(plannerItem9);

      users = new Users();
      let user1 = new User({id: 1, username: "Fleur"});
      let user2 = new User({id: 2, username: "Simon"});
      let user3 = new User({id: 3, username: "Stefan"});

      users.add(user1);
      users.add(user2);
      users.add(user3);


    },
    methods: {
      getUsers() {
        try{
          let users = users.getUsers();
        } catch (err){
          console.log(err); //TODO: cannot read property 'getUsers'of undefined ?? maar hij doet het wel
        }
        return users.models;
      },
      getAppointments(day, user) {
        let items = plannerItems.getAppointmentsForDay(day, user);
        return items.models;
      },

    }
  });
</script>

<style scoped lang="scss">
  @import "src/variables";

  table {
    width: 100%;

    thead {
      tr {
        td#cornerblock {
          background-color: $primary-blue;
        }

        th {
          height: 50px;
          background: $primary-blue;
          color: $secondary-blue;
          text-align: center;

          &:first-child {
            border-radius: 3px 0 0 0;
            width: 80px;
          }

          span#short {
            display: none;
          }
        }
      }
    }

    tbody {
      tr {
       /* background: $background-grey;*/

        td#cell {
          width: 180px;
          vertical-align: top;
          text-align: center;
          border: 2px black;
        }

        td#username {
          width: 30px;
          vertical-align: center;
          text-align: center;
          font-weight: bold;
          background-color: $primary-blue;
          color: $secondary-blue;
        }

        .item {
          text-align: left;
          display: inline-block;
          margin: 3px;
          padding: 3px 8px;
          width: 150px;
          height: 100px;
          border-radius: 5px;
          border: 2px solid $primary-blue;
          background-color: $secondary-blue;
          color: $background-grey;
        }
      }
    }
  }

    @media(max-width:60em){
      thead {
        tr {
          th {
            span#long {
              display: none;
            }

            span#short {
              display: block;
            }

          }
        }
      }
    }

    @media(max-width:27em){
      thead {
        tr {
          th {
            font-size: 65%;
          }
        }
      }
    }

</style>
