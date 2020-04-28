import HomeComponent from './components/Home.vue';
import CalendarComponent from './components/calendar/Calendar.vue';

export const routes = [
  { path: '', component: HomeComponent },
  { path: '/calendar', component: CalendarComponent }
];
