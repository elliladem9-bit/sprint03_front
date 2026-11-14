import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

// Recherche par destination en utilisant un pipe
@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  vols: Vol[] = [];
  searchTerm = '';
  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.volService.listeVols().subscribe((vs) => {
      this.vols = vs;
      this.cdr.markForCheck();
    });
  }
}
