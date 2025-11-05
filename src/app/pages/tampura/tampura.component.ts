import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PitchOption {
  label: string;
  frequency: number;
}

@Component({
  selector: 'app-tampura',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-main section-spacing">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">Tampura (Drone)</h1>
      <p class="text-slate-600 mb-8 max-w-2xl">
        Practice with our virtual tampura drone. Adjust the pitch to match your practice needs and enhance your vocal training.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Controls -->
        <div class="lg:col-span-2">
          <div class="card p-8 bg-gradient-soft">
            <div class="flex flex-col items-center justify-center py-12">
              <div class="text-6xl mb-8">🎹</div>

              <!-- Play Button -->
              <button
                (click)="toggleDrone()"
                class="w-24 h-24 rounded-full mb-8 transition-all duration-200 flex items-center justify-center text-2xl font-bold"
                [ngClass]="{
                  'bg-saffron-500 text-white shadow-lg scale-105': isDroneActive(),
                  'bg-slate-200 text-slate-700 hover:bg-slate-300': !isDroneActive()
                }"
              >
                {{ isDroneActive() ? '⏸' : '▶' }}
              </button>

              <p class="text-lg font-semibold text-slate-900 mb-2">
                {{ isDroneActive() ? 'Drone Active' : 'Drone Off' }}
              </p>
              <p class="text-sm text-slate-600">
                {{ selectedPitch().label }} ({{ selectedPitch().frequency }} Hz)
              </p>
            </div>

            <!-- Pitch Selector -->
            <div class="mt-12 border-t pt-8">
              <h3 class="text-lg font-semibold text-slate-900 mb-6">Select Pitch</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  *ngFor="let pitch of pitchOptions"
                  (click)="setPitch(pitch)"
                  class="p-4 rounded-lg font-semibold transition-all duration-200"
                  [ngClass]="{
                    'bg-saffron-500 text-white shadow-md': selectedPitch().frequency === pitch.frequency,
                    'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedPitch().frequency !== pitch.frequency
                  }"
                >
                  {{ pitch.label }}
                </button>
              </div>
            </div>

            <!-- Volume Control -->
            <div class="mt-8 border-t pt-8">
              <h3 class="text-lg font-semibold text-slate-900 mb-6">Volume</h3>
              <div class="flex items-center gap-4">
                <span class="text-sm text-slate-600">🔇</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  [value]="volume()"
                  (input)="setVolume($event)"
                  class="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <span class="text-sm text-slate-600">🔊</span>
                <span class="w-12 text-right font-semibold text-slate-900">{{ volume() }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Panel -->
        <div class="lg:col-span-1">
          <div class="card p-6 bg-indigo-50">
            <h3 class="text-lg font-bold text-indigo-900 mb-4">About Tampura</h3>
            <p class="text-sm text-indigo-700 mb-6">
              The tampura is a traditional stringed instrument that provides a continuous drone (called "sruti") to accompany vocal and instrumental music.
            </p>

            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-indigo-900 mb-2">Tips for Practice</h4>
                <ul class="text-sm text-indigo-700 space-y-2">
                  <li>✓ Adjust pitch to match your voice range</li>
                  <li>✓ Use as a reference for maintaining pitch accuracy</li>
                  <li>✓ Practice raag identification with the drone</li>
                  <li>✓ Train your ear to recognize tonal relationships</li>
                </ul>
              </div>

              <div class="pt-4 border-t border-indigo-200">
                <h4 class="font-semibold text-indigo-900 mb-2">Common Pitches</h4>
                <p class="text-xs text-indigo-700 mb-2">Standard Indian classical music is typically performed in one of the following key frequencies:</p>
                <ul class="text-xs text-indigo-700 space-y-1">
                  <li>• C: 130.81 Hz (Lower)</li>
                  <li>• D: 146.83 Hz (Dheera Madhyam)</li>
                  <li>• E: 164.81 Hz (Standard)</li>
                </ul>
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
      background: #ff9800;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ff9800;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class TampuraComponent {
  isDroneActive = signal(false);
  volume = signal(50);
  selectedPitch = signal<PitchOption>({ label: 'C (Do)', frequency: 130.81 });

  pitchOptions: PitchOption[] = [
    { label: 'C (Do)', frequency: 130.81 },
    { label: 'D (Re)', frequency: 146.83 },
    { label: 'E (Mi)', frequency: 164.81 },
    { label: 'F (Fa)', frequency: 174.61 },
    { label: 'G (Sol)', frequency: 196.00 },
    { label: 'A (La)', frequency: 220.00 },
  ];

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window as any).AudioContext();
    }
  }

  toggleDrone() {
    if (this.isDroneActive()) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
  }

  private startDrone() {
    if (!this.audioContext) return;

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.oscillator.frequency.value = this.selectedPitch().frequency;
    this.oscillator.type = 'sine';

    this.gainNode.gain.value = (this.volume() / 100) * 0.2;

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    this.oscillator.start();
    this.isDroneActive.set(true);
  }

  private stopDrone() {
    if (this.oscillator && this.audioContext) {
      this.oscillator.stop();
      this.oscillator = null;
      this.gainNode = null;
    }
    this.isDroneActive.set(false);
  }

  setPitch(pitch: PitchOption) {
    const wasActive = this.isDroneActive();
    if (wasActive) {
      this.stopDrone();
    }

    this.selectedPitch.set(pitch);

    if (wasActive) {
      this.startDrone();
    }
  }

  setVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume.set(parseInt(target.value));

    if (this.gainNode && this.isDroneActive()) {
      this.gainNode.gain.value = (this.volume() / 100) * 0.2;
    }
  }

  ngOnDestroy() {
    if (this.isDroneActive()) {
      this.stopDrone();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
