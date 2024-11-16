import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cupons',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './cupons.component.html',
  styleUrl: './cupons.component.css'
})
export class CuponsComponent {

}
