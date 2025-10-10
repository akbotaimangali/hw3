import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService, Movie } from './movies.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap">
      <header class="head">
        <h2>Movies (Studio Ghibli)</h2>
        <button (click)="load()" [disabled]="loading()">Load</button>
      </header>

      <div *ngIf="loading()" class="state">Loading...</div>

      <ul class="movie-list" *ngIf="!loading() && movies().length">
        <li class="movie" *ngFor="let m of movies(); trackBy: trackId">
          <div class="title">
            <strong>{{ m.title }}</strong>
            <span class="year">({{ m.release_date }})</span>
          </div>
          <div class="sub">Director: {{ m.director }} · Runtime: {{ m.running_time }} min</div>
          <p class="desc">{{ m.description }}</p>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    .wrap { max-width: 900px; margin: 2rem auto; padding: 1rem; }
    .head { display: flex; align-items: center; gap: 1rem; justify-content: space-between; }
    .state { margin-top: .75rem; color: #555; }
    .movie-list { list-style: none; padding: 0; margin-top: 1rem; border: 1px solid #eee; border-radius: 12px; overflow: hidden; }
    .movie { padding: 1rem; border-bottom: 1px solid #eee; background: #fff; }
    .movie:last-child { border-bottom: none; }
    .title { font-size: 1.05rem; }
    .year { color: #666; margin-left: .25rem; }
    .sub { color: #555; margin-top: .25rem; font-size: .9rem; }
    .desc { margin: .5rem 0 0; color: #333; line-height: 1.45; }
    .movie:hover { background: #fafafa; }
  `]
})
export class MoviesListComponent {
  private api = inject(MoviesService);
  movies = signal<Movie[]>([]);
  loading = signal(false);

  load() {
    this.loading.set(true);
    this.api.getMovies().subscribe({
      next: films => {
        // показываем первые 12
        this.movies.set(films.slice(0, 12));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  trackId(_: number, m: Movie) { return m.id; }
}
