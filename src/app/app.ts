import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <div class="min-h-screen bg-white flex flex-col">
      <app-header *ngIf="!isOnboardingPage()"></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-slate-900 text-white py-8 mt-12">
        <div class="container-main">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 class="font-bold mb-4">About Carnatic</h4>
              <p class="text-sm text-slate-400">
                Discover the beauty and depth of Carnatic classical music through our interactive learning platform.
              </p>
            </div>
            <div>
              <h4 class="font-bold mb-4">Features</h4>
              <ul class="text-sm text-slate-400 space-y-2">
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Tampura Drone</a></li>
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Thala Meter</a></li>
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Raga Game</a></li>
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Repository</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Learn</h4>
              <ul class="text-sm text-slate-400 space-y-2">
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Getting Started</a></li>
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Resources</a></li>
                <li><a href="#" class="hover:text-saffron-500 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Carnatic Music App. Dedicated to preserving and promoting Indian classical music.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  constructor(private router: Router) {}

  isOnboardingPage(): boolean {
    return this.router.url.includes('onboarding');
  }
}
