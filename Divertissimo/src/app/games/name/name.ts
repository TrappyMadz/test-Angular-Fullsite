import { Component } from '@angular/core';

@Component({
  selector: 'app-name',
  imports: [],
  templateUrl: './name.html',
  styleUrl: './name.css',
})
export class Name {
  userName: string = '';
  onKey(event: any) {
    this.userName = event.target.value;
  }
}
