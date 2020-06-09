import {requests} from "../api/requests";

export const plannerService = {
  getPlanners,
  createPlanner,
  addUser,
  addItem,
  deletePlanner,
  deletePlannerItem,
  removeUserFromPlanner,
  setDone
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

function createPlanner(title) {
  const config = {
    params: {
      "title": title
    }
  }

  return requests.getInstance().post('/api/Planner/createPlanner', null, config)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error creating planner: ", error);
    })
}

function addUser(plannerId, username) {
  const data = {
    "plannerId": plannerId,
    "username": username
  }

  return requests.getInstance().post('/api/Planner/addUserToPlanner', data)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error adding user: ", error);
    })
}

function addItem(plannerId, userId, day, title, description) {
  const data = {
    "id": 0,
    "plannerId": plannerId,
    "user": userId,
    "day": day,
    "title": title,
    "description": description,
    "isDone": false
  }

  return requests.getInstance().post('/api/Planner/addPlannerItem', data)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error adding item: ", error);
    })
}

function deletePlanner(plannerId) {
  const config = {
    params: {
      "id": plannerId
    }
  }

  return requests.getInstance().delete('/api/Planner/', config)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error deleting planner: ", error);
    })
}

function deletePlannerItem(itemId) {
  const config = {
    params: {
      "id": itemId
    }
  }

  return requests.getInstance().delete('/api/Planner/plannerItem', config)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error deleting planner: ", error);
    })
}

function removeUserFromPlanner(plannerId, username) {
  const data = {
    "PlannerId": plannerId,
    "Username": username
  }

  return requests.getInstance().post('/api/Planner/removeUserFromPlanner', data)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error removing user from planner: ", error);
    })
}

function setDone(itemId, isDone) {
  const config = {
    params: {
      "itemId": itemId,
      "isDone": isDone
    }
  }

  return requests.getInstance().put('/api/Planner/setDoneItem', null, config)
    .then(response => {
      console.log("reponse data: ", response.data);
      location.reload();
    })
    .catch(error => {
      console.log("Error deleting planner: ", error);
    })
}
