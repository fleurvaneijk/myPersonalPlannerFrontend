<template>
  <div>
    <h1>Agenda</h1>
    <table>
      <thead>
      <tr>
        <th>
          <span>
            <button type="button" class="btn btn-link" v-on:click="previousWeek()">
              <svg class="bi bi-arrow-left-short" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
              </svg>
            </button>
            <span>{{ weeknumber }}</span>
            <button type="button" class="btn btn-link" v-on:click="nextWeek()">
              <svg class="bi bi-arrow-right-short" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z" clip-rule="evenodd"/>
              </svg>
            </button>
          </span>
        </th>
        <th v-for="day in daysInWeek" v-bind:key="day.id">
          <span class="day" v-bind:class="{active: isToday(week[day.id])}">{{ week[day.id].getDate() }}</span>
          <span class="long">{{ monthsLong[week[day.id].getMonth()] }}</span>
          <span class="short">{{ monthsShort[week[day.id].getMonth()] }}</span>
          <span class="long">{{ day.long }}</span>
          <span class="short">{{ day.short }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="index in 24 * fractionOfHour" v-bind:key="index">
        <td class="hour" v-bind:rowspan="fractionOfHour" v-if="index % fractionOfHour == 1">{{ Math.floor(index / fractionOfHour) }}:00</td>
        <td v-for="day in daysInWeek" v-bind:key="day.id">
          <template v-for="appoinment in getAppointments(day.id, index)">
            <div class="item" v-bind:class="{overlapping: appoinment.get('overlapping').length > 0}" v-bind:key="appoinment.get('id')">
              <p>{{ appoinment.get("title") }}</p>
              <p> {{ appoinment.get("description") }}</p>
            </div>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import AgendaItem, {AgendaItems} from "./AgendaItem";
  import {days, monthsLong, monthsShort} from "./../../store/store";
  import {getDaysOfWeek, getWeekNumber, isToday} from "../../store/actions";

  let agendaItems;
  agendaItems = null;

  export default ({
    data:() =>{
      return {
        week: [],
        weeknumber: 0,
        weekoffset: 0,
        now: new Date(),
        daysInWeek: days,
        monthsLong: monthsLong,
        monthsShort: monthsShort,
        appointmentsInWeek: [],
        fractionOfHour: 2,
      }
    },
    created() {
      agendaItems = new AgendaItems();
      let agendaItem = new AgendaItem({id: 1, timestampBegin: 1589364000, timestampEnd: 1589374800, title: "Test1", description: "Test" });
      let agendaItem2 = new AgendaItem({id: 2, timestampBegin: 1589358600, timestampEnd: 1589362200, title: "Test2", description: "Test" });
      let overlapping = new AgendaItem({id: 3, timestampBegin: 1589358600, timestampEnd: 1589382000, title: "Overlapping", description: "Test" });
      agendaItems.add(agendaItem);
      agendaItems.add(agendaItem2);
      agendaItems.add(overlapping)
      this.now = new Date();
      this.loadNewDates();
    },
    methods: {
      previousWeek() {
        this.weekoffset--;
        this.loadNewDates();
      },
      nextWeek() {
        this.weekoffset++;
        this.loadNewDates();
      },
      loadNewDates() {
        let newDate = new Date();
        newDate.setDate(this.now.getDate() + (this.weekoffset * 7))
        this.week = this.getDaysOfWeek(newDate);
        this.weeknumber = this.getWeekNumber(newDate);
        for (let day in this.week) {
          this.appointmentsInWeek[day] = this.getAppointmentsForDay(day);
          this.findOverlappingAppointments(day);
        }
      },
      getDaysOfWeek(date) {
        return getDaysOfWeek(date);
      },
      getWeekNumber(date) {
        return getWeekNumber(date);
      },
      isToday(date) {
        return isToday(date);
      },
      getTimeStamp(dayId, index) {
        let date = this.week[dayId];
        date.setHours((index - 1)/this.fractionOfHour);
        date.setMinutes(((60 / this.fractionOfHour) * ((index - 1) % this.fractionOfHour)));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date / 1000;
      },
      getAppointments(id, index) {
        let timestamp = this.getTimeStamp(id, index);
        let items = this.appointmentsInWeek[id].getAppointmentsBetweenDates(timestamp, timestamp);
        return items.models;
      },
      getAppointmentsForDay(day) {
        let date = this.week[day];
        let dateBegin = new Date(date);
        dateBegin.setHours(0);
        dateBegin.setMinutes(0);
        dateBegin.setSeconds(0);
        dateBegin.setMilliseconds(0);
        let dateEnd = new Date(date);
        dateEnd.setHours(23);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        dateEnd.setMilliseconds(0)

        return agendaItems.getAppointmentsBetweenDates(dateBegin.getTime() / 1000, dateEnd.getTime() / 1000)
      },
      findOverlappingAppointments(day) {
        let appointments = this.appointmentsInWeek[day].models
        for (let index in appointments) {
          let appointment = appointments[index]
          let overlapping;
          overlapping = this.appointmentsInWeek[day]
            .getAppointmentsBetweenDates(appointment.timestampBegin, appointment.timestampEnd)
            .filter(function (appointmentFilter) {
              return appointmentFilter.id !== appointment.id;
            })
          appointment.setOverlapping(overlapping);
        }
      }
    }
  });
</script>

<style scoped lang="scss">

  @import "src/variables";

  table{
    width: 100%;
    table-layout: fixed;

    thead{
      tr{
        th{
          position: sticky;
          top: 50px;
          background: $primary-blue;
          color: $secondary-blue;
          padding: 0.2em;
          text-align: center;

          span {
            display: block;
          }

          &:first-child{
            border-radius:3px 0 0 0;
            width: 80px;
          }
          &:last-child{
            border-radius:0 3px  0 0;
          }

          .day{
            display: block;
            font-size: 1.2em;
            border-radius: 15px;
            width: 30px;
            height: 30px;
            margin: 0 auto 5px;
            padding: 5px;
            line-height: 25px;
            vertical-align: middle;

            &.active{
              background: $secondary-blue;
              color: $tertiary-orange;
            }
          }

          .long {
            display: block;
          }

          .short{
            display: none;
          }

          .month {
            display: block;
          }

          i{
            vertical-align: middle;
            font-size: 2em;
          }
        }
      }
    }
    tbody{
      tr:nth-child(1) {
        text-align: center;
      }
      tr{
        background: #ffffff;

        td:nth-child(1) {
          text-align: center;
        }

        &:nth-child(2n){
          background: $background-grey;
          td{
            border-bottom:1px solid $background-grey;
          }
        }
        td{
          vertical-align: middle;
          border-left: 1px solid $background-grey;
          height: 20px;

          &:last-child{
            border-right:1px solid $background-grey;
          }
          &.hour{
            font-size: 1em;
            color: $primary-blue;
            background:#fff;
            border-bottom:1px solid $background-grey;

            span{
              display: block;
            }
          }
        }
        .item {
          display: inline-block;
          border: 2px solid $primary-blue;
          background-color: $secondary-blue;
          color: $background-grey;
          padding: 3px 8px;
          width: 100%;
          border-radius: 5px;

          &.overlapping {
            color: $tertiary-orange;
          }
        }
      }
    }

    @media(max-width:60em){
      thead{
        tr{
          th{
            .long{
              display: none;
            }

            .short{
              display: block;
            }

          }
        }
      }
    }

    @media(max-width:27em){
      thead{
        tr{
          th{
            font-size: 65%;
            .day{
              display: block;
              font-size: 1.2em;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              margin: 0 auto 5px;
              padding: 5px;

              &.active{
                background: $tertiary-orange;
                color: $secondary-blue;
              }
            }
          }
        }
      }
      tbody tr td .hour{
        font-size: 0.8em;
      }
    }
  }
</style>
