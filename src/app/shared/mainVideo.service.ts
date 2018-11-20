export class MainVideoService {
  private source = 'https://www.w3schools.com/html/mov_bbb.mp4';
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
