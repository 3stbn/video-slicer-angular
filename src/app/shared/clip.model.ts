export class Clip {
  public id: number;
  public name: string;
  public start: number;
  public end: number;

  constructor( name: string, start: number, end: number) {
    this.name = name;
    this.start = start;
    this.end = end;
  }
}
