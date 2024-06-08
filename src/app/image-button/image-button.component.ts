import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'image-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './image-button.component.html',
  styleUrl: './image-button.component.scss',
})
export class ImageButtonComponent {
  icon = input.required<string>();
}
