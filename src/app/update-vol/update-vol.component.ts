import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { TypeVol } from '../model/type-vol.model';
import { VolService } from '../services/vol.service';

@Component({
  selector: 'app-update-vol',
  imports: [FormsModule, DatePipe],
  templateUrl: './update-vol.component.html',
})
export class UpdateVolComponent implements OnInit {
  currentVol = new Vol();
  types: TypeVol[] = [];
  updatedIdType!: number;
  private activatedRoute = inject(ActivatedRoute);
  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit() {
    this.volService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.volService.consulterVol(id).subscribe((v) => {
      this.currentVol = v;
      this.updatedIdType = v.type.idType;
      this.cdr.markForCheck();
    });
  }

  updateVol() {
    this.currentVol.type = this.types.find((t) => t.idType == this.updatedIdType)!;
    this.volService.updateVol(this.currentVol).subscribe(() => {
      this.router.navigate(['vols']);
    });
  }
}
