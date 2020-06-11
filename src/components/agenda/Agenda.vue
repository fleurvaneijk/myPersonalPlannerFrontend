<template>
  <div class="background">
    <div class="wrapper nav-component">
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
        <tr v-for="index in 24 * fractionsOfHour" v-bind:key="index">
          <td class="hour" v-bind:rowspan="fractionsOfHour" v-if="index % fractionsOfHour == 1 || fractionsOfHour == 1">
            {{ Math.floor(index / fractionsOfHour) }}:00</td>
          <td v-for="day in daysInWeek" v-bind:key="day.id">
            <template v-for="appointment in getAppointments(day.id, index)">
              <div class="item" v-bind:class="{overlapping: appointment.get('overlapping').length > 0}" v-bind:key="appointment.get('id')">
                <p>{{ appointment.get("title") }}</p>
                <p> {{ appointment.get("description") }}</p>
                <p> {{ appointment.get("location") }}</p>
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {AgendaItems} from "./../../models/AgendaItem";
  import {days, monthsLong, monthsShort} from "./../../store/store";
  import {getDaysOfWeek, getWeekNumber, isToday} from "../../store/actions";
  import {agendaService} from "../../services/agenda.service";

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
        fractionsOfHour: 1
      }
    },
    created() {
      agendaItems = new AgendaItems();
      this.now = new Date();
      this.loadNewWeek();
      this.loadICal();
    },
    methods: {
      previousWeek() {
        this.weekoffset--;
        this.loadNewWeek();
      },
      nextWeek() {
        this.weekoffset++;
        this.loadNewWeek();
      },
      loadNewWeek() {
        let newDate = new Date();
        newDate.setDate(this.now.getDate() + (this.weekoffset * 7))
        this.week = this.getDaysOfWeek(newDate);
        this.weeknumber = this.getWeekNumber(newDate);
        this.loadNewAppointsForWeek();
      },
      loadNewAppointsForWeek() {
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
        date.setHours((index - 1)/this.fractionsOfHour);
        date.setMinutes(((60 / this.fractionsOfHour) * ((index - 1) % this.fractionsOfHour)));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      },
      getAppointments(id, index) {
        let timestampBegin = this.getTimeStamp(id, index);
        let timestampEnd = this.getTimeStamp(id, index + 1);
        timestampBegin.setMinutes(1);
        let items = this.appointmentsInWeek[id].getAppointmentsBetweenDates(timestampBegin, timestampEnd);
        return items.models;
      },
      getAppointmentsForDay(day) {
        let date = this.week[day];
        let dateBegin = new Date(date);
        dateBegin.setHours(0);
        dateBegin.setMinutes(1);
        dateBegin.setSeconds(0);
        dateBegin.setMilliseconds(0);
        let dateEnd = new Date(date);
        dateEnd.setHours(23);
        dateEnd.setMinutes(59);
        dateEnd.setSeconds(59);
        dateEnd.setMilliseconds(0)

        return agendaItems.getAppointmentsBetweenDates(dateBegin.getTime(), dateEnd.getTime())
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
      },
      loadICal(){
        agendaItems = agendaService.loadICal((newAgendaItems) => {
          agendaItems = newAgendaItems;
          this.loadNewWeek();
        });
      },
      isFirst(day, index, appointment) {
        let timestampBegin = this.getTimeStamp(day, index);
        let timestampEnd = this.getTimeStamp(day, index + this.fractionsOfHour);
        console.log(timestampBegin, timestampEnd, appointment)
      }
    }
  });
</script>

<style scoped lang="scss">

  @import "src/variables";

  .background {
    background-image: url("../../assets/background2.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    clear: both;
    overflow: auto;
    min-height: 100%;
  }

  .wrapper {
    background-color: rgba(255, 255, 255, 0.75);
    margin: 0 1%;
    padding: 10px 20px;
  }

  table{
    width: 100%;
    table-layout: auto;

    thead{

      background-color: rgba(255, 255, 255, 0.50);
      color: $black;
      border-right: dotted 1px $tertiary-orange;

      th {
        border-left: dotted 1px $tertiary-orange;
        border-top: dotted 1px $tertiary-orange;
        height: 50px;
        text-align: center;
        padding: 10px;

        span#day-name-short {
          display: none;
        }

        span, .long, .month {
          display: block;
        }
        .short{
          display: none;
        }
        i{
          vertical-align: middle;
          font-size: 2em;
        }
        &:first-child {
          width: 80px;
        }
        .day{
          display: block;
          font-size: 1.2em;
          border-radius: 15px;
          width: 30px;
          height: 30px;
          margin: 0 auto;
          padding: 5px;
          vertical-align: middle;
          &.active{
            color: $secondary-blue;
          }
        }
      }
    }
    tbody{
      tr:nth-child(1) {
        text-align: center;
        border-top: dotted 1px $tertiary-orange;
      }
      tr{
        background: $white-transparant;
        td:nth-child(1) {
          text-align: center;
        }

        &:nth-child(2n){
          background: $background-grey-transparant;
        }
        td{
          vertical-align: middle;
          border-left: dotted 1px $tertiary-orange;;
          height: 20px;
          border-bottom: dotted 1px $tertiary-orange;
          border-right: dotted 1px $tertiary-orange !important;

          &:last-child{
            border-right:1px solid $background-grey-transparant;
          }
          &.hour{
            font-size: 1em;
            color: $primary-blue;
            background: $white-transparant;
            border-bottom:1px solid $background-grey-transparant;

            span{
              display: block;
            }
          }
        }
        .item {
          text-align: left;
          display: inline-block;
          margin: 1px;
          padding: 3px;
          border-radius: 5px;
          border: 2px solid $primary-blue-transparent;
          background-color: $secondary-blue-transparent;
          color: $background-grey;
          overflow: auto;
          position: relative;
          p {
            clear: both;
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
