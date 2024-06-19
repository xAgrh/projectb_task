const mongoose = require("mongoose");

module.exports = {
  async up(db) {
    // Add employees
    await db.collection("employees").insertMany([
      {
        _id: "000000000000000000000001",
        firstName: "Billie",
        lastName: "Some",
        jobTitle: 'Manager',
        department: 'Sales',
        email:"ggggg1@mailinator.com"
      },
      {
        _id: "000000000000000000000002",
        firstName: "Lee",
        lastName: "Leaper",
        jobTitle: 'Manager',
        department: 'Customers success',
        email:"ggggg2@mailinator.com"
      },
      {
        _id: "000000000000000000000003",
        firstName: "Jim",
        lastName: "Halpert",
        jobTitle: 'Tester',
        department: 'Qa',
        email:"ggggg3@mailinator.com"
      },
      {
        _id: "000000000000000000000004",
        firstName: "Tim",
        lastName: "Parker",
        jobTitle: 'Manager',
        department: 'Sales',
        email:"ggggg4@mailinator.com"
      },
      {
        _id: "000000000000000000000006",
        firstName: "Sarah",
        lastName: "Müller",
        jobTitle: 'CFO',
        department: 'Sales',
        email:"ggggg5@mailinator.com"
      },
    ]);
  },

  async down(db) {
    // Remove all employees
    await db.collection("employees").remove({});
  },
};
