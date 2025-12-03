import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() buttonText: string = 'This is a button';
  @Input() buttonLink: string | null = null;
}
