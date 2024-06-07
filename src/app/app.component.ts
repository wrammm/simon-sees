import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Value } from './interfaces/value';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simon-sees';
  value: Value = 'CAT';

  protected changeValue() {
    this.value = this.value === 'CAT' ? 'DOG' : 'CAT';
    console.log('button click this.value: ', this.value);
  }

  protected play() {
    console.log('Play');
  }
}
