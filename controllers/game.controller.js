// Game Controller

const showGamePage =  (req, res) => {
  res.status(200).render('game.ejs');
}

module.exports = {
  showGamePage
}