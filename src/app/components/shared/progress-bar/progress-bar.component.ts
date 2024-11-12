import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() status: string = 'Agendado';
  @Input() linkFoto: string = '';



  acessarFotos() {
  if (this.linkFoto) {
    window.open(this.linkFoto, '_blank');
  } else {
    console.error('Link de foto não disponível.');
  }
}
}
