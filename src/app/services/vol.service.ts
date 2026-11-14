import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vol } from '../model/vol.model';
import { TypeVol } from '../model/type-vol.model';
import { TypeVolWrapper } from '../model/type-vol-wrapper.model';

@Injectable({ providedIn: 'root' })
export class VolService {
  // api REST Spring Boot (@RestController) pour les vols
  apiURL: string = 'http://localhost:8090/vols/api';
  // api Spring Data REST pour les types de vol
  apiURLType: string = 'http://localhost:8090/vols/types';

  private http = inject(HttpClient);

  // ---------- Vols ----------
  listeVols(): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.apiURL);
  }

  ajouterVol(vol: Vol): Observable<Vol> {
    return this.http.post<Vol>(this.apiURL, vol);
  }

  supprimerVol(id: number) {
    return this.http.delete(this.apiURL + '/' + id);
  }

  consulterVol(id: number): Observable<Vol> {
    return this.http.get<Vol>(this.apiURL + '/' + id);
  }

  updateVol(vol: Vol): Observable<Vol> {
    return this.http.put<Vol>(this.apiURL, vol);
  }

  // Recherche par type de vol
  rechercherParType(idType: number): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.apiURL + '/voltype/' + idType);
  }

  // Recherche par destination
  rechercherParNom(nom: string): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.apiURL + '/volsByDestination/' + nom);
  }

  // ---------- Types de vol (Spring Data REST) ----------
  listeTypes(): Observable<TypeVolWrapper> {
    return this.http.get<TypeVolWrapper>(this.apiURLType);
  }

  ajouterType(type: TypeVol): Observable<TypeVol> {
    // l'id est généré par MySQL : on envoie seulement nom + description
    return this.http.post<TypeVol>(this.apiURLType, {
      nomType: type.nomType,
      descriptionType: type.descriptionType,
    });
  }

  updateType(type: TypeVol): Observable<TypeVol> {
    return this.http.put<TypeVol>(this.apiURLType + '/' + type.idType, type);
  }

  supprimerType(id: number) {
    return this.http.delete(this.apiURLType + '/' + id);
  }
}
