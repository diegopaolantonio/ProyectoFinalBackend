const form = document.getElementById("documentsForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  let obj = {};
console.log("documents");
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  let response = await fetch(`/api/v1/users/${obj.uid}/documents/`, {
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
      title: `Documentacion "${result.payload}" cargada correctamente`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "/documents";
      }
    });
  }
});
