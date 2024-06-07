import { Component, Input } from '@angular/core';
import { Value } from '../interfaces/value';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input({ required: true }) value: Value = 'CAT';
  constructor() {
    console.log('value from constructor: ', this.value);
  }

  public testPublic() {
    console.log('Test public');
  }

  protected test() {
    console.log('Test');
  }
}
