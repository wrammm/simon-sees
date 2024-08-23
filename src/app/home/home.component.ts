import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Difficulty } from '../interfaces/difficulty';
import { PlayService } from '../services/play.service';
import { ThemeValue, Theme } from '../interfaces/theme';
import { Levels } from '../data/difficulties';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  levels: Difficulty[] = Levels;
  selectedLevel: Difficulty = this.levels[0];

  themes: Theme[] = [
    { value: 'Travel', displayValue: 'Travel' },
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
