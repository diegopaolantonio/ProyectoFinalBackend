const form = document.getElementById("ticket");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let response = await fetch(
    `/api/v1/carts/${req.session.user.cart}/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 401 || response.status === 500) {
    Swal.fire({
      icon: "error",
      title: `Email or password incorrect`,
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
      title: `Login Success`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
