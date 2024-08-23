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

  previousIconAdded: Icon | null = null;
  addRandomToIconSequence(icons: Icon[]) {
    let iconToAdd: Icon | null = null;
    let isPrev = true;
    while(isPrev) {
      iconToAdd = icons[Math.floor(Math.random() * icons.length)];
      isPrev = iconToAdd === this.previousIconAdded ? true : false;
    }
    if(iconToAdd) {
      this.previousIconAdded = iconToAdd;
      this.iconSequence.push(iconToAdd);
    }
    
  }

  compareChosenToIconSequence(chosenIcon: Icon, chosenIndex: number) {
    return this.iconSequence[chosenIndex] === chosenIcon ? true : false;
  }
}
