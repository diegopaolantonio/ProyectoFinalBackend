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
    if (req.session.user.role != "admin") {
      return res.redirect("/");
    }
  }
  next();
}

export { checkLogged, checkSession, roleUser, roleAdmin };
