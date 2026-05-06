import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const SIGNS_KEY = 'signs_data';

const DEFAULT_SIGNS = [
  { "id": 1, "word": "oiseau", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/bird.svg" },
  { "id": 2, "word": "chat", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/cat.svg" },
  { "id": 3, "word": "chien", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/dog.svg" },
  { "id": 4, "word": "ours", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/dog.svg" },
  { "id": 5, "word": "rat", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/dog.svg" },
  { "id": 6, "word": "cheval", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/horse.svg" },
  { "id": 7, "word": "canard", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/duck.svg" },
  { "id": 8, "word": "poisson", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/dolphin-preview-png.png" },
  { "id": 9, "word": "singe", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/monkey.svg" },
  { "id": 10, "word": "panda", "category": "Animaux", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/panda.svg" },
  { "id": 11, "word": "Heureux", "category": "Sentiments", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/happy.svg" },
  { "id": 12, "word": "Triste", "category": "Sentiments", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/sad.svg" },
  { "id": 13, "word": "blesser", "category": "Sentiments", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/hurt.svg" },
  { "id": 14, "word": "excité", "category": "Sentiments", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/excited.svg" },
  { "id": 15, "word": "peur", "category": "Sentiments", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/scared.svg" },
  { "id": 16, "word": "Maman", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/mommy.svg" },
  { "id": 17, "word": "Papa", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/daddy.svg" },
  { "id": 18, "word": "grand-mère", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/grandmother.svg" },
  { "id": 19, "word": "grand-père", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/grandfather.svg" },
  { "id": 20, "word": "soeur", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/sister.svg" },
  { "id": 21, "word": "frère", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/brother.svg" },
  { "id": 22, "word": "cousin", "category": "Famille", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/cousin.svg" },
  { "id": 23, "word": "Pomme", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/apple.svg" },
  { "id": 24, "word": "Banane", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/banana.svg" },
  { "id": 25, "word": "fraise", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/strawberry.svg" },
  { "id": 26, "word": "poire", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/pear.svg" },
  { "id": 27, "word": "pasteque", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/watermelon.svg" },
  { "id": 28, "word": "ananas", "category": "Fruits", "media": "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/pineapple.svg" }
];

@Injectable({ providedIn: 'root' })
export class ProjetService {

  // Plus besoin de HttpClient — on supprime le constructor

  getSigns(): Observable<{ signs: any[] }> {
    const stored = localStorage.getItem(SIGNS_KEY);
    if (stored) {
      return of({ signs: JSON.parse(stored) });
    }
    localStorage.setItem(SIGNS_KEY, JSON.stringify(DEFAULT_SIGNS));
    return of({ signs: DEFAULT_SIGNS });
  }

  deleteSign(id: number): Observable<void> {
    const signs = this.getAll();
    const updated = signs.filter((s: any) => s.id !== id);
    localStorage.setItem(SIGNS_KEY, JSON.stringify(updated));
    return of(void 0);
  }

  addSign(sign: any): Observable<any> {
    const signs = this.getAll();
    const newSign = { ...sign, id: Date.now() };
    signs.push(newSign);
    localStorage.setItem(SIGNS_KEY, JSON.stringify(signs));
    return of(newSign);
  }

  private getAll(): any[] {
    const stored = localStorage.getItem(SIGNS_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}