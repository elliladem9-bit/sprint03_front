import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { TypeVol } from '../model/type-vol.model';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-add-vol',
  imports: [FormsModule],
  templateUrl: './add-vol.component.html',
})
export class AddVolComponent implements OnInit {
  newVol = new Vol();
  types: TypeVol[] = [];
  newIdType!: number;
  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.volService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      if (this.types.length > 0) this.newIdType = this.types[0].idType;
      this.cdr.markForCheck();
    });
  }

  addVol() {
    this.newVol.type = this.types.find((t) => t.idType == this.newIdType)!;
    this.volService.ajouterVol(this.newVol).subscribe(() => {
      this.router.navigate(['vols']);
    });
  }
}
