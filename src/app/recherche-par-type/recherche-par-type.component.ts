import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { TypeVol } from '../model/type-vol.model';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-recherche-par-type',
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-type.component.html',
})
export class RechercheParTypeComponent implements OnInit {
  vols: Vol[] = [];
  IdType!: number;
  types: TypeVol[] = [];
  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.volService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });
  }

  onChange() {
    this.volService.rechercherParType(this.IdType).subscribe((vs) => {
      this.vols = vs;
      this.cdr.markForCheck();
    });
  }
}
