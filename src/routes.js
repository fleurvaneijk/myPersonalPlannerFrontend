import LoginComponent from './components/start/Login.vue'
import SignUpComponent from './components/start/SignUp.vue'
import AgendaComponent from './components/agenda/Agenda.vue';
import MenuComponent from './components/menu/Menu.vue';
import PlannerComponent from './components/planner/Planner.vue';
import PlannerTableComponent from './components/planner/Table.vue';
import SettingsComponent from './components/settings/Settings.vue';
import HeaderComponent from './components/Header.vue'
import NotFoundComponent from './components/404NotFound.vue'
import ChangeUsername from './components/settings/ChangeUsername.vue';
import ChangePassword from './components/settings/ChangePassword.vue';
import DeleteAccount from "./components/settings/DeleteAccount";
import ChangeAgenda from "./components/settings/ChangeAgenda";

export const routes = [
  {
    path: '',
    name: 'menu',
    components: {
      default: MenuComponent,
      'header-top': HeaderComponent
    }
  },

  {
    path: '/agenda' ,
    name: 'agenda',
    components: {
      default: AgendaComponent,
      'header-top': HeaderComponent
    }
  },

  { path: '/planner' ,
    name: 'planner',
    components: {
      default: PlannerComponent,
      'header-top': HeaderComponent
    },
    children: [
      { path: 'table', component: PlannerTableComponent }
    ],
  },

  {
    path: '/settings' ,
    name: 'settings',
    components: {
      default: SettingsComponent,
      'header-top': HeaderComponent
    },
    children: [
      { path: 'username', component: ChangeUsername },
      { path: 'password', component: ChangePassword },
      { path: 'delete-account', component: DeleteAccount },
      { path: 'change-agenda', component: ChangeAgenda },
    ],
  },

  {
    path: '/login',
    name: 'login',
    components: {
      default: LoginComponent,
    }
  },

  {
    path: '/signup',
    name: 'signup',
    components: {
      default: SignUpComponent,
    }
  },

  {
    path: '*',
    components: {
      default: NotFoundComponent
    }
  }
];
