import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { currentJoke$, JokeListService } from './norris.service';
import { Button } from '../../components/button/button';
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-norris',
  imports: [CommonModule, Button, SearchBar],
  templateUrl: './norris.html',
  styleUrl: './norris.css',
})
export class Norris {
  private jokeService = inject(JokeListService);
  joke$: Observable<String> = currentJoke$;
  fetchNewJoke(): void {
    this.jokeService.setJoke();
  }
  fetchSearchJoke(term: string): void {
    this.jokeService.searchJoke(term);
  }
}
