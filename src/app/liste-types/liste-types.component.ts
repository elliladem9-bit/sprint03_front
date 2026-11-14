import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TypeVol } from '../model/type-vol.model';
import { VolService } from '../services/vol.service';
import { UpdateTypeComponent } from '../update-type/update-type.component';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateTypeComponent],
  templateUrl: './liste-types.component.html',
})
export class ListeTypesComponent implements OnInit {
  types: TypeVol[] = [];
  updatedType: TypeVol = { idType: 0, nomType: '', descriptionType: '' };
  ajout: boolean = true;

  private volService = inject(VolService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(Auth);

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.volService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });
  }

  // événement reçu de l'enfant UpdateType
  typeUpdated(type: TypeVol) {
    const requete = this.ajout
      ? this.volService.ajouterType(type)
      : this.volService.updateType(type);

    requete.subscribe(() => {
      // on remet le formulaire en mode "ajout"
      this.updatedType = { idType: 0, nomType: '', descriptionType: '' };
      this.ajout = true;
      this.cdr.markForCheck();
      this.chargerTypes();
    });
  }

  updateType(type: TypeVol) {
    // copie : la table ne change qu'après clic sur "Modifier"
    this.updatedType = { ...type };
    this.ajout = false;
  }

  supprimerType(type: TypeVol) {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer ce type ?');
    if (conf) {
      this.volService.supprimerType(type.idType).subscribe({
        next: () => this.chargerTypes(),
        error: () => alert('Suppression impossible : ce type est utilisé par des vols.'),
      });
    }
  }
}
