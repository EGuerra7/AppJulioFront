import { AfterViewChecked, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
  private scrollRevealInitialized = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollRevealInitialized = false;
        this.initScrollReveal();
      });
  }

  ngAfterViewChecked() {
    if (!this.scrollRevealInitialized) {
      this.initScrollReveal();
    }
  }

  async initScrollReveal() {
    if (typeof window != 'undefined') {
      const ScrollReveal = (await import('scrollreveal')).default;

      const sr = ScrollReveal({
        distance: '20px',
        duration: 1000
      });

      sr.reveal('.feed_section', { origin: 'left', interval: 1000, delay:1300} );
      sr.reveal('.fotos_subclass', { origin: 'bottom', interval: 1000, delay: 1000});
      sr.reveal('.cupons_section', { origin: 'bottom', interval: 1000, delay: 300});
      

      this.scrollRevealInitialized = true; // Marcar como inicializado
    }
  }
}

