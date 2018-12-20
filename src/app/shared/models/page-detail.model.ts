export class PageDetailsModel {
  public title: string;
  public brand: string;
  public lang: string;
  public url: string;
  public steps: number;
  public features: Array<any>;
  public description: string;
  public image: string;
  public date: string;

  constructor(title: string,
              brand: string,
              lang: string,
              url: string,
              steps: number,
              features: Array<any>,
              description: string,
              image: string,
              date: string) {
    this.title = title;
    this.brand = brand;
    this.lang = lang;
    this.url = url;
    this.steps = steps;
    this.features = features;
    this.description = description;
    this.image = image;
    this.date = date;
  }
}
