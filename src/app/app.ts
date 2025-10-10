import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // для *ngIf
import { FormsModule } from '@angular/forms';     // для [(ngModel)]
import { MoviesListComponent } from './movies-list.component'; // новый компонент

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MoviesListComponent], // без await import
  template: `
    <section class="about">
      <div class="about-card">
        <!-- Фото -->
        <img class="about-img" [src]="photoUrl" [alt]="title" />

        <div class="about-content">
          <h1 class="about-title">{{ title }}</h1>
          <p class="about-text">{{ mission }}</p>

          <!-- Кнопки лайков -->
          <div class="actions">
            <button class="btn" (click)="like()" [class.highlight]="likes >= 5">Like</button>
            <span class="likes">Likes: {{ likes }}</span>

            <button class="btn outline" (click)="toggleThanks()">
              {{ showThanks ? 'Hide' : 'Show' }} message
            </button>

            <button class="btn outline" (click)="resetLikes()" [disabled]="likes === 0">
              Reset Likes
            </button>
          </div>

          <p *ngIf="showThanks" class="thanks">Thank you for visiting!</p>

          <hr class="divider" />

          <!-- Форма -->
          <div class="form-row">
            <label for="name">Your name:</label>
            <input id="name" type="text" [(ngModel)]="name" placeholder="Enter your name" />
          </div>
          <p class="preview" *ngIf="name">Hello, {{ name }}!</p>

          <div class="form-row">
            <label for="email">Email:</label>
            <input id="email" type="email" [(ngModel)]="email" placeholder="name@email.com" />
          </div>
          <button class="btn" (click)="subscribe()" [disabled]="!email">Subscribe</button>

          <p class="success" *ngIf="subscribed && email">
            Thanks, <strong>{{ email }}</strong>, we’ll be in touch!
          </p>

          <div class="links">
            <a class="link" href="https://t.me/botaa06" target="_blank" rel="noopener">Telegram</a>
            <a class="link" href="mailto:imangaliakbota@gmail.com" target="_blank" rel="noopener">Email</a>
            <a class="link" href="https://github.com/akbotaimangali" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </section>

    <!-- HW4 Movies List -->
    <app-movies-list></app-movies-list>
  `,
  styles: [`
    .about { min-height: 100dvh; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .about-card { max-width: 720px; background: #fff; padding: 28px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,.1); text-align: center; }
    .about-img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; box-shadow: 0 8px 18px rgba(0,0,0,.15); margin-bottom: 16px; }
    .about-title { font-size: 1.8rem; color: #4e342e; margin: .2rem 0 .6rem; }
    .about-text { color: #5c4033; line-height: 1.6; margin: 0 0 12px; }
    .actions { display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap; margin: 12px 0; }
    .btn { background: #457b9d; color: #fff; border: none; border-radius: 10px; padding: 10px 16px; cursor: pointer; transition: .15s; }
    .btn:hover { transform: translateY(-1px); opacity: .95; }
    .btn.outline { background: transparent; color: #457b9d; border: 2px solid #457b9d; }
    .likes { min-width: 90px; font-weight: 600; }
    .highlight { box-shadow: 0 0 0 4px rgba(255,184,0,.5), 0 6px 14px rgba(0,0,0,.15); transform: translateY(-1px); }
    .thanks { margin: 8px 0 0; color: #6b4f4f; }
    .divider { margin: 16px 0; border: none; height: 1px; background: #eee; }
    .form-row { display: flex; gap: 10px; justify-content: center; align-items: center; margin: 8px 0; }
    .form-row input { padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; min-width: 240px; }
    .preview { margin: 0 0 6px; color: #333; }
    .success { margin: 12px 0 0; color: #2b7a0b; }
    .links { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
    .link { color: #457b9d; text-decoration: none; font-weight: 600; }
    .link:hover { text-decoration: underline; }
  `]
})
export class App {
  title = 'About Our Team';
  mission = 'We are a group of passionate students from KBTU, majoring in Information Systems. We love exploring new technologies, building creative projects, and growing as a team.';
  photoUrl = 'assets/graduation.png';
  likes = 0;
  showThanks = false;
  name = '';
  email = '';
  subscribed = false;

  like() { this.likes++; }
  toggleThanks() { this.showThanks = !this.showThanks; }
  resetLikes() { this.likes = 0; }

  subscribe() {
    if (!this.email) { this.subscribed = false; return; }
    this.subscribed = true;
  }
}
