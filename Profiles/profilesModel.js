const db = require("../data/config/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  getAll,
  remove
};

function find() {
  return db("profile").select("id", "username");
}

function findBy(filter) {
  return db("profile").where(filter);
}

function findByUserId(user_id) {
  return db("profile")
    .select(
      "id",
      "user_id",
      "name",
      "phone",
      "email",
      "timezone",
      "picture",
      "mood",
      "birthday"
    )
    .where({ user_id })
    .first();
}

async function add(profile) {
  const [id] = await db("profile").insert(profile, "id");
  return findById(id);
}

function findById(id) {
  return db("profile")
    .select(
      "id",
      "user_id",
      "name",
      "phone",
      "email",
      "timezone",
      "picture",
      "mood",
      "birthday"
    )
    .where({ id })
    .first();
}

function getAll() {
  return db("profile");
}

async function update(id, changes) {
  return db("profile")
    .select("id", "profile_id")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("profile")
    .where({ id })
    .del();
}
