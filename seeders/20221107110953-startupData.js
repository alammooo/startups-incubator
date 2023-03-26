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
    const startupDatas = JSON.parse(fs.readFileSync("./data/startup.json", "utf-8")).map(data => {
      delete data.id
      if(data.education) {
        data.educationOfFounder = data.education
        delete data.education
      }
      // if(data.educationOfFounder) data.educationOfFounder = educationOfFounder
      // else if (data.education) data.education = educationOfFounder
      // data.education = educationOfFounder
      data.createdAt = new Date()
      data.updatedAt = new Date()

      return data
    })
    return queryInterface.bulkInsert('Startups', startupDatas)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null);
     */
    return queryInterface.bulkDelete('Startups', null)
  }
};
