import { Component, inject, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'quiz',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class Quiz implements OnInit {

  private router = inject(Router);
  
  constructor(
    private projetService: ProjetService,
    private authService: AuthService
  ) {}


  signs: any[] = [];
  filteredSigns: any[] = [];

  categories = ["Animaux", "Sentiments", "Famille", "Fruits"];

  quizStarted = false;
  selectedCategory: string | null = null;
  currentQuestion: any = null;
  choices: string[] = [];

  questionNumber = 0;
  totalQuestions = 5;
  score = 0;

  resultDetails: any[] = [];
  showResultCard = false;

  savedScores: any = {
    Animaux: 0,
    Sentiments: 0,
    Famille: 0,
    Fruits: 0,
    Total: 0
  };

  ngOnInit(): void {
    this.projetService.getSigns().subscribe( {
      next:(data)=>{
      this.signs = data["signs"];
      this.startTest("Animaux");
      },
        error: (err) => {
      console.error('Erreur lors du chargement des signs', err);
        }
    });
    this.loadScores();
  }

  startTest(category: string) {
    this.selectedCategory = category;
    this.quizStarted = true;
    this.showResultCard = false;

    this.filteredSigns = this.signs.filter(s => s.category === category);

    this.score = 0;
    this.questionNumber = 0;
    this.resultDetails = [];
    this.loadNextQuestion();
  }
  

  loadNextQuestion() {
    if (this.questionNumber >= this.totalQuestions) {
      this.finishQuiz();
      return;
    }

    this.questionNumber++;
    this.currentQuestion =
      this.filteredSigns[Math.floor(Math.random() * this.filteredSigns.length)];

    this.generateChoices();
  }

  generateChoices() {
    const set = new Set<string>();
    set.add(this.currentQuestion.word);

    while (set.size < 4) {
      const r = this.filteredSigns[Math.floor(Math.random() * this.filteredSigns.length)];
      if (r.word !== this.currentQuestion.word) {
        set.add(r.word);
      }
    }

    this.choices = Array.from(set).sort(() => Math.random() - 0.5);
  }

  selectChoice(choice: string) {
    this.resultDetails.push({
      question: this.currentQuestion.word,
      selected: choice,
      correct: this.currentQuestion.word
    });

    if (choice === this.currentQuestion.word) {
      this.score++;
    }
    this.loadNextQuestion();
  }

  finishQuiz() {
    this.quizStarted = false;

    this.savedScores[this.selectedCategory!] = this.score;
    this.savedScores.Total =
      this.savedScores.Animaux +
      this.savedScores.Sentiments +
      this.savedScores.Famille +
      this.savedScores.Fruits;

    this.saveScores();
    this.showResultCard = true;
  }

  endResultCard() {
    this.showResultCard = false;
    this.resultDetails = [];
    this.startTest("Animaux");
  }

  saveScores() {
    localStorage.setItem("quizScores", JSON.stringify(this.savedScores));
  }

  loadScores() {
    const saved = localStorage.getItem("quizScores");
    if (saved) {
      this.savedScores = JSON.parse(saved);
    }
  }

  showScoreSummary() {
    this.selectedCategory = "Résumé des scores";
    this.resultDetails = [
      { test: "Animaux", score: this.savedScores.Animaux },
      { test: "Sentiments", score: this.savedScores.Sentiments },
      { test: "Famille", score: this.savedScores.Famille },
      { test: "Fruits", score: this.savedScores.Fruits }
    ];

    this.score = this.savedScores.Total;
    this.showResultCard = true;
  }

  logout() {
    this.authService.logout();            
    localStorage.removeItem("quizScores");
    this.router.navigate(['/signin']);  
  }
}
