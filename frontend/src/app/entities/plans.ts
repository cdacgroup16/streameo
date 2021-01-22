export class Plans {
  name: string;
  price: number;
  stream: number;
  validity: number;
  max_quality: number;

  constructor(name: string, price: number, stream: number, validity: number, max_quality: number) {
    this.name = name;
    this.price = price;
    this.stream = stream;
    this.validity = validity;
    this.max_quality = max_quality;
  }
}
