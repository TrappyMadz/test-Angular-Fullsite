import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { createStore, Store, withProps, setProp, select } from '@ngneat/elf';

export interface JokeState {
  currentJoke: string;
  error: string | null;
}

const initialJokeState: JokeState = {
  currentJoke: 'Please wait...',
  error: null,
};

const jokeStore = createStore({ name: 'Joke' }, withProps<JokeState>(initialJokeState));

export const currentJoke$ = jokeStore.pipe(select((state) => state.currentJoke));

@Injectable({
  providedIn: 'root',
})
export class JokeListService {
  private http = inject(HttpClient);
  constructor() {
    this.setJoke();
  }

  setJoke() {
    jokeStore.update(setProp('error', null));
    this.http
      .get<any>('https://api.chucknorris.io/jokes/random')
      .pipe(
        tap((response) => {
          jokeStore.update(setProp('currentJoke', response.value));
        }),
        catchError((err) => {
          jokeStore.update(setProp('error', 'Error while loading a joke'));
          return of();
        })
      )
      .subscribe();
  }

  public searchJoke(searchTerm: String) {
    jokeStore.update(setProp('error', null));

    this.http
      .get<any>('https://api.chucknorris.io/jokes/search?query=' + searchTerm)
      .pipe(
        map((response) => {
          if (response.total === 0) {
            jokeStore.update(setProp('currentJoke', 'No results.'));
          } else {
            const resultArray = response.result;
            const arraySize = response.total;
            const randomIndex = Math.floor(Math.random() * response.total);
            const joke = resultArray[randomIndex].value;
            jokeStore.update(setProp('currentJoke', joke));
          }
        }),
        catchError((err) => {
          jokeStore.update(setProp('error', 'Error while loading results'));
          return of();
        })
      )
      .subscribe();
  }

  public clearSearchResult() {
    jokeStore.update(setProp('currentJoke', ''));
  }
}
