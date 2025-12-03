import { Component } from '@angular/core';
import { GameCard } from '../components/game-card/game-card';

@Component({
  selector: 'app-games',
  imports: [GameCard],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games {}
