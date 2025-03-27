import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
  async function loadPage() {
    try {
      await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
      ]);
    } catch (error) {
      console.log("Unexpected error occured. Please try again later.");
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  }
  loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
  loadCart(() => {
    resolve();
  });
})
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
.then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  
});
*/
/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
