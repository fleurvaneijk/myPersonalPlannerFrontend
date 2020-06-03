import {Collection, Model} from "vue-mc";

export default class Planner extends Model {

  defaults () {
    return {
      id: null,
      title: null,
      plannerItems: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      title: String
    }
  }
}

export class Planners extends Collection {

  model() {
    return Planner;
  }

}
