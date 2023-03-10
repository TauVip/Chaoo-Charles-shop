const moment = require('moment')
const { User } = require('../models/user')
const { isAdmin } = require('../middleware/auth')

const router = require('express').Router()

router.get('/stats', isAdmin, async (_, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set('date', 1)
    .format('YYYY-MM-DD HH:mm:ss')

  try {
    const users = await User.aggregate([
      { $match: { createdAt: { $gte: new Date(previousMonth) } } },
      { $project: { month: { $month: '$createdAt' } } },
      { $group: { _id: '$month', total: { $sum: 1 } } }
    ])
    res.status(200).send(users)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router
