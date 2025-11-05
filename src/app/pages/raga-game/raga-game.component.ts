import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RagaQuiz {
  id: number;
  name: string;
  description: string;
  characteristics: string[];
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-raga-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-main section-spacing">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">Raga Identification Game</h1>
      <p class="text-slate-600 mb-8 max-w-2xl">
        Test your knowledge of Carnatic ragas. Listen to audio clips and try to identify the raga by its unique characteristics.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Game Panel -->
        <div class="lg:col-span-2">
          <div class="card p-8 bg-gradient-soft">
            <!-- Score -->
            <div class="mb-8">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm text-slate-600">Score</p>
                  <p class="text-3xl font-bold text-saffron-500">{{ score() }}/{{ ragas.length }}</p>
                </div>
                <div>
                  <p class="text-sm text-slate-600">Question</p>
                  <p class="text-3xl font-bold text-indigo-500">{{ currentQuestionIndex() + 1 }}/{{ ragas.length }}</p>
                </div>
              </div>
            </div>

            <!-- Current Question -->
            <div *ngIf="!gameFinished()" class="border-t pt-8">
              <h3 class="text-lg font-semibold text-slate-900 mb-4">Identify this Raga:</h3>

              <!-- Audio Player -->
              <div class="bg-white rounded-lg p-6 mb-6 flex items-center justify-center">
                <button
                  (click)="playAudio()"
                  class="w-16 h-16 rounded-full bg-saffron-500 text-white flex items-center justify-center text-2xl hover:bg-saffron-600 transition-colors"
                >
                  🔊
                </button>
              </div>

              <!-- Characteristics -->
              <div class="mb-6 p-4 bg-indigo-50 rounded-lg">
                <h4 class="font-semibold text-indigo-900 mb-3">Characteristics:</h4>
                <ul class="text-sm text-indigo-700 space-y-1">
                  <li *ngFor="let char of currentRaga().characteristics">• {{ char }}</li>
                </ul>
              </div>

              <!-- Answer Options -->
              <div class="space-y-3">
                <button
                  *ngFor="let option of currentRaga().options"
                  (click)="selectAnswer(option)"
                  class="w-full p-4 rounded-lg text-left font-semibold transition-all duration-200"
                  [ngClass]="{
                    'bg-green-500 text-white': userAnswers()[currentQuestionIndex()] === option && currentRaga().correctAnswer === option,
                    'bg-red-500 text-white': userAnswers()[currentQuestionIndex()] === option && currentRaga().correctAnswer !== option,
                    'bg-slate-100 text-slate-700 hover:bg-slate-200': !userAnswers()[currentQuestionIndex()],
                    'opacity-50': userAnswers()[currentQuestionIndex()] && userAnswers()[currentQuestionIndex()] !== option,
                  }"
                  [disabled]="!!userAnswers()[currentQuestionIndex()]"
                >
                  {{ option }}
                </button>
              </div>

              <!-- Explanation -->
              <div *ngIf="userAnswers()[currentQuestionIndex()]" class="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-2">
                  {{ userAnswers()[currentQuestionIndex()] === currentRaga().correctAnswer ? '✓ Correct!' : '✗ Incorrect' }}
                </h4>
                <p class="text-sm text-blue-700">
                  {{ currentRaga().description }}
                </p>
              </div>

              <!-- Next Button -->
              <div *ngIf="userAnswers()[currentQuestionIndex()]" class="mt-6">
                <button
                  (click)="nextQuestion()"
                  class="w-full btn-primary"
                >
                  {{ currentQuestionIndex() === ragas.length - 1 ? 'Finish Game' : 'Next Question' }}
                </button>
              </div>
            </div>

            <!-- Game Finished Screen -->
            <div *ngIf="gameFinished()" class="text-center py-12">
              <div class="text-6xl mb-6">
                {{ score() > (ragas.length * 0.7) ? '🎉' : score() > (ragas.length * 0.5) ? '👍' : '💪' }}
              </div>
              <h2 class="text-3xl font-bold text-slate-900 mb-4">Game Complete!</h2>
              <p class="text-2xl font-bold text-saffron-500 mb-2">{{ score() }}/{{ ragas.length }} Correct</p>
              <p class="text-slate-600 mb-8">
                {{ getPerformanceMessage() }}
              </p>
              <button
                (click)="resetGame()"
                class="btn-secondary"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>

        <!-- Info Panel -->
        <div class="lg:col-span-1">
          <div class="card p-6 bg-gold-50">
            <h3 class="text-lg font-bold text-amber-900 mb-4">About Ragas</h3>
            <p class="text-sm text-amber-700 mb-6">
              A raga is a melodic framework for improvisation in Carnatic music. Each raga has its own unique emotional character (rasa).
            </p>

            <div class="space-y-4">
              <div class="bg-white rounded p-4">
                <h4 class="font-semibold text-amber-900 mb-2">How to Play</h4>
                <ol class="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                  <li>Listen to the raga clip carefully</li>
                  <li>Read the characteristics provided</li>
                  <li>Choose the correct raga name</li>
                  <li>Learn from the feedback</li>
                </ol>
              </div>

              <div class="pt-4 border-t border-gold-200">
                <h4 class="font-semibold text-amber-900 mb-2">Raga Elements</h4>
                <ul class="text-xs text-amber-700 space-y-1">
                  <li>• <strong>Arohanam:</strong> Ascending notes</li>
                  <li>• <strong>Avarohanam:</strong> Descending notes</li>
                  <li>• <strong>Janaka Raga:</strong> Parent raga</li>
                  <li>• <strong>Rasa:</strong> Emotional essence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RagaGameComponent {
  score = signal(0);
  currentQuestionIndex = signal(0);
  gameFinished = signal(false);
  userAnswers = signal<(string | null)[]>(Array(9).fill(null));

  ragas: RagaQuiz[] = [
    {
      id: 1,
      name: 'Bhairavi',
      description:
        'Bhairavi is one of the most important ragas in Carnatic music. It is expressive and can convey both devotional and romantic emotions.',
      characteristics: [
        'Arohanam: S R2 G2 M1 P D2 N2 S',
        'All swaras (notes) present',
        'Predominantly melancholic and devotional',
      ],
      options: ['Bhairavi', 'Dheerashankarabharanam', 'Kharaharapriya', 'Sankarabharanam'],
      correctAnswer: 'Bhairavi',
    },
    {
      id: 2,
      name: 'Dheerashankarabharanam',
      description:
        'A pentatonic raga with a serene and peaceful character. It is often used for devotional pieces and is very popular in Carnatic classical music.',
      characteristics: [
        'Five-note raga (pentatonic)',
        'Notes: S R2 G3 P D2 S',
        'Peaceful and serene',
      ],
      options: ['Bhairavi', 'Dheerashankarabharanam', 'Hindolam', 'Mohanam'],
      correctAnswer: 'Dheerashankarabharanam',
    },
    {
      id: 3,
      name: 'Kalyani',
      description:
        'An ancient and important raga known for its bright and majestic character. Often used in morning concerts and devotional pieces.',
      characteristics: [
        'Arohanam: S R2 G3 M2 P D2 N3 S',
        'Sharp fourth (M2) creates distinctive character',
        'Bright and majestic',
      ],
      options: ['Kalyani', 'Kharaharapriya', 'Shankarabharanam', 'Chakravakam'],
      correctAnswer: 'Kalyani',
    },
    {
      id: 4,
      name: 'Kharaharapriya',
      description:
        'A versatile and important raga used in both classical and devotional music. It has a balanced character with both cheerful and contemplative aspects.',
      characteristics: [
        'All seven notes present',
        'Arohanam: S R2 G3 M1 P D2 N3 S',
        'Versatile and balanced',
      ],
      options: ['Bhairavi', 'Kharaharapriya', 'Sankarabharanam', 'Mohanam'],
      correctAnswer: 'Kharaharapriya',
    },
    {
      id: 5,
      name: 'Sankarabharanam',
      description:
        'Similar to the Western major scale, this raga is very popular and used frequently. It has a bright and cheerful character.',
      characteristics: [
        'All seven notes present',
        'Arohanam: S R2 G3 M1 P D2 N3 S',
        'Bright and cheerful',
      ],
      options: ['Sankarabharanam', 'Dheerashankarabharanam', 'Kalyani', 'Vanaspati'],
      correctAnswer: 'Sankarabharanam',
    },
    {
      id: 6,
      name: 'Mohanam',
      description:
        'A pentatonic raga known for its profound beauty and contemplative character. It is frequently used in devotional music.',
      characteristics: [
        'Five-note raga (pentatonic)',
        'Notes: S R2 G3 P D2 S',
        'Contemplative and profound',
      ],
      options: ['Mohanam', 'Hindolam', 'Bhairavi', 'Chakravakam'],
      correctAnswer: 'Mohanam',
    },
    {
      id: 7,
      name: 'Hindolam',
      description:
        'A pentatonic raga with a sweet and tender character. It is often used for devotional pieces and has a meditative quality.',
      characteristics: [
        'Five-note raga (pentatonic)',
        'Notes: S R3 G3 P D3 S',
        'Sweet and tender',
      ],
      options: ['Hindolam', 'Mohanam', 'Suddha Saveri', 'Chakravakam'],
      correctAnswer: 'Hindolam',
    },
    {
      id: 8,
      name: 'Harikambhoji',
      description:
        'An important raga with all seven notes, known for its versatility. It has both devotional and classical aspects.',
      characteristics: [
        'All seven notes present',
        'Arohanam: S R2 G3 M1 P D2 N2 S',
        'Versatile and devotional',
      ],
      options: ['Harikambhoji', 'Kharaharapriya', 'Sankarabharanam', 'Kalyani'],
      correctAnswer: 'Harikambhoji',
    },
    {
      id: 9,
      name: 'Yaman Kalyan',
      description:
        'A raga similar to Kalyani but with subtle differences. It has a bright and devotional character.',
      characteristics: [
        'Sharp fourth (M2) and natural seventh',
        'Bright and devotional',
        'Often heard in classical concerts',
      ],
      options: ['Yaman Kalyan', 'Kalyani', 'Kharaharapriya', 'Sankarabharanam'],
      correctAnswer: 'Yaman Kalyan',
    },
  ];

  currentRaga(): RagaQuiz {
    return this.ragas[this.currentQuestionIndex()];
  }

  playAudio() {
    // Placeholder for audio playback
    alert(`Playing audio for ${this.currentRaga().name}`);
  }

  selectAnswer(option: string) {
    const answers = this.userAnswers();
    answers[this.currentQuestionIndex()] = option;
    this.userAnswers.set([...answers]);

    if (option === this.currentRaga().correctAnswer) {
      this.score.set(this.score() + 1);
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex() < this.ragas.length - 1) {
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
    } else {
      this.gameFinished.set(true);
    }
  }

  resetGame() {
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.gameFinished.set(false);
    this.userAnswers.set(Array(this.ragas.length).fill(null));
  }

  getPerformanceMessage(): string {
    const percentage = (this.score() / this.ragas.length) * 100;
    if (percentage >= 80) {
      return 'Excellent! You have a great ear for Carnatic ragas!';
    } else if (percentage >= 60) {
      return 'Good job! Keep practicing to improve your raga identification skills.';
    } else if (percentage >= 40) {
      return 'Nice effort! Continue learning about different ragas.';
    } else {
      return 'Keep practicing! Every attempt helps you learn more about Carnatic ragas.';
    }
  }
}
