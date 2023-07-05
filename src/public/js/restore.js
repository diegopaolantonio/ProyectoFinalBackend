const form = document.getElementById("restoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/users/restorePassword/${obj.email}`, {
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
      title: `Fallo pedido de restauracion de password`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  let result = await response.json();

  if (result.status === "Success") {
    Swal.fire({
      icon: "success",
      title: `Pedido de restauracion de password exitoso`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "/login";
      }
    });
  }
});
