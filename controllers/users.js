const db = require('../models')

const show = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        })

        res.status(200).json({
            status: 200,
            data: foundUser
        })
    })
}

const update = (req, res) => {
  res.sendStatus(200);
}

module.exports = {
    show,
    update,
}
