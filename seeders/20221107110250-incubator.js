'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const incubatordatas = JSON.parse(fs.readFileSync("./data/incubator.json", "utf-8")).map(data => {
      delete data.id
      data.createdAt = new Date()
      data.updatedAt = new Date()

      return data
    })
    return queryInterface.bulkInsert('Incubators', incubatordatas, {})
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Incubators', null, {})
  }
};
