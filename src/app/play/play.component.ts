import { Component } from '@angular/core';
import { PlayService } from '../services/play.service';
import { Level } from '../interfaces/level';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent {

  difficulty: Level | null = null;

  constructor(private playService: PlayService, private router: Router) {}

  ngOnInit() {
    this.difficulty = this.playService.getDifficulty();
    if(!this.difficulty) {
      this.router.navigateByUrl('/home');
    }
  }
}
