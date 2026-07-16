import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../core/Services/api.service';
import { DragonBall } from '../../core/interfaces/dragonball.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  standalone: false
})
export class CharacterListComponent implements OnInit {
  characters: DragonBall[] = [];
  filteredCharacters: DragonBall[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';

  // Propiedades de paginación
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;
  totalItems: number = 0;
  pages: number[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    console.log(`Cargando lista de personajes (Página: ${this.currentPage})...`);
    this.loading = true;
    this.error = null;
    this.apiService.getDragonBall(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        console.log('Respuesta paginada de la API recibida:', response);
        this.characters = response.items;
        this.filteredCharacters = response.items;
        this.totalPages = response.meta.totalPages;
        this.totalItems = response.meta.totalItems;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al traer lista de personajes:', err);
        this.error = err.message || 'Ocurrió un error inesperado';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters();
    }
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.filteredCharacters = this.characters.filter(char =>
      char.name.toLowerCase().includes(value.toLowerCase()) ||
      char.race.toLowerCase().includes(value.toLowerCase())
    );
    this.cdr.detectChanges();
  }
}
