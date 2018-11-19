export class MainVideoService {
  private source = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
  private name = 'Main Video';
  private duration: number;

  public getSource() {
    return this.source;
  }
  public getName () {
    return this.name;
  }
  public getVideoDuration() {
    return this.duration;
  }
  public updateVideoDuration (duration: number) {
    this.duration = duration;
  }
  public changeUrl(url: string) {
    this.source = url;
  }
}
