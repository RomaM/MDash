export class PageDetailsModel {
  public id: number;
  public title: string;
  public brand: string;
  public lang: string;
  public url: string;
  public taskUrl: string;
  public steps: number;
  public features: Array<any>;
  public description: string;
  public image: string;
  public date: string;

  constructor(id: number,
              title: string,
              brand: string,
              lang: string,
              url: string,
              taskUrl: string,
              steps: number,
              features: Array<any>,
              description: string,
              image: string,
              date: string) {
    this.id = id;
    this.title = title;
    this.brand = brand;
    this.lang = lang;
    this.url = url;
    this.taskUrl = taskUrl;
    this.steps = steps;
    this.features = features;
    this.description = description;
    this.image = image;
    this.date = date;
  }
}
