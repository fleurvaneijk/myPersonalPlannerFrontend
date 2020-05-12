import LoginComponent from './components/start/Login.vue'
import SignUpComponent from './components/start/SignUp.vue'
import AgendaComponent from './components/agenda/Agenda.vue';
import MenuComponent from './components/menu/Menu.vue';
import PlannerComponent from './components/planner/Planner.vue';
import SettingsComponent from './components/settings/Settings.vue';

export const routes = [
  { path: '/', component: MenuComponent },
  { path: '/agenda', component: AgendaComponent },
  { path: '/login', component: LoginComponent },
  { path: '/signup', component: SignUpComponent },
  { path: '/planner', component: PlannerComponent },
  { path: '/settings', component: SettingsComponent },
];
