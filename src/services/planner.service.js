import {requests} from "../api/requests";

export const plannerService = {
  getPlannerIds,
  getPlanner,
  getPlannerItems,
};

function getPlannerIds(){
  return requests.getInstance().get('/api/Planner/getPlannerIds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("Error getting planner: ", error);
    })
}

function getPlanner(id) {
  const config = {
    params: {"plannerId": id}
  };

  return requests.getInstance().get('/api/Planner/getPlanner', config)
    .then(response => {
      if (response.data === "") {
        return null;
      } else {
        return response.data;
      }
    })
    .catch(error => {
      console.log("Error getting planner: ", error);
    })

}

function getPlannerItems(plannerId) {
  const config = {
    params: {"plannerId": plannerId}
  };

  return requests.getInstance().get('/api/Planner/getPlannerItems', config)
    .then(response => {
      if (response.data === "") {
        return null;
      } else {
        return response.data;
      }
    })
    .catch(error => {
      console.log("Error getting planner: ", error);
    })

}
