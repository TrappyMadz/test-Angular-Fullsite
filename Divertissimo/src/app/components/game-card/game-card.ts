import { Component, Input } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-game-card',
  imports: [Button],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  @Input() imageUrl: String = '';
  @Input() title: String = 'placeholder title';
  @Input() desc: String = 'placeholder description';
  @Input() gameLink: String = 'games';
}
