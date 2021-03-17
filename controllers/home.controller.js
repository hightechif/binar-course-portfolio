// Home Controller

const showHomePage = (req, res) => {
  res.status(200).render('./index.ejs');
}

module.exports = {
  showHomePage
}