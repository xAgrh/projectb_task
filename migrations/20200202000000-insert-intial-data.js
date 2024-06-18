const mongoose = require("mongoose");

module.exports = {
  async up(db) {
    // Add employees
    await db.collection("employees").insertMany([
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        firstname: "Billie",
        lastname: "Some",
        jobTitle: 'Manager',
        department: 'Sales'
        email:"ggggg1@mailinator.com"
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        firstname: "Lee",
        lastname: "Leaper",
        jobTitle: 'Manager',
        department: 'Customers success'
        email:"ggggg2@mailinator.com"
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        firstname: "Jim",
        lastname: "Halpert",
        jobTitle: 'Tester',
        department: 'Qa'
        email:"ggggg3@mailinator.com"
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000004"),
        firstname: "Tim",
        lastname: "Parker",
        jobTitle: 'Manager',
        department: 'Sales'
        email:"ggggg4@mailinator.com"
      },
      {
        _id: new mongoose.Types.ObjectId("000000000000000000000006"),
        firstname: "Sarah",
        lastname: "Müller",
        jobTitle: 'CFO',
        department: 'Sales'
        email:"ggggg5@mailinator.com"
      },
    ]);
  },

  async down(db) {
    // Remove all employees
    await db.collection("employees").remove({});
  },
};
