import {Model, Collection} from "vue-mc";

export default class AgendaItem extends Model {

  defaults () {
    return {
      id: null,
      timestampBegin: null,
      timestampEnd: null,
      title: null,
      description: null,
      overlapping: []
    }
  }

  mutations() {
    return {
      id: String,
      timestampBegin: (timestampBegin) => Number(timestampBegin) || null,
      timestampEnd: (timestampEnd) => Number(timestampEnd) || null,
      title: String,
      description: String,
      overlapping: []
    }
  }

  setOverlapping(overlapping) {
      this.overlapping = overlapping;
  }
}

export class AgendaItems extends Collection {

  model() {
    return AgendaItem;
  }

  getAppointmentsBetweenDates(begin, end) {
    return this.filter((appointment) => {
      return appointment.timestampBegin <= end && appointment.timestampEnd >= begin;
    })
  }

}

