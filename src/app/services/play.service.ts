import { Injectable } from '@angular/core';
import { Level } from '../interfaces/level';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  private difficulty: Level | null = null;

  constructor() { }

  getDifficulty() {
    return this.difficulty;
  }
  setDifficulty(difficulty: Level) {
    this.difficulty = difficulty;
  }
}
