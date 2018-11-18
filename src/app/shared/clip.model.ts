export class Clip {
  public id: number;
  public name: string;
  public start: number;
  public end: number;
  public tags: string[];
  public source: string;

  constructor( name: string, start: number, end: number, tags: string[], source: string) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.tags = tags;
    this.source = source;
  }
}
