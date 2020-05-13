import LoginComponent from './components/start/Login.vue'
import SignUpComponent from './components/start/SignUp.vue'
import AgendaComponent from './components/agenda/Agenda.vue';
import MenuComponent from './components/menu/Menu.vue';
import PlannerComponent from './components/planner/Planner.vue';
import SettingsComponent from './components/settings/Settings.vue';
import HeaderComponent from './components/Header'

export const routes = [
  { path: '' , name: 'menu', components: {
    default: MenuComponent,
    'header-top': HeaderComponent
  } },
  { path: '/agenda' , name: 'agenda', components: {
      default: AgendaComponent,
      'header-top': HeaderComponent
    } },
  { path: '/planner' , name: 'planner', components: {
      default: PlannerComponent,
      'header-top': HeaderComponent
    } },
  { path: '/settings' , name: 'settings', components: {
      default: SettingsComponent,
      'header-top': HeaderComponent
    } },
  { path: '/login', component: LoginComponent },
  { path: '/signup', component: SignUpComponent },
  { path: '*', redirect: '/' }
];
