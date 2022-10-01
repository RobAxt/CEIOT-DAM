export class Electrovalvula{
  private _electrovalvulaId: number;
  private _nombre: string;
  private _apertura: number;

  constructor(electrovalvulaId: number, nombre: string, apertura: number){
      this._electrovalvulaId=electrovalvulaId;
      this._nombre=nombre;
      this._apertura=apertura;
  }

  public get electrovalvulaId(): number {
      return this._electrovalvulaId;
  }
  public set electrovalvulaId(value: number) {
      this._electrovalvulaId = value;
  }

  public get nombre(): string {
      return this._nombre;
  }
  public set nombre(value: string) {
      this._nombre = value;
  }

  public get apertura(): number {
      return this._apertura;
  }
  public set apertura(value: number) {
      this._apertura = value;
  }
}
