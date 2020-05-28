import {Model, Collection} from "vue-mc";

export default class PlannerItem extends Model {

  defaults () {
    return {
      id: null,
      day: null,
      owner: null,
      title: null,
      description: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      day: (day) => Number(day),
      title: String,
      description: String,
    }
  }
}

export class PlannerItems extends Collection {

  model() {
    return PlannerItems;
  }

  //returns the appointments for day x
  getAppointmentsForDay(id , owner) {
    return this.filter((appointment) => {
      return appointment.day === id && appointment.owner === owner;
    })
  }

}

