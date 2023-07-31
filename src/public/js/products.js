const form2 = document.getElementById("productsForm");

form2.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form2);
  let obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/products/${obj.uid}/products/`, {
    method: "POST",
    body: data,
  });

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    Swal.fire({
      icon: "error",
      title: `Datos incompletos`,
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
      title: `Documentacion de producto "${result.payload._id}" cargada correctamente`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "/documents";
      }
    });
  }
});
