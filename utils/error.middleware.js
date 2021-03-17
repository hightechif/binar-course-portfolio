// Internal Server Error Handler
const errorHandler = (err, req, res, next) => {
  console.log("SERVER ERROR")
  if (err) {
    console.log(err);
  } else {
    res.status(500);
  }
  next();
}

// 404 Handler
const error404Handler = (req, res, next) => {
  res.status(404).render('./404.ejs')
  next();
}

module.exports = { errorHandler, error404Handler };