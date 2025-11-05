import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <nav class="container-main flex items-center justify-between h-16">
        <a routerLink="/" class="flex items-center gap-2">
          <div class="text-2xl font-bold text-saffron-500">🎵</div>
          <span class="text-xl font-bold text-slate-900">Carnatic</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <a
            routerLink="/tampura"
            routerLinkActive="border-b-2 border-saffron-500 text-saffron-500"
            class="text-slate-700 hover:text-saffron-500 transition-colors pb-1"
          >
            Tampura
          </a>
          <a
            routerLink="/thala"
            routerLinkActive="border-b-2 border-saffron-500 text-saffron-500"
            class="text-slate-700 hover:text-saffron-500 transition-colors pb-1"
          >
            Thala Meter
          </a>
          <a
            routerLink="/raga-game"
            routerLinkActive="border-b-2 border-saffron-500 text-saffron-500"
            class="text-slate-700 hover:text-saffron-500 transition-colors pb-1"
          >
            Raga Game
          </a>
          <a
            routerLink="/repository"
            routerLinkActive="border-b-2 border-saffron-500 text-saffron-500"
            class="text-slate-700 hover:text-saffron-500 transition-colors pb-1"
          >
            Repository
          </a>
        </div>

        <button
          class="md:hidden flex flex-col gap-1 cursor-pointer"
          (click)="toggleMenu()"
        >
          <span class="w-6 h-0.5 bg-slate-900 transition-all"></span>
          <span class="w-6 h-0.5 bg-slate-900 transition-all"></span>
          <span class="w-6 h-0.5 bg-slate-900 transition-all"></span>
        </button>
      </nav>

      <div *ngIf="mobileMenuOpen" class="md:hidden border-t bg-white">
        <div class="container-main py-4 flex flex-col gap-4">
          <a
            routerLink="/tampura"
            class="text-slate-700 hover:text-saffron-500 transition-colors"
            (click)="mobileMenuOpen = false"
          >
            Tampura
          </a>
          <a
            routerLink="/thala"
            class="text-slate-700 hover:text-saffron-500 transition-colors"
            (click)="mobileMenuOpen = false"
          >
            Thala Meter
          </a>
          <a
            routerLink="/raga-game"
            class="text-slate-700 hover:text-saffron-500 transition-colors"
            (click)="mobileMenuOpen = false"
          >
            Raga Game
          </a>
          <a
            routerLink="/repository"
            class="text-slate-700 hover:text-saffron-500 transition-colors"
            (click)="mobileMenuOpen = false"
          >
            Repository
          </a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
