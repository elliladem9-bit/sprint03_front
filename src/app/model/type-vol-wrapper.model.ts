import { TypeVol } from './type-vol.model';

// Format retourné par Spring Data REST : { _embedded: { types: [...] } }
export class TypeVolWrapper {
  _embedded!: { types: TypeVol[] };
}
