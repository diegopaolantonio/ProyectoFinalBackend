const form = document.getElementById("profileForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/users/premium/${obj.uid}`, {
    method: "PUT",
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
      title: `Role not changed`,
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
      title: `Role changed`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
