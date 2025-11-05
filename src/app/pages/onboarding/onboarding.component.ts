import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OnboardingStep {
  icon: string;
  title: string;
  description: string;
  details: string;
  buttonText: string;
  route?: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-carnatic flex items-center justify-center py-8 px-4">
      <div class="w-full max-w-2xl">
        <!-- Step Indicator -->
        <div class="flex justify-center gap-2 mb-12">
          <button
            *ngFor="let i of getStepArray()"
            (click)="currentStep.set(i)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            [ngClass]="{
              'bg-saffron-500 w-8': currentStep() === i,
              'bg-slate-300': currentStep() !== i
            }"
          ></button>
        </div>

        <!-- Content Container -->
        <div class="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div class="text-center">
            <!-- Icon -->
            <div class="text-6xl mb-6">{{ steps[currentStep()].icon }}</div>

            <!-- Title -->
            <h1 class="text-4xl font-bold text-slate-900 mb-4">
              {{ steps[currentStep()].title }}
            </h1>

            <!-- Description -->
            <p class="text-xl text-slate-600 mb-8">
              {{ steps[currentStep()].description }}
            </p>

            <!-- Details -->
            <div class="text-left bg-slate-50 rounded-lg p-6 mb-8">
              <p class="text-slate-700 text-lg leading-relaxed">
                {{ steps[currentStep()].details }}
              </p>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                *ngIf="currentStep() > 0"
                (click)="previousStep()"
                class="btn-outline"
              >
                ← Previous
              </button>

              <a
                *ngIf="currentStep() < steps.length - 1 && !steps[currentStep()].route"
                (click)="nextStep()"
                class="btn-primary cursor-pointer"
              >
                Next →
              </a>

              <a
                *ngIf="currentStep() === steps.length - 1"
                routerLink="/"
                class="btn-primary"
              >
                Get Started
              </a>

              <a
                *ngIf="steps[currentStep()].route && currentStep() < steps.length - 1"
                [routerLink]="steps[currentStep()].route"
                class="btn-secondary"
              >
                {{ steps[currentStep()].buttonText }}
              </a>
            </div>

            <!-- Skip Button -->
            <a
              routerLink="/"
              class="block mt-6 text-slate-600 hover:text-saffron-500 transition-colors"
            >
              Skip Onboarding
            </a>
          </div>
        </div>

        <!-- Progress Text -->
        <div class="text-center mt-8 text-slate-600">
          <p>Step {{ currentStep() + 1 }} of {{ steps.length }}</p>
        </div>
      </div>
    </div>
  `,
})
export class OnboardingComponent {
  currentStep = signal(0);

  steps: OnboardingStep[] = [
    {
      icon: '🎵',
      title: 'Welcome to Carnatic Music',
      description: 'Your journey into classical Indian music starts here',
      details:
        'This app is designed to help you learn, practice, and explore the rich traditions of Carnatic classical music. Whether you\'re a beginner or an experienced musician, you\'ll find tools to enhance your practice.',
      buttonText: 'Start Learning',
    },
    {
      icon: '🎹',
      title: 'Practice with Tampura',
      description: 'The drone that guides your voice',
      details:
        'The Tampura feature provides a continuous drone sound at your chosen pitch. Use it to maintain tonal accuracy, practice raag scales, and develop your ear for traditional Indian classical music. You can adjust the pitch and volume to match your voice.',
      buttonText: 'Try Tampura',
      route: '/tampura',
    },
    {
      icon: '⏱️',
      title: 'Master Rhythm with Thala Meter',
      description: 'Control and understand rhythm cycles',
      details:
        'Tala is the rhythmic framework of Carnatic music. Our Thala Meter helps you practice different rhythm cycles like Adi Tala (8 beats) and Rupaka Tala (6 beats). You can adjust the tempo and visually follow each beat.',
      buttonText: 'Explore Thala',
      route: '/thala',
    },
    {
      icon: '🎵',
      title: 'Challenge Your Knowledge',
      description: 'Identify ragas by listening',
      details:
        'Test your understanding of different ragas with our interactive game. Listen to audio clips, read musical characteristics, and try to identify the correct raga. Learn as you play with detailed explanations for each answer.',
      buttonText: 'Play Raga Game',
      route: '/raga-game',
    },
    {
      icon: '📚',
      title: 'Explore Our Repository',
      description: 'Thousands of keerthanas at your fingertips',
      details:
        'Browse our comprehensive collection of Carnatic keerthanas organized by artists, ragas, and talas. Read lyrics, listen to audio, and learn about different composers and their contributions to Carnatic music.',
      buttonText: 'Open Repository',
      route: '/repository',
    },
    {
      icon: '✨',
      title: 'Ready to Begin?',
      description: 'Your learning adventure awaits',
      details:
        'You now have access to all the tools and resources to deepen your understanding of Carnatic music. Start with Tampura to practice your pitch accuracy, use Thala Meter for rhythm training, challenge yourself with our Raga Game, or explore thousands of keerthanas.',
      buttonText: 'Get Started',
    },
  ];

  getStepArray(): number[] {
    return Array(this.steps.length)
      .fill(0)
      .map((_, i) => i);
  }

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 0) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }
}
