"use strict"
const getTheYear = require("../helper/formatter")
const { Model, or, Op } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Startup.belongsTo(models.Incubator)
    }

    get age() {
      const ageFounded = new Date().getFullYear() - this.dateFound.getFullYear()
      return ageFounded
    }

    static founderEducation = ["SMA", "S1", "S2", "S3"]
    static founderRole = ["Hacker", "Hipster", "Hustler"]

    static getStartupByRoleOfFounder(filter) {
      if (filter) {
        return Startup.findAll({
          include: [sequelize.models.Incubator],
          order: [["roleOfFounder", "DESC"]],
          where: {
            roleOfFounder: {
              [Op.eq]: filter,
            },
          },
        })
      } else {
        return Startup.findAll({
          include: [sequelize.models.Incubator],
          order: [["roleOfFounder", "DESC"]],
        })
      }
    }
  }
  Startup.init(
    {
      startUpName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "StartUp name is required" },
          notEmpty: { msg: "Startup name is required" },
        },
      },
      founderName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Founder name is required" },
          notNull: { msg: "Founder name is required" },
        },
      },
      dateFound: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          dateValidation() {
            if (!this.dateFound) throw new Error("Date is required")
            if (new Date().getFullYear() - this.dateFound.getFullYear() < 5) {
              throw new Error("Startup must be older than 5 years")
            }
          },
          notNull: { msg: "Date is required" },
          notEmpty: { msg: "Date is required" },
        },
      },
      educationOfFounder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Founder education is required" },
          notNull: { msg: "Founder education is required" },
        },
      },
      roleOfFounder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Founder role is required" },
          notNull: { msg: "Founder role is required" },
          roleValidate() {
            if (this.roleOfFounder === "Hustler") {
              if (
                this.educationOfFounder === "SMA" ||
                this.educationOfFounder === "S1"
              ) {
                throw new Error("Minimal requirement for a Hustler are S2")
              }
            }
          },
        },
      },
      IncubatorId: DataTypes.STRING,
      valuation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "valuation is required" },
          notNull: { msg: "valuation is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Startup",
    }
  )
  return Startup
}
