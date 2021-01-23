export class Plans {
  id: string;
  name: string;
  price: number;
  concurrent_streams: number;
  validity: number;
  max_quality: number;

  constructor(id: string, name: string, price: number, concurrent_streams: number, validity: number, max_quality: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.concurrent_streams = concurrent_streams;
    this.validity = validity;
    this.max_quality = max_quality;
  }
}

