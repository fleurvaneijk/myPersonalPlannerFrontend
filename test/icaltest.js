import {agendaService} from "../src/services/agenda.service";

var assert = require('assert');

var ical =
  `
BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Test
X-WR-TIMEZONE:Europe/Amsterdam
X-WR-CALDESC:Test
BEGIN:VEVENT
DTSTART:20200605T113000Z
DTEND:20200605T180000Z
DTSTAMP:20200605T131250Z
UID:2mo19tqkhn0isv40apqoc1imkg@google.com
CREATED:20200605T131230Z
DESCRIPTION:
LAST-MODIFIED:20200605T131230Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Test
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR
`

describe('Calendar', function() {
  describe('Get and filter', function() {
    let agendaItems;
    it('should have one appointment', function() {
      let cal = agendaService.getAgendaFromResponse(ical);
      agendaItems = agendaService.convertIcalItemsToAgendaItems(cal)
      assert.equal(agendaItems.models.length, 1);
    });
    it('should have one appointment', function() {
      let filtered = agendaItems.getAppointmentsBetweenDates(new Date(1591315200000), new Date(1591401540000));
      assert.equal(filtered.models.length, 1)
    });
    it('should have no appointments', function() {
      let filtered = agendaItems.getAppointmentsBetweenDates(new Date(1591401600000), new Date(1591487940000));
      assert.equal(filtered.models.length, 0)
    });
  });
});

