import {agendaService} from "../src/services/agenda.service";
import {Planners} from "../src/models/Planner";

var assert = require('assert');

var text =
[
    {
        "id": 1,
        "title": "Fleur's Planner",
        "owner": 1,
        "plannerItems": [
            {
                "id": 1,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 0,
                "title": "Monday",
                "description": "Test Item",
                "isDone": false
            },
            {
                "id": 2,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 1,
                "title": "Tuesday",
                "description": "Another Test",
                "isDone": false
            },
            {
                "id": 3,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 2,
                "title": "Wednesday",
                "description": "Third Test Item",
                "isDone": false
            },
            {
                "id": 4,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 3,
                "title": "Thursday",
                "description": "This one is done!",
                "isDone": true
            },
            {
                "id": 5,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 4,
                "title": "Friday",
                "description": "It's Friday, yay!",
                "isDone": false
            },
            {
                "id": 6,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 5,
                "title": "Saturday",
                "description": "",
                "isDone": false
            },
            {
                "id": 7,
                "plannerId": 1,
                "planner": null,
                "user": 1,
                "day": 6,
                "title": "Sunday",
                "description": "",
                "isDone": false
            },
            {
                "id": 8,
                "plannerId": 1,
                "planner": null,
                "user": 2,
                "day": 4,
                "title": "Friday",
                "description": "I have an item on friday too :)",
                "isDone": false
            }
        ],
        "users": [
            {
                "id": 1,
                "username": "fleur",
                "password": null,
                "agendaLink": null,
                "plannerUsers": null
            },
            {
                "id": 2,
                "username": "simon",
                "password": null,
                "agendaLink": null,
                "plannerUsers": null
            }
        ]
    }
];

describe('Array', function() {
  describe('#length', function() {
    let planners = new Planners();
    planners.add(text);
    it('should have one planner', function () {
      console.log(planners.models[0] != null);
      assert.equal(planners.models.length, 1)
    });
    it('should have 8 items', function () {
      assert.equal(planners.models[0].plannerItems.models.length, 8)
    });
    it('should have an name', function () {
      assert.equal(planners.models[0].plannerItems.models[0].title, "Monday")
    });
    it('should have an day', function () {
      assert.equal(planners.models[0].plannerItems.models[0].day, 0)
    });
    it('should have an description', function () {
      assert.equal(planners.models[0].plannerItems.models[0].description, "Test Item")
    });
    it('should have users', function () {
      assert.equal(planners.models[0].users.models.length, 2);
    });
    it('should have a user', function () {
      assert.equal(planners.models[0].users.models[0].username, "fleur");
    });
    it('should have no password', function () {
      assert.equal(planners.models[0].users.models[0].password, null);
    });
  });
});

