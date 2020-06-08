<template>
  <div>
    <h1>Task of the day</h1>
    <div class="pre-scrollable">

      <template v-for="appointment in tasks">
        <div class="item task" v-bind:class="{overlapping: appointment.get('overlapping').length > 0}" v-bind:key="appointment.get('id')">
          <div class="row firstRow">
            <div class="col-sm-6 col-md-6">
              <p>Taak: {{ appointment.get("title") }}</p>
            </div>
            <div class="col-sm-6 col-md-6">
              <p>Locatie: {{ appointment.get("location") }} </p>
            </div>
          </div>
          <div class="row secondRow">
            <div class="col-sm-12 col-md-12">
              <p>Omschrijving: {{ appointment.get("description") }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {now} from "../../store/store";
  import {agendaService} from "../../services/agenda.service";

  export default {
    created() {
      this.loadICal();
    },
    data() {
      return {
        tasks: null,
      }
    },
    methods: {
      loadICal(){
        agendaService.loadICal((newAgendaItems) => {
          this.getTaskOfTheDay(newAgendaItems);
        });
      },
      getTaskOfTheDay(agendaItems) {
        let date = now;
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

        this.tasks = agendaItems.getAppointmentsBetweenDates(dateBegin, dateEnd).models;
      }
    },
  }
</script>
<style scoped lang="scss">
  @import "src/variables";

  .task {
    margin: 5px;
    border-radius: 5px;
    border: 2px solid $primary-blue-transparent;
    background-color: $secondary-blue-transparent;
    color: $background-grey;
    word-wrap: break-word;
  }

  .firstRow {
    margin: 5px;
  }

  .secondRow {
    text-align: left;
    margin: 5px;
  }

  .pre-scrollable {
    max-height: 400px;
  }

</style>
