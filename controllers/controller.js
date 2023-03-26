const { Incubator, Startup } = require("../models")
const { formatCurrency } = require("../helper/formatter")

class Controller {
  static listAllIncubator(req, res) {
    Incubator.findAll()
      .then((datas) => {
        res.render("incubator-list", { datas })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addIncubator(req, res) {
    res.render("add-incubator", { levels: Incubator.levelList })
  }

  static addIncubatorPost(req, res) {
    const incubatorData = req.body
    Incubator.create(incubatorData, null)
      .then(() => {
        res.redirect("/")
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static incubatorById(req, res) {
    const deleteMessage = req.query.msg
    const id = +req.params.incubatorId
    const startupAge = Startup.age
    let findIncubator
    Incubator.findOne({
      include: Startup,
      where: { id },
    })
      .then((result) => {
        findIncubator = result
        return Startup.sum("valuation", { where: { IncubatorId: id } })
      })
      .then((totalValuation) => {
        res.render("incubator-details", {
          findIncubator,
          totalValuation,
          formatCurrency,
          startupAge,
          deleteMessage,
        })
      })
      .catch((err) => {
        res.send(err)
      })
    // Incubator.findOne({
    //     include: Startup,
    //     where: { id },
    // })
    //     .then(findIncubator => {
    //         let initialValue = 0
    //         const totalValuation = findIncubator.Startups.reduce((previousValue, currentValue) => {
    //             return previousValue + currentValue.valuation
    //         }, initialValue)

    //         console.log(totalValuation)
    //         // res.send(findIncubator)
    //         // console.log(Startup.formatCurrency(findIncubator.dataValues.totalValuation));
    //         res.render('incubator-details', { findIncubator, totalValuation, formatCurrency , getTheYear})
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
  }

  static addStartup(req, res) {
    const founderEducation = Startup.founderEducation
    const founderRole = Startup.founderRole
    const id = +req.params.incubatorId
    const { msg } = req.query
    Incubator.findOne({
      where: { id },
    })
      .then((findIncubator) => {
        res.render("add-startup", {
          founderEducation,
          founderRole,
          findIncubator,
          msg,
        })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addStartupPost(req, res) {
    const startupData = req.body
    const id = +req.params.incubatorId

    startupData.IncubatorId = id

    Startup.create(startupData)
      .then(() => {
        res.redirect(`/incubators/${id}`)
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const msg = err.errors.map((el) => el.message)
          res.redirect(`/incubators/${id}/startup/add?msg=${msg}`)
        } else {
          res.send(err)
        }
      })
  }

  static editStartup(req, res) {
    const { incubatorId, startUpId } = req.params
    const { msg } = req.query
    const founderEducation = Startup.founderEducation
    const founderRole = Startup.founderRole
    Startup.findByPk(startUpId)
      .then((findStartup) => {
        // res.send(findStartup)
        res.render("edit-startup", {
          founderEducation,
          founderRole,
          findStartup,
          incubatorId,
          msg,
        })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static editStartupPost(req, res) {
    const startUpData = req.body
    const { incubatorId, startUpId } = req.params
    startUpData.IncubatorId = incubatorId
    Startup.update(startUpData, {
      where: { id: startUpId },
    })
      .then(() => {
        res.redirect(`/incubators/${incubatorId}`)
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const msg = err.errors.map((el) => el.message)
          res.redirect(
            `/incubators/${incubatorId}/startUp/${startUpId}/edit?msg=${msg}`
          )
        } else {
          res.send(err)
        }
      })
  }

  static deleteStartup(req, res) {
    const { incubatorId, startUpId } = req.params

    Startup.findByPk(startUpId)
      .then((result) => {
        Startup.destroy({
          where: {
            id: startUpId,
            IncubatorId: incubatorId,
          },
        })
        return result
      })
      .then((result) => {
        const startupName = result.dataValues.startUpName
        const founderName = result.dataValues.founderName
        res.redirect(
          `/incubators/${incubatorId}?msg=Start-up ${startupName} with ${founderName} as founder has been removed`
        )
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static filterStartup(req, res) {
    const { filter } = req.query
    let active = filter
    Startup.getStartupByRoleOfFounder(filter)
      .then((startupList) => {
        res.render("startup-list", { startupList, active })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  // static listAllStartup(req, res) {
  //     let active = ""
  //
  //         .then((startupList) => {
  //             res.render("startup-list", { startupList, active })
  //         })
  //         .catch((err) => {
  //             res.send(err)
  //         })
  // }
}

module.exports = Controller
