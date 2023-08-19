const form3 = document.getElementById("profilesForm");

form3.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form3);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/users/${obj.uid}/profiles/`, {
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
      title: `Imagen de perfil cargada correctamente`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "/documents";
      }
    });
  }
});
