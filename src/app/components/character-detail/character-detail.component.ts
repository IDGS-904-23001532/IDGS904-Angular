import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/Services/api.service';
import { DragonBall } from '../../core/interfaces/dragonball.interface';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  standalone: false
})
export class CharacterDetailComponent implements OnInit {
  character: DragonBall | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Parámetros de ruta
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = Number(idStr);
        this.loadCharacter(id);
      } else {
        this.error = 'Personaje no especificado';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCharacter(id: number): void {
    console.log('Cargando personaje con ID:', id);
    this.loading = true;
    this.error = null;
    this.apiService.getCharacterById(id).subscribe({
      next: (data) => {
        console.log('Personaje recibido de la API:', data);
        this.character = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al traer personaje:', err);
        this.error = err.message || 'Error al obtener la información del personaje';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}
