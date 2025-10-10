import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: string;
  title: string;
  description: string;
  director: string;
  release_date: string;
  running_time: string;
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private http = inject(HttpClient);
  private readonly BASE = 'https://ghibliapi.vercel.app';

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.BASE}/films`);
  }
}

