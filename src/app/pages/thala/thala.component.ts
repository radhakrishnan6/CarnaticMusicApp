import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ThalaPattern {
  name: string;
  beats: number;
  description: string;
}

@Component({
  selector: 'app-thala',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-main section-spacing">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">Thala Meter (Rhythm Cycles)</h1>
      <p class="text-slate-600 mb-8 max-w-2xl">
        Master the art of tala (rhythm cycles) with our visual thala meter. Practice at any tempo and strengthen your rhythmic foundation.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Thala Display -->
        <div class="lg:col-span-2">
          <div class="card p-8 bg-gradient-soft">
            <!-- Tempo Control -->
            <div class="mb-8">
              <div class="flex items-end justify-between mb-4">
                <h3 class="text-lg font-semibold text-slate-900">Tempo</h3>
                <div class="text-right">
                  <div class="text-4xl font-bold text-saffron-500">{{ tempo() }}</div>
                  <p class="text-sm text-slate-600">BPM</p>
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                [value]="tempo()"
                (input)="setTempo($event)"
                class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div class="flex justify-between text-xs text-slate-600 mt-2">
                <span>30</span>
                <span>200</span>
              </div>
            </div>

            <!-- Pattern Selector -->
            <div class="border-t pt-8 mb-8">
              <h3 class="text-lg font-semibold text-slate-900 mb-4">Select Tala</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  *ngFor="let pattern of thalaPatterns"
                  (click)="selectThala(pattern)"
                  class="p-4 rounded-lg text-left transition-all duration-200"
                  [ngClass]="{
                    'bg-indigo-500 text-white shadow-md': selectedThala().name === pattern.name,
                    'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedThala().name !== pattern.name
                  }"
                >
                  <div class="font-semibold">{{ pattern.name }}</div>
                  <div class="text-sm opacity-75">{{ pattern.beats }} beats</div>
                </button>
              </div>
            </div>

            <!-- Visual Thala Display -->
            <div class="border-t pt-8">
              <h3 class="text-lg font-semibold text-slate-900 mb-6">Beat Cycle</h3>
              <div class="flex items-center justify-center gap-2 flex-wrap">
                <div
                  *ngFor="let beat of getBeatArray(); let i = index"
                  class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200"
                  [ngClass]="getBeadClass(i)"
                >
                  {{ i + 1 }}
                </div>
              </div>

              <!-- Play Controls -->
              <div class="flex justify-center gap-4 mt-12">
                <button
                  (click)="togglePlayback()"
                  class="btn-secondary"
                >
                  {{ isPlaying() ? '⏸ Pause' : '▶ Play' }}
                </button>
                <button
                  (click)="resetBeat()"
                  class="btn-outline"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Panel -->
        <div class="lg:col-span-1">
          <div class="card p-6 bg-terracotta-50">
            <h3 class="text-lg font-bold text-terracotta-900 mb-4">About Tala</h3>
            <p class="text-sm text-terracotta-700 mb-6">
              Tala is the rhythmic framework of Carnatic music. Each tala has a specific pattern of beats and a cycle that repeats.
            </p>

            <div class="space-y-4">
              <div class="bg-white rounded p-4">
                <h4 class="font-semibold text-terracotta-900 mb-2">Current Tala</h4>
                <div class="text-sm text-terracotta-700">
                  <p><strong>{{ selectedThala().name }}</strong></p>
                  <p>{{ selectedThala().description }}</p>
                  <p class="mt-2 text-xs">Total beats: {{ selectedThala().beats }}</p>
                </div>
              </div>

              <div class="pt-4 border-t border-terracotta-200">
                <h4 class="font-semibold text-terracotta-900 mb-2">Practice Tips</h4>
                <ul class="text-sm text-terracotta-700 space-y-2">
                  <li>✓ Start slow and gradually increase tempo</li>
                  <li>✓ Count beats aloud while practicing</li>
                  <li>✓ Focus on keeping the sam (first beat) strong</li>
                  <li>✓ Practice both singing and playing</li>
                </ul>
              </div>

              <div class="pt-4 border-t border-terracotta-200">
                <h4 class="font-semibold text-terracotta-900 mb-2">Common Talas</h4>
                <p class="text-xs text-terracotta-700">
                  Adi Tala (8 beats) and Rupaka Tala (6 beats) are the most commonly used in Carnatic music. Khanda Chapu (5 beats) is used for slower pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #6b5bff;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #6b5bff;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class ThalaComponent {
  tempo = signal(60);
  isPlaying = signal(false);
  currentBeat = signal(0);
  selectedThala = signal<ThalaPattern>({
    name: 'Adi Tala',
    beats: 8,
    description: 'The most common tala with 8 beats',
  });

  thalaPatterns: ThalaPattern[] = [
    { name: 'Adi Tala', beats: 8, description: 'Most common tala with 8 beats' },
    { name: 'Rupaka Tala', beats: 6, description: 'Six-beat tala used frequently' },
    { name: 'Khanda Chapu', beats: 5, description: 'Five-beat tala for slower pieces' },
    { name: 'Misra Chapu', beats: 7, description: 'Seven-beat tala' },
  ];

  private playbackInterval: any = null;

  getBeatArray(): number[] {
    return Array(this.selectedThala().beats).fill(0);
  }

  getBeadClass(index: number): string {
    const isCurrentBeat = index === this.currentBeat();
    const isSam = index === 0;

    if (isCurrentBeat && this.isPlaying()) {
      return 'bg-saffron-500 text-white shadow-lg scale-110';
    } else if (isSam) {
      return 'bg-indigo-500 text-white';
    } else {
      return 'bg-slate-200 text-slate-700';
    }
  }

  selectThala(pattern: ThalaPattern) {
    this.selectedThala.set(pattern);
    if (this.isPlaying()) {
      this.stopPlayback();
      this.currentBeat.set(0);
    }
  }

  setTempo(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tempo.set(parseInt(target.value));
  }

  togglePlayback() {
    if (this.isPlaying()) {
      this.stopPlayback();
    } else {
      this.startPlayback();
    }
  }

  private startPlayback() {
    this.isPlaying.set(true);
    const beatDuration = 60000 / this.tempo();

    this.playbackInterval = setInterval(() => {
      this.currentBeat.set((this.currentBeat() + 1) % this.selectedThala().beats);
    }, beatDuration);
  }

  private stopPlayback() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
    this.isPlaying.set(false);
  }

  resetBeat() {
    this.currentBeat.set(0);
    if (this.isPlaying()) {
      this.stopPlayback();
    }
  }

  ngOnDestroy() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
    }
  }
}
