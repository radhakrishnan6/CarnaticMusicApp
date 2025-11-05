import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="w-full">
      <!-- Hero Section -->
      <section class="min-h-[60vh] bg-gradient-carnatic flex items-center justify-center py-12 md:py-20">
        <div class="container-main text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Experience Carnatic Music
          </h1>
          <p class="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
            Learn, practice, and explore the rich traditions of Carnatic classical music with interactive tools and a comprehensive library of keerthanas.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              routerLink="/tampura"
              class="btn-primary"
            >
              Start Learning
            </a>
            <a
              routerLink="/onboarding"
              class="btn-secondary"
            >
              🎓 Guided Tour
            </a>
            <a
              routerLink="/repository"
              class="btn-outline"
            >
              Browse Repository
            </a>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="section-spacing bg-white">
        <div class="container-main">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Explore Our Features
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let feature of features" class="card-interactive p-6">
              <div class="text-4xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ feature.title }}</h3>
              <p class="text-slate-600 text-sm mb-4">{{ feature.description }}</p>
              <a [routerLink]="feature.route" class="text-sm font-semibold" [style.color]="feature.color">
                Explore →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="section-spacing bg-slate-50">
        <div class="container-main">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-5xl font-bold text-saffron-500 mb-2">1000+</div>
              <p class="text-slate-600">Keerthanas in Repository</p>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold text-indigo-500 mb-2">50+</div>
              <p class="text-slate-600">Artists Featured</p>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold text-terracotta-500 mb-2">∞</div>
              <p class="text-slate-600">Learning Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-spacing bg-gradient-to-r from-indigo-500 to-saffron-500">
        <div class="container-main text-center text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Learn?</h2>
          <p class="text-lg mb-8 opacity-90">
            Begin your journey into the beautiful world of Carnatic music
          </p>
          <a routerLink="/tampura" class="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Get Started
          </a>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  features: Feature[] = [
    {
      icon: '🎹',
      title: 'Tampura',
      description: 'Practice with our virtual tampura drone. Control pitch and tone to enhance your practice sessions.',
      route: '/tampura',
      color: '#ff9800',
    },
    {
      icon: '⏱️',
      title: 'Thala Meter',
      description: 'Master rhythm cycles with our visual thala meter. Practice at any tempo with real-time feedback.',
      route: '/thala',
      color: '#6b5bff',
    },
    {
      icon: '🎵',
      title: 'Raga Game',
      description: 'Challenge yourself to identify ragas by listening. Learn as you play with detailed feedback.',
      route: '/raga-game',
      color: '#c97760',
    },
    {
      icon: '📚',
      title: 'Repository',
      description: 'Browse and explore our comprehensive collection of keerthanas organized by artist, raga, and tala.',
      route: '/repository',
      color: '#f4e4a6',
    },
  ];
}
