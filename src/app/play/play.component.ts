import { Component } from '@angular/core';
import { PlayService } from '../services/play.service';
import { Difficulty } from '../interfaces/difficulty';
import { Router } from '@angular/router';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ThemeValue } from '../interfaces/theme';
import { Icon, IconColor } from '../interfaces/icon';
import {
  travelAndPlacesIcons,
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
  difficulty: Difficulty | null = null;
  theme: ThemeValue | null = null;
  icons: Icon[] = [];
  displayIcon: null | Icon = null;
  showImageDisplay = false;
  showIconDisplay = false;
  timeIntervalWhenSelected = 500;
  showChooseSequenceDisplay = false;
  showSelectedIcon = false;
  selectionIconColor: IconColor | null = null;
  currentRoundSequence: Icon[] = [];
  selectedIcon: Icon | null = null;
  roundNumber = 1;

  constructor(private playService: PlayService, private router: Router) {}

  ngOnInit() {
    this.difficulty = this.playService.getDifficulty();
    this.theme = this.playService.getTheme();
    if (!this.difficulty || !this.theme) {
      this.router.navigateByUrl('/home');
    } else {
      this.icons = this.getIcons(this.difficulty!.iconCount);
      this.getDisplayIcon();
      this.getInitialSequence();
    }
  }

  getInitialSequence() {
    this.playService.resetIconSequence();
    this.addRandomsToSequence(this.difficulty!.initialAmountOfIcons);
  }

  addRandomsToSequence(amountOfIconsToAdd: number) {
    for (let i = 0; i < amountOfIconsToAdd; i++) {
      this.playService.addRandomToIconSequence(this.icons);
    }
  }

  play() {
    this.showImageDisplay = true;
    this.playSequence();
    this.currentRoundSequence = this.playService.getIconSequenceClone();
  }

  playSequence(index = 0) {
    if (index < this.playService.getIconSequenceLength()) {
      this.displayIcon = this.playService.getIconSequence()[index];
      setTimeout(() => {
        this.showIconDisplay = true;
        setTimeout(() => {
          this.showIconDisplay = false;
          this.playSequence(index + 1);
        }, this.difficulty?.flickerSpeedMs);
      }, this.difficulty?.flickerSpeedMs);
    } else {
      this.showChooseSequenceDisplay = true;
    }
  }

  private getDisplayIcon() {
    this.displayIcon = this.icons[0];
  }

  private getIcons(numberOfIcons: number) {
    switch (this.theme) {
      case 'Travel': {
        return travelAndPlacesIcons.slice(0, numberOfIcons);
      }
      case 'Food': {
        return foodAndDrinkIcons.slice(0, numberOfIcons);
      }
      case 'Nature': {
        return natureIcons.slice(0, numberOfIcons);
      }
      case 'Sports': {
        return sportsIcons.slice(0, numberOfIcons);
      }
      case 'Tech': {
        return techIcons.slice(0, numberOfIcons);
      }
      default: {
        return travelAndPlacesIcons.slice(0, numberOfIcons);
      }
    }
  }

  buttonSelected(icon: Icon) {
    if (!this.showChooseSequenceDisplay) {
      return;
    }
    this.selectedIcon = icon;
    if (icon === this.currentRoundSequence[0]) {
      this.handleSelection(true);
    } else {
      this.handleSelection(false);
    }
  }

  handleSelection(correct: boolean) {
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
    this.roundNumber++;
    this.addRandomsToSequence(this.difficulty!.iconRoundIncrement);
    this.showImageDisplay = false;
    this.showIconDisplay = false;
    this.showChooseSequenceDisplay = false;
  }

  roundLoss() {
    alert('Incorrect selection (💀 on round ' + this.roundNumber + ')');
    this.router.navigateByUrl('/home');
  }
}
