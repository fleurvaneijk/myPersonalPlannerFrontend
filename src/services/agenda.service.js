import {requests} from "../api/requests";
import AgendaItem, {AgendaItems} from "../models/AgendaItem";
const ical = require('ical');

export const agendaService = {
  loadICal
}

function loadICal (update) {
  requests.getInstance().get("/api/agenda/").then(response => {

    let cal = getAgendaFromResponse(response);
    let agendaItems = convertIcalItemsToAgendaItems(cal)
    update(agendaItems);
  });
}

function getAgendaFromResponse(response) {
  let items = response.data;
  return ical.parseICS(items);
}

function convertIcalItemsToAgendaItems(cal) {
  let agendaItems = new AgendaItems();
  for (let item in cal) {
    var event = cal[item];
    if (cal[item].type === 'VEVENT') {
      let newItem = makeAgendaItemForICalItem(event);
      agendaItems.add(newItem);
    }
  }
  return agendaItems;
}

function makeAgendaItemForICalItem(event) {
  let timeBegin = event.start.getTime();
  let timeEnd = event.end.getTime();
  let newItem = new AgendaItem({
    id: event.uid,
    timestampBegin: timeBegin,
    timestampEnd: timeEnd,
    title: event.summary,
    description: event.description,
    location: event.location
  });
  return newItem;
}
