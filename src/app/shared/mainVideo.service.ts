export class MainVideoService {
  private source = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
  private name = 'Main Video';

  public getSource() {
    return this.source;
  }
  public getName () {
    return this.name;
  }
}
