import {Model, Collection} from "vue-mc";

export default class PlannerItem extends Model {

  defaults () {
    return {
      id: null,
      timestampBegin: null,
      timestampEnd: null,
      title: null,
      description: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      timestampBegin: (timestampBegin) => Number(timestampBegin) || null,
      timestampEnd: (timestampEnd) => Number(timestampEnd) || null,
      title: String,
      description: String,
    }
  }
}

export class PlannerItems extends Collection {

  model() {
    return PlannerItems;
  }

  getAppointmentsBetweenDates(begin, end) {
    return this.filter((appointment) => {
      return appointment.timestampBegin <= end && appointment.timestampEnd >= begin;
    })
  }

}

