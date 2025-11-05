import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Keerthana {
  id: number;
  title: string;
  artist: string;
  raga: string;
  tala: string;
  composer: string;
  lyrics?: string;
  audioUrl?: string;
  description: string;
}

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-main section-spacing">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">Keerthana Repository</h1>
      <p class="text-slate-600 mb-8 max-w-2xl">
        Explore our comprehensive collection of Carnatic keerthanas. Filter by artist, raga, tala, or composer to find what you're looking for.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <!-- Filters -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-20">
            <h3 class="text-lg font-bold text-slate-900 mb-6">Filters</h3>

            <!-- Artist Filter -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-slate-900 mb-3">Artist</label>
              <select
                [(ngModel)]="selectedArtist"
                (change)="filterKeerthanas()"
                class="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">All Artists</option>
                <option *ngFor="let artist of uniqueArtists" [value]="artist">
                  {{ artist }}
                </option>
              </select>
            </div>

            <!-- Raga Filter -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-slate-900 mb-3">Raga</label>
              <select
                [(ngModel)]="selectedRaga"
                (change)="filterKeerthanas()"
                class="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">All Ragas</option>
                <option *ngFor="let raga of uniqueRagas" [value]="raga">
                  {{ raga }}
                </option>
              </select>
            </div>

            <!-- Tala Filter -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-slate-900 mb-3">Tala</label>
              <select
                [(ngModel)]="selectedTala"
                (change)="filterKeerthanas()"
                class="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">All Talas</option>
                <option *ngFor="let tala of uniqueTalas" [value]="tala">
                  {{ tala }}
                </option>
              </select>
            </div>

            <!-- Clear Filters -->
            <button
              (click)="clearFilters()"
              class="w-full btn-outline text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Keerthana Grid -->
        <div class="lg:col-span-3">
          <div *ngIf="filteredKeerthanas().length > 0" class="space-y-4">
            <div *ngFor="let keerthana of filteredKeerthanas()" class="card p-6 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-slate-900 mb-2">{{ keerthana.title }}</h3>
                  <p class="text-saffron-500 font-semibold mb-3">{{ keerthana.artist }}</p>

                  <div class="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p class="text-slate-600 text-xs">RAGA</p>
                      <p class="font-semibold text-slate-900">{{ keerthana.raga }}</p>
                    </div>
                    <div>
                      <p class="text-slate-600 text-xs">TALA</p>
                      <p class="font-semibold text-slate-900">{{ keerthana.tala }}</p>
                    </div>
                    <div>
                      <p class="text-slate-600 text-xs">COMPOSER</p>
                      <p class="font-semibold text-slate-900">{{ keerthana.composer }}</p>
                    </div>
                  </div>

                  <p class="text-slate-600 text-sm mb-4">{{ keerthana.description }}</p>

                  <div class="flex gap-2">
                    <button class="text-sm px-4 py-2 bg-saffron-50 text-saffron-600 rounded hover:bg-saffron-100 transition-colors">
                      🎵 Listen
                    </button>
                    <button class="text-sm px-4 py-2 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors">
                      📝 Lyrics
                    </button>
                    <button class="text-sm px-4 py-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors">
                      ℹ️ Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-center text-slate-600 text-sm py-8">
              Showing {{ filteredKeerthanas().length }} of {{ allKeerthanas.length }} keerthanas
            </p>
          </div>

          <div *ngIf="filteredKeerthanas().length === 0" class="text-center py-12">
            <p class="text-xl text-slate-600">No keerthanas found matching your filters.</p>
            <button
              (click)="clearFilters()"
              class="mt-4 text-saffron-500 hover:text-saffron-600 font-semibold"
            >
              Clear filters to see all
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RepositoryComponent {
  selectedArtist = '';
  selectedRaga = '';
  selectedTala = '';
  filteredKeerthanasList = signal<Keerthana[]>([]);

  allKeerthanas: Keerthana[] = [
    {
      id: 1,
      title: 'Jagadananda Karaka',
      artist: 'M. S. Subbulakshmi',
      raga: 'Dheerashankarabharanam',
      tala: 'Adi Tala',
      composer: 'Adi Shankaracharya',
      description: 'A devotional piece praising the compassion of Lord Krishna.',
      lyrics:
        'Jagadananda Karaka Jaya Jagadeesha Hare...',
    },
    {
      id: 2,
      title: 'Endaro Mahanubhavulu',
      artist: 'Aruna Sairam',
      raga: 'Sankarabharanam',
      tala: 'Adi Tala',
      composer: 'Adi Shankaracharya',
      description: 'A hymn celebrating great souls and their spiritual achievements.',
      lyrics: 'Endaro Mahanubhavulu Anavaniabharanam...',
    },
    {
      id: 3,
      title: 'Vathapi Ganapathim',
      artist: 'Semmangudi Srinivasa Iyer',
      raga: 'Harikambhoji',
      tala: 'Adi Tala',
      composer: 'Muthuswami Dikshitar',
      description: 'A popular composition honoring Lord Ganesha.',
      lyrics: 'Vathapi Ganapathim Bhaje Sumedhasam...',
    },
    {
      id: 4,
      title: 'Teliyaleru',
      artist: 'Veena Janakiraman',
      raga: 'Bhairavi',
      tala: 'Adi Tala',
      composer: 'Patnam Subrahmanya Iyer',
      description: 'A moving composition about the divine nature of Shiva.',
      lyrics: 'Teliyaleru Charana Sevanaya...',
    },
    {
      id: 5,
      title: 'Narayana Iyya',
      artist: 'Padma Subrahmanyam',
      raga: 'Kalyani',
      tala: 'Rupaka Tala',
      composer: 'Papanasam Sivan',
      description: 'A hymn praising the glory of Lord Narayana.',
      lyrics: 'Narayana Iyya Narayana Charanam...',
    },
    {
      id: 6,
      title: 'Kachcha Meera',
      artist: 'Lata Mangeshkar',
      raga: 'Yaman',
      tala: 'Khanda Chapu',
      composer: 'Traditional',
      description: 'A devotional piece about the saint Meera and her love for Lord Krishna.',
      lyrics: 'Kachcha Meera Hari Pyasi...',
    },
  ];

  get uniqueArtists(): string[] {
    return [...new Set(this.allKeerthanas.map((k) => k.artist))].sort();
  }

  get uniqueRagas(): string[] {
    return [...new Set(this.allKeerthanas.map((k) => k.raga))].sort();
  }

  get uniqueTalas(): string[] {
    return [...new Set(this.allKeerthanas.map((k) => k.tala))].sort();
  }

  constructor() {
    this.filterKeerthanas();
  }

  filterKeerthanas() {
    const filtered = this.allKeerthanas.filter((keerthana) => {
      const matchesArtist = !this.selectedArtist || keerthana.artist === this.selectedArtist;
      const matchesRaga = !this.selectedRaga || keerthana.raga === this.selectedRaga;
      const matchesTala = !this.selectedTala || keerthana.tala === this.selectedTala;

      return matchesArtist && matchesRaga && matchesTala;
    });

    this.filteredKeerthanasList.set(filtered);
  }

  filteredKeerthanas(): Keerthana[] {
    return this.filteredKeerthanasList();
  }

  clearFilters() {
    this.selectedArtist = '';
    this.selectedRaga = '';
    this.selectedTala = '';
    this.filterKeerthanas();
  }
}
