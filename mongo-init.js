print("Start create users and db");
db = db.getSiblingDB("PersonalLibrary");
/*
db.createUser({
  user: "gs1",
  pwd: "gs1",
  roles: [{ role: "readWrite", db: "admin" }],
});
*/
db.createCollection("books");
print("End create users and db.");
