export class Clip {
  public id: number;
  public name: string;
  public start: number;
  public end: number;
  public tags: string[];

  constructor( name: string, start: number, end: number, tags: string[]) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.tags = tags;
  }
}
