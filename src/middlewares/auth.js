function checkSession(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

function roleUser(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    if (req.session.user.role != "user") {
      return res.redirect("/");
    }
  }
  next();
}

function roleAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    if (
      req.session.user.role != "admin" &&
      req.session.user.role != "premium"
    ) {
      return res.redirect("/");
    }
  }
  next();
}

function roleCartOwner(req, res, next) {
  if (JSON.stringify(req.session.user.cart) != JSON.stringify(req.params.cid)) {
    return res.redirect("/");
  }
  next();
}

function verifyDocuments(req, res, next) {
  if(req.user.verified_documentation != "complete" && req.user.role === "user") {
    return res.status(404).redirect("/");
  }
  next();
}

export { checkLogged, checkSession, roleUser, roleAdmin, roleCartOwner, verifyDocuments };
