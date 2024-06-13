import { Injectable } from '@angular/core';
import { Difficulty } from '../interfaces/difficulty';
import { ThemeValue } from '../interfaces/theme';
import { Icon } from '../interfaces/icon';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private difficulty: Difficulty | null = null;
  private theme: ThemeValue | null = null;
  private iconSequence: Icon[] = [];

  constructor() {}

  getDifficulty() {
    return this.difficulty;
  }
  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  getTheme() {
    return this.theme;
  }
  setTheme(theme: ThemeValue) {
    this.theme = theme;
  }

  getIconSequence() {
    return this.iconSequence;
  }

  getIconSequenceClone() {
    return Object.assign([], this.iconSequence);
  }

  resetIconSequence() {
    this.iconSequence = [];
  }

  getIconSequenceLength() {
    return this.iconSequence.length;
  }

  addRandomToIconSequence(icons: Icon[]) {
    this.iconSequence.push(icons[Math.floor(Math.random() * icons.length)]);
  }

  compareChosenToIconSequence(chosenIcon: Icon, chosenIndex: number) {
    return this.iconSequence[chosenIndex] === chosenIcon ? true : false;
  }
}
