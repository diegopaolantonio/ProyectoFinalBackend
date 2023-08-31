const stripe = Stripe(
  "pk_test_51NfD7GBNvH8NKSw22ciruCJSrLvYu9hkvXzdw4T5SNGIqPhylguZkC9DtRPCkOBe0NtcTjklaip1ZtI3SyvUHsZL006Qb4MJ8E"
); // Your Publishable Key
const elements = stripe.elements();

// Create our card inputs
var style = {
  base: {
    color: "black",
    width: "200",
  },
};

const card = elements.create("card", { style });
card.mount("#card-element");

const form = document.querySelector("form");
const errorEl = document.querySelector("#card-errors");

// Give our token to our form
const stripeTokenHandler = (token) => {
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  form.submit();
};

// Create token from card data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  stripe.createToken(card).then((res) => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  });
});
