import { Component } from '@angular/core';
import { PlayService } from '../services/play.service';
import { Level } from '../interfaces/level';
import { Router } from '@angular/router';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ThemeValue } from '../interfaces/theme';
import { Icon } from '../interfaces/icon';
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
  showChooseSequenceDisplay = false;

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
    // this.playService.getIconSequence().forEach(iconFromSequence => {
    //   this.displayIcon = iconFromSequence;
    //   setTimeout(() => {
    //     this.showIconDisplay = true;
    //     setTimeout(() => {
    //       this.showIconDisplay = false;
    //     }, this.timeInterval);
    //   }, this.timeInterval);
    // });
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
    console.log('buttonSelected: ', icon);
  }
}
