import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Leaderboard } from './leaderboard/leaderboard';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Games } from './games/games';
import { Memory } from './games/memory/memory';
import { Norris } from './games/norris/norris';
import { Name } from './games/name/name';
import { NotFound } from './errors/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Divertissimo - Accueil',
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'leaderboard',
    component: Leaderboard,
    title: 'Divertissimo - Classement',
  },
  {
    path: 'login',
    component: Login,
    title: 'Divertissimo - Connexion',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Divertissimo - Profile',
  },
  {
    path: 'games',
    component: Games,
    title: 'Divertissimo - Jeux',
  },
  {
    path: 'games/memory',
    component: Memory,
    title: 'Divertissimo - Memory',
  },
  {
    path: 'memory',
    redirectTo: 'games/memory',
  },
  {
    path: 'games/norris',
    component: Norris,
    title: 'Divertissimo - Norris',
  },
  {
    path: 'norris',
    redirectTo: 'games/norris',
  },
  {
    path: 'games/name',
    component: Name,
    title: 'Divertissimo - Name',
  },
  {
    path: 'name',
    redirectTo: 'games/name',
  },
  {
    path: '**',
    component: NotFound,
    title: 'Divertissimo - 404',
  },
];
