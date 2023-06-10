const form = document.getElementById("cartForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/carts/${obj.cid}/purchase`, {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    Swal.fire({
      icon: "error",
      title: "Ticket not created",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  result = await response.json();

  if (result.status === "Success") {
    Swal.fire({
      icon: "success",
      title: "Ticket created",
      html: `
      <p>Codigo: ${result.payload.createdTicket.code}</p>
      <p>Fecha: ${result.payload.createdTicket.purchase_datetime}</p>
      <p>Monto: ${result.payload.createdTicket.amount}</p>
      <p>Comprador: ${result.payload.createdTicket.purchaser}</p>
      <h2>Ids de los productos comprados:</h2>
      <p>${result.payload.productsAdded}</p>
      <h2>Ids de los productos que no pudieron procesarse por falta de stock:</h2>
      <p>${result.payload.productsNotAdded}</p>
      `,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});

form.addEventListener("reset", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/carts/${obj.cid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    Swal.fire({
      icon: "error",
      title: "Cart not emptied",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  result = await response.json();

  if (result.status === "Success") {
    Swal.fire({
      icon: "success",
      title: "Empty cart",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
