import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center">
      <div class="container-main text-center">
        <div class="text-6xl mb-4">🎶</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-4">Coming Soon</h1>
        <p class="text-slate-600 mb-8">
          This page is being crafted with care. Continue exploring other features or visit our homepage.
        </p>
        <a routerLink="/" class="btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  `,
})
export class PlaceholderComponent {}
