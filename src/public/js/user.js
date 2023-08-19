const form = document.getElementById("userForm");

form.addEventListener("reset", async (e) => {
  e.preventDefault();
  console.log("object");

  let response = await fetch(`/api/v1/users/`, {
    method: "DELETE",
  });
  console.log(response);

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 404 ||
    response.status === 500
  ) {
    Swal.fire({
      icon: "error",
      title: `Can't delete users`,
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
      title: `Usuarios inactivos eliminados`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
