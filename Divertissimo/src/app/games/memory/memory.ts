import { ChangeDetectorRef, Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-game',
  imports: [Card, CommonModule, Button],
  templateUrl: './memory.html',
  styleUrl: './memory.css',
})
export class Memory {
  private cardValues: string[] = [
    'B.png',
    'C.png',
    'G.png',
    'LG.png',
    'O.png',
    'P.png',
    'Blue.png',
    'W.png',
  ];
  public cards: string[] = this.createMemoryCards(this.cardValues);
  isCardClicked: boolean = false;
  firstCard: Card | null = null;
  secondCard: Card | null = null;
  isLocked: boolean = false;
  playerTurn: number = 1;
  player1Point: number = 0;
  player2Point: number = 0;
  isGameFinished: boolean = false;
  winner: string = "It's a draw !";
  private timeoutId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  private createMemoryCards(values: string[]): string[] {
    let finalCards = [...values, ...values];
    for (let i = finalCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalCards[i], finalCards[j]] = [finalCards[j], finalCards[i]];
    }
    return finalCards;
  }

  handleCardClick(clickedCard: Card): void {
    if (
      clickedCard === this.firstCard ||
      clickedCard === this.secondCard ||
      this.isLocked === true
    ) {
      return;
    }
    clickedCard.isHidden = false;
    if (this.firstCard === null) {
      this.firstCard = clickedCard;
    } else if (this.secondCard === null) {
      this.secondCard = clickedCard;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    this.isLocked = true;
    if (this.firstCard!.cardNumber === this.secondCard!.cardNumber) {
      this.firstCard!.isFound = true;
      this.secondCard!.isFound = true;
      if (this.playerTurn == 1) {
        this.player1Point++;
      } else {
        this.player2Point++;
      }
      if (this.player1Point + this.player2Point >= 8) {
        if (this.player1Point > this.player2Point) {
          this.winner = 'Player 1 Win';
        } else if (this.player2Point > this.player1Point) {
          this.winner = 'Player 2 Win';
        }
        this.isGameFinished = true;
        return;
      }

      this.resetTurn();
    } else {
      this.timeoutId = setTimeout(() => {
        if (this.playerTurn == 1) {
          this.playerTurn = 2;
        } else {
          this.playerTurn = 1;
        }
        this.firstCard!.isHidden = true;
        this.secondCard!.isHidden = true;
        this.resetTurn();
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      }, 1000);
    }
  }

  resetTurn(): void {
    this.isLocked = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  Reload(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.player1Point = 0;
    this.player2Point = 0;
    this.playerTurn = 1;
    this.isGameFinished = false;
    this.winner = "It's a draw !";
    this.resetTurn();
    this.cards = [];
    this.cdr.detectChanges();
    this.cards = this.createMemoryCards(this.cardValues);
  }
}
