import {formatCurrency} from '../scripts/utils/money.js';
//import '../data/car.js';
export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}
class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id =  productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
}
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    //super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `;
  }
}

/*
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());
*/
/* 
const object2 = {
  a: 2,
  b: this.a
};
function logThis() {
  console.log(this);
}
logThis();
logThis.call('hello');
*/

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
  }).catch((error) => {
    console.log('Unexpected error. Please try again later.');
  });
  return promise;
}
/*
loadProductsFetch().then(() => {
  console.log('next step');
});
*/

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
    fun();
  });

  xhr.addEventListener('error', () => {
    console.log('Unexpected error. Please try again later.');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
