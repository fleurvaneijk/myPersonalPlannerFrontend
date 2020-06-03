import {Collection, Model} from "vue-mc";

export default class PlannerItem extends Model {

  defaults () {
    return {
      id: null,
      user: null,
      day: null,
      title: null,
      description: null,
      isDone: false,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      user: Number,
      day: Number,
      title: String,
      description: String,
      isDone: Boolean,
    }
  }
}

export class PlannerItems extends Collection {

  model() {
    return PlannerItem;
  }

  getAppointmentsForDayAndUser(day , user) {
    return this.filter((appointment) => {
      return appointment.day == day && appointment.user == user.id;
    })
  }

  getAppointmentsForDay(day) {
    return this.filter((appointment) => {
      return appointment.day === day;
    })
  }

}

