import {Model, Collection} from "vue-mc";

export default class PlannerItem extends Model {

  defaults () {
    return {
      id: null,
      plannerId: null,
      user: null,
      day: null,
      title: null,
      description: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      plannerId: (plannerId) => Number(plannerId) || null,
      user: String,
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

  getAppointmentsForDay(day , user) {
    return this.filter((appointment) => {
      return appointment.day === day && appointment.owner === user;
    })
  }

}

