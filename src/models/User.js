import {Model, Collection} from "vue-mc";

export default class User extends Model {

  defaults () {
    return {
      id: null,
      username: null,
    }
  }

  mutations() {
    return {
      id: (id) => Number(id) || null,
      username: String,
    }
  }
}

export class Users extends Collection {

  model() {
    return User;
  }

  getUsers() {
    return this;
  }

}

