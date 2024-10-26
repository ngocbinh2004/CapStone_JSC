class Phone {
  constructor(
    _id,
    _name,
    _price,
    _screen,
    _backCamera,
    _fontCamera,
    _img,
    _desc,
    _type
  ) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.screen = _screen;
    this.backCam = _backCamera;
    this.frontCam = _fontCamera;
    this.img = _img;
    this.desc = _desc;
    this.type = _type;
  }
}

export default Phone;
