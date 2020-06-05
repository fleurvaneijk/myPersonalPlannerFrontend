import {requests} from "../api/requests";

export const plannerService = {
  getPlanners,
  addUser
};

function getPlanners() {
  return requests.getInstance().get('/api/Planner/getPlanners')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("Error getting planners: ", error);
    })
}

function addUser(plannerId, username) {
  const data = {
    "plannerId": plannerId,
    "username": username
  }

  console.log("config", data);

  return requests.getInstance().post('/api/Planner/addUserToPlanner', data)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error adding user: ", error.message());
    })
}
