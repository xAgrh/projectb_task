var db = connect("root:example@127.0.0.1:27017/admin"); // eslint-disable-line no-undef

db = db.getSiblingDB("projectb-interview");

db.createCollection("projectb-interview");

db.createUser({
  user: "projectb-user",
  pwd: "example",
  roles: [{ db: "projectb-interview", role: "readWrite" }],
});
