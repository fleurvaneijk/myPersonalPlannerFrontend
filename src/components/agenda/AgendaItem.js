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
      id: (id) => Number(id) || null,
      timestampBegin: (timestampBegin) => Number(timestampBegin) || null,
      timestampEnd: (timestampEnd) => Number(timestampEnd) || null,
      title: String,
      description: String,
      overlapping: []
    }
  }

  setOverlapping(overlapping) {
      this.overlapping = overlapping;
      for (let overlappingItemIndex in overlapping) {
        let overlappingItem = overlapping[overlappingItemIndex]
        console.log(overlappingItem);
      }
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

