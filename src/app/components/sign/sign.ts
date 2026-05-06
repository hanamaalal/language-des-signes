import { Component, inject, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sign',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './sign.html',
  styleUrls: ['./sign.css']
})
export class Sign implements OnInit {

  signs: any[] = [];
  filteredSigns: any[] = [];

  selectedCategory: string = '';

  categories = ["Animaux", "Sentiments", "Famille", "Fruits"];
  private router=inject(Router);

constructor(
    private projetService: ProjetService,
    private authService: AuthService
  ) {}

 ngOnInit(): void {
  this.projetService.getSigns().subscribe({
    next: data => {
      this.signs = data.signs;
      this.filteredSigns = data.signs;
    },
    error: err => {
      console.error("Erreur lors de la récupération :", err);
    }
  });
}

  applyFilter() {
    if (!this.selectedCategory) {
      this.filteredSigns = this.signs;
      return;
    }

    this.filteredSigns = this.signs.filter(
      s => s.category === this.selectedCategory
    );
  }
  logout() {
    this.authService.logout();            
    localStorage.removeItem("quizScores");
    this.router.navigate(['/signin']);  
  }
}
