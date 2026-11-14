import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol.service';

// Recherche par destination en utilisant l'événement keyup
@Component({
  selector: 'app-recherche-par-nom-keyup',
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-nom-keyup.component.html',
})
export class RechercheParNomKeyupComponent implements OnInit {
  vols: Vol[] = [];
  allVols: Vol[] = [];
  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.volService.listeVols().subscribe((vs) => {
      this.allVols = vs;
      this.vols = vs;
      this.cdr.markForCheck();
    });
  }

  onKeyUp(filterText: string) {
    this.vols = this.allVols.filter((item) =>
      item.destination.toLowerCase().includes(filterText.toLowerCase()),
    );
  }
}
