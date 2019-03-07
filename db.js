var spicedPg = require('spiced-pg');
var crypto = require('crypto');
var db = spicedPg(
  process.env.DATABASE_URL ||
  'postgres:postgres@localhost:5432/postgres');


  //createuser
  module.exports.createUser = function createUser(
      firstname,
      lastname,
      email,
      password,
      avatar

  ) {
      var hashed = crypto.createHash('md5').update(password).digest("hex");
      return db.query(
          "INSERT INTO users(firstname, lastname, email, password, avatar) VALUES($1,$2,$3,$4,$5) returning id",
          [firstname, lastname, email, hashed, avatar]
      );
  };

// change avatar
module.exports.updateAvatar = function updateAvatar(userId, avatar) {
  return db.query(
      "UPDATE users SET avatar = $1 WHERE id = $2",
      [avatar, userId]
  );
};

// get full user
module.exports.getUser = function getUser(userId) {
  return db.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
  );
};

//login
  module.exports.loginUser = function loginUser(email, password) {
    var hashed = crypto.createHash('md5').update(password).digest("hex");
    return db.query(
        "SELECT id,email,password FROM users WHERE email = $1 AND password = $2 ",
        [email, hashed]
    );
};
