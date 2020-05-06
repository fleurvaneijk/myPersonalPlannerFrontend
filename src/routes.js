import StartComponent from './components/start/Start.vue'
import SignUpComponent from './components/start/Register.vue'
import AgendaComponent from './components/agenda/Agenda.vue';
import MenuComponent from './components/menu/Menu.vue';
import PlannerComponent from './components/planner/Planner.vue';
import SettingsComponent from './components/settings/Settings.vue';

export const routes = [
  { path: '/', component: MenuComponent },
  { path: '/agenda', component: AgendaComponent },
  { path: '/start', component: StartComponent },
  { path: '/signup', component: SignUpComponent },
  { path: '/planner', component: PlannerComponent },
  { path: '/settings', component: SettingsComponent },
];
