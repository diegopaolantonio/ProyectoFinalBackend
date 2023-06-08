const form = document.getElementById("cartForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/v1/carts/${obj.cid}`, {
    method: "DELETE",
    // body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 400 || response.status === 401 || response.status === 500) {
    Swal.fire({
      icon: "error",
      title: "Product not deleted",
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
      title: `Deleted product`,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
});
