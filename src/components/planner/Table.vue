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
      <tr v-for="user in planner.users.models" v-bind:key="user.id">

        <td id="username">{{ user.username }}</td>

        <td id="cell" v-for="day in daysInWeek" v-bind:key="day.id">

          <template v-for="item in getItems(day, user)">

            <div class="item" id="item" v-bind:key="item.id" @click="setDone(item.id)">
              <img class="planner-action trash" @click="deleteItem(item.id)" src="../../assets/rubbish.png" alt="Delete task">
              <img class="planner-action check" src="../../assets/check.png" alt="Delete task">
              <p id="title">{{ item.title }} </p>
              <p id="description">{{ item.description }}</p>
            </div>

          </template>

        </td>

      </tr>
    </tbody>
  </table>
</template>

<script>
  import {days} from "../../store/store";
  import {isNullOrEmpty} from '../../store/actions';
  import {plannerService} from "../../services/planner.service";

  export default ({
    props: ['planner'],
    watch: {
      planner: function() {
        this.users = null;
        this.itemsForUser = {};
        this.getItemsForUsers(this.planner.users.models);
      }
    },
    data () {
      return {
        daysInWeek: days,
        users: null,
        itemsForUser: {}
      }
    },
    created() {
      this.getItemsForUsers(this.planner.users.models);

    },
    methods: {
      isNullOrEmpty(x){
        return isNullOrEmpty(x);

      },

      getItems(day, user) {
        let items = this.itemsForUser[user.id][day.id];
        return items.models;
      },

      getItemsForUsers(users) {
        users.forEach( user  => {
          let itemsInDay = {}

          this.daysInWeek.forEach(day => {
            itemsInDay[day.id] = this.planner.plannerItems.getItemsByDayAndUser(day.id, user);
          });

          this.itemsForUser[user.id] = itemsInDay;
        })
      },

      deleteItem(itemId) {
        plannerService.deletePlannerItem(itemId);
      },

      setDone(itemId) {
        //todo check item when it's done
        itemId;
        let element = document.getElementById("item");

        if(element.classList.contains('isDone')){
          element.classList.remove('isDone');
        } else {
          element.classList.add('isDone');

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
      overflow: auto;

      tr {
        td#cell {
          width: 180px;
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
          cursor: pointer;
          display: inline-block;
          margin: 10px;
          padding: 3px 8px;
          width: 140px;
          height: 85px;
          border-radius: 5px;
          border: 2px solid $primary-blue-transparent; /*TODO: make color user bound*/
          background-color: $secondary-blue-transparent;
          color: $background-grey;
          overflow: auto;
          position: relative;

          img.trash {
            display: none;
            position: absolute;
            right: 0;
            cursor: pointer;
            width: 20px;
            height: 20px;
          }
          img.check {
            display: none;
            position: absolute;
            right: 1px;
            bottom: 1px;
            width: 30px;
            height: 30px;
          }

          p {
            clear: both;
          }
        }
        .item:hover{
          img.trash {
            display: block;
          }
        }
        .item.isDone {
          img.check {
            display: block;
          }
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
      width: 110px !important;
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
