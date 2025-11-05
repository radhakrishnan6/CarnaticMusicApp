import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TampuraComponent } from './pages/tampura/tampura.component';
import { ThalaComponent } from './pages/thala/thala.component';
import { RagaGameComponent } from './pages/raga-game/raga-game.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tampura', component: TampuraComponent },
  { path: 'thala', component: ThalaComponent },
  { path: 'raga-game', component: RagaGameComponent },
  { path: 'repository', component: RepositoryComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '**', component: PlaceholderComponent },
];
