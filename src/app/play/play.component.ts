import { Component } from '@angular/core';
import { PlayService } from '../services/play.service';
import { Level } from '../interfaces/level';
import { Router } from '@angular/router';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ThemeValue } from '../interfaces/theme';
import { Icon, IconColor } from '../interfaces/icon';
import {
  animalIcons,
  foodAndDrinkIcons,
  natureIcons,
  sportsIcons,
  techIcons,
} from '../data/icons';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [ImageButtonComponent, ImageDisplayComponent, MatButtonModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent {
  difficulty: Level | null = null;
  theme: ThemeValue | null = null;
  icons: Icon[] = [];
  displayIcon: null | Icon = null;
  amountInSequence = 3;
  showImageDisplay = false;
  showIconDisplay = false;
  timeInterval = 1000;
  timeIntervalWhenSelected = 500;
  showChooseSequenceDisplay = false;
  showSelectedIcon = false;
  selectionIconColor: IconColor | null = null;
  currentRoundSequence: Icon[] = [];
  selectedIcon: Icon | null = null;

  constructor(private playService: PlayService, private router: Router) {}

  ngOnInit() {
    this.difficulty = this.playService.getDifficulty();
    this.theme = this.playService.getTheme();
    if (!this.difficulty || !this.theme) {
      this.router.navigateByUrl('/home');
    }
    this.icons = this.getIcons();
    this.getDisplayIcon();
    this.getInitialSequence();
  }

  getInitialSequence() {
    this.playService.resetIconSequence();
    for (let i = 0; i < this.amountInSequence; i++) {
      console.log('addRandomToIconSequence');
      this.playService.addRandomToIconSequence(this.icons);
    }
    console.log('initial sequence: ', this.playService.getIconSequence());
  }

  play() {
    this.showImageDisplay = true;
    this.playSequence();
    this.currentRoundSequence = this.playService.getIconSequenceClone();
  }

  playSequence(index = 0) {
    console.log('playSequence: ', index);
    if (index < this.playService.getIconSequenceLength()) {
      this.displayIcon = this.playService.getIconSequence()[index];
      setTimeout(() => {
        this.showIconDisplay = true;
        setTimeout(() => {
          this.showIconDisplay = false;
          this.playSequence(index + 1);
        }, this.timeInterval);
      }, this.timeInterval);
    } else {
      this.showChooseSequenceDisplay = true;
    }
  }

  private getDisplayIcon() {
    this.displayIcon = this.icons[0];
  }

  private getIcons() {
    switch (this.theme) {
      case 'Animal': {
        return animalIcons;
      }
      case 'Food': {
        return foodAndDrinkIcons;
      }
      case 'Nature': {
        return natureIcons;
      }
      case 'Sports': {
        return sportsIcons;
      }
      case 'Tech': {
        return techIcons;
      }
      default: {
        return animalIcons;
      }
    }
  }

  buttonSelected(icon: Icon) {
    if (!this.showChooseSequenceDisplay) {
      return;
    }
    this.selectedIcon = icon;
    console.log('this.selectedIcon: ', this.selectedIcon);
    if (icon === this.currentRoundSequence[0]) {
      this.handleSelection(true);
    } else {
      this.handleSelection(false);
    }
  }

  handleSelection(correct: boolean) {
    console.log('currentRoundSequence: ', this.currentRoundSequence);
    this.selectionIconColor = correct ? 'Green' : 'Red';
    this.showSelectedIcon = true;
    this.showChooseSequenceDisplay = false;
    setTimeout(() => {
      this.showSelectedIcon = false;
      this.showChooseSequenceDisplay = true;
      if (correct) {
        this.currentRoundSequence.shift();
        if (this.currentRoundSequence.length === 0) {
          this.roundWin();
        }
      } else {
        this.roundLoss();
      }
    }, this.timeIntervalWhenSelected);
  }

  roundWin() {
    alert('Round win!');
    this.playService.addRandomToIconSequence(this.icons);
    this.showImageDisplay = false;
    this.showIconDisplay = false;
    this.showChooseSequenceDisplay = false;
  }

  roundLoss() {
    alert('Incorrect');
    this.router.navigateByUrl('/home');
  }
}
