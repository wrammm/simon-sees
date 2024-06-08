import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Level } from '../interfaces/level';
import { PlayService } from '../services/play.service';
import { ThemeValue, Theme } from '../interfaces/theme';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  levels: Level[] = ['Easy', 'Medium', 'Hard', 'Expert'];
  selectedLevel: Level = 'Easy';

  themes: Theme[] = [
    { value: 'Animal', displayValue: 'Animal' },
    { value: 'Food', displayValue: 'Food and Drinks' },
    { value: 'Nature', displayValue: 'Nature' },
    { value: 'Sports', displayValue: 'Sports' },
    { value: 'Tech', displayValue: 'Tech' },
  ];
  selectedTheme: ThemeValue = this.themes[0].value;

  constructor(private playService: PlayService, private router: Router) {}

  protected play() {
    this.playService.setDifficulty(this.selectedLevel);
    this.playService.setTheme(this.selectedTheme);
    this.router.navigateByUrl('/play');
  }
}
