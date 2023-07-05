const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/v1/products", {
    method: "POST",
    body: JSON.stringify(obj),
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
      title: `Producto no creado`,
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
      title: `Producto creado`,
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

  let response = await fetch(`/api/v1/products/${obj.pid}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    Swal.fire({
      icon: "error",
      title: `Debe ser el Owner para eliminar el producto`,
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
      title: `Producto eliminado`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
