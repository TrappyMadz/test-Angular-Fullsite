import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Memory } from '../../games/memory/memory';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() cardNumber: string = '';
  @Input() game: Memory | null = null;
  isHidden: boolean = true;
  isFound: boolean = false;

  @Output() cardFlipped = new EventEmitter<Card>();

  flipCard(): void {
    if (this.isFound || !this.isHidden) {
      return;
    }
    this.cardFlipped.emit(this);
  }
}
