import {requests} from "../api/requests";

export const plannerService = {
  getPlanners
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
