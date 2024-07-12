import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BadWordService {
  private badWordsUrl = 'assets/bad-words.json';
  private badWords: string[] = [];

  constructor(private http: HttpClient) { 
    this.loadBadWords();
  }

  private loadBadWords(): void {
    this.http.get<any>(this.badWordsUrl).subscribe(
      data => {
        this.badWords = data.badWords;
      },
      error => {
        console.error('Error loading bad words:', error);
        // Handle error loading bad words
      }
    );
  }

  filterBadWords(text: string): string {
    if (!text || text.trim().length === 0) {
      return text;
    }
    let filteredText = text;
    this.badWords.forEach(badWord => {
      const regex = new RegExp('\\b' + badWord + '\\b', 'gi');
      filteredText = filteredText.replace(regex, '***'); // Replace bad words with ***
    });
    return filteredText;
  }
}
