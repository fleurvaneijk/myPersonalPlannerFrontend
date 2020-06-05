import {Collection, Model} from "vue-mc";
import {Users} from "./User";
import {PlannerItems} from "./PlannerItem";

export default class Planner extends Model {

  defaults () {
    return {
      id: null,
      title: null,
      plannerItems: null,
      users: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      title: String,
      plannerItems: (plannerItems) => new PlannerItems(plannerItems) || null,
      users: (users) => new Users(users) || null,
    }
  }
}

export class Planners extends Collection {

  model() {
    return Planner;
  }

}
