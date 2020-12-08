class Product {
  constructor(name, code, price, image, creationDate, activ, category, idProduc, idUser) {
    this.name = name;
    this.code = code;
    this.price = price;
    this.image = creationDate;
    this.activ = activ;
    this.category = category;
    this.id = id;
    this.idUser;
  }
  creationDate() {
    let date = new Date();
    return creationDate.getFullYear();
  }
}
//let myCar = new Car("Ford", "Mustang");