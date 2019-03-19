var spicedPg = require("spiced-pg");
// var crypto = require("crypto");
const bcrypt = require('bcrypt');
var db = spicedPg(
  process.env.DATABASE_URL || "postgres:postgres@localhost:5432/postgres"
);

// function hashPassword(plainTextPassword) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.genSalt(function(err, salt) {
//             if (err) {
//                 return reject(err);
//             }
//             bcrypt.hash(plainTextPassword, salt, function(err, hash) {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(hash);
//             });
//         });
//     });
// }
//
// function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.compare(
//             textEnteredInLoginForm,
//             hashedPasswordFromDatabase,
//             function(err, doesMatch) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(doesMatch);
//                 }
//             }
//         );
//     });
// }

//createuser
module.exports.createUser = function createUser(
  firstname,
  lastname,
  email,
  password,
  avatar
) {
  var hash = bcrypt.hashSync(password, 1);
  return db.query(
    "INSERT INTO users(firstname, lastname, email, password, avatar) VALUES($1,$2,$3,$4,$5) returning id",
    [firstname, lastname, email, hash, avatar]
  );
};

// change avatar
module.exports.updateAvatar = function updateAvatar(userId, avatar) {
  return db.query("UPDATE users SET avatar = $1 WHERE id = $2", [
    avatar,
    userId
  ]);
};

// get full user
module.exports.getUser = function getUser(userId) {
  return db.query("SELECT * FROM users WHERE id = $1", [userId]);
};

//login
module.exports.loginUser = function loginUser(email, password) {
  console.log("hash-> ",bcrypt.compareSync(password, "$2b$04$LgCBMYZMZPXC7dZDnPITIeW7Mwcb54YpMRR4BawcJ0F/v4D6qp8TG"));
  return new Promise(function(resolve, reject) {
    db.query(
      "SELECT id,email,password FROM users WHERE email = $1",
      [email]
    ).then((res)=>{
      if(res.rows && res.rows[0]){
        if(bcrypt.compareSync(password,res.rows[0].password)){
          return resolve(res)
        } else {
          return reject("invalid user auth");
        }
      }
      return reject("invalid user auth");
    }).catch(reject);
  });
};

//editbio
module.exports.editUserBio = function editUserBio(userId, bioText) {
  return db.query(
    "UPDATE users SET biotext= $1 WHERE id = $2 returning biotext",
    [bioText, userId]
  );
};

//friendship button

function getInitialStatus(myId, otherId) {
  let q = `SELECT * FROM friendships
		WHERE (receiver_id = $1 AND sender_id = $2)
		OR (receiver_id = $2 AND sender_id = $1)`;

  let params = [myId, otherId];

  return db.query(q, params);
}

module.exports.checkAllFriendRequests = function checkAllFriendRequests(myId) {
  return db.query(
    `SELECT * from friendships INNER JOIN users ON users.id = sender WHERE receiver = $1 AND accepted = false`,
    [myId]
  );
};

module.exports.checkAllFriends = function checkAllFriends(myId) {
  return db.query(
    `SELECT * from friendships INNER JOIN users ON users.id = sender WHERE receiver = $1 AND accepted = true`,
    [myId]
  );
};

module.exports.friendRequest = function friendRequest(myId, otherUserId) {
  // first check
  return db.query(
    `INSERT INTO friendships (receiver, sender)  VALUES ($1, $2) RETURNING *`,
    [otherUserId, myId]
  );
};
module.exports.checkFriendship = function checkFriendRequest(myId, otherUserId) {
  return db.query(
    `SELECT * from friendships WHERE ((receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)) AND accepted = true`,
    [myId, otherUserId]
  );
};
module.exports.checkFriendRequest = function checkFriendRequest(myId, otherUserId) {
  return db.query(
    `SELECT * from friendships WHERE sender = $1 AND receiver = $2 AND accepted = false`,
    [myId, otherUserId]
  );
};
module.exports.acceptFriendRequest = function acceptFriendRequest(
  myId,
  otherUserId
) {
  return db.query(
    `UPDATE friendships SET accepted = true WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)`,
    [myId, otherUserId]
  );
};

module.exports.cancelFriendRequest = function cancelFriendRequest(
  myId,
  otherUserId
) {
  return db.query(
    `DELETE FROM friendships WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)`,
    [myId, otherUserId]
  );
};


//socket
module.exports.getUsersByIds= function getUsersByIds(arrayOfIds) {
    const query = `SELECT id, firstname, lastname, avatar FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
}
//just a comment to update my mess



//
// var spicedPg = require("spiced-pg");
// var crypto = require("crypto");
// var db = spicedPg(
//   process.env.DATABASE_URL || "postgres:postgres@localhost:5432/postgres"
// );
//
// //createuser
// module.exports.createUser = function createUser(
//   firstname,
//   lastname,
//   email,
//   password,
//   avatar
// ) {
//   var hashed = crypto
//     .createHash("md5")
//     .update(password)
//     .digest("hex");
//   return db.query(
//     "INSERT INTO users(firstname, lastname, email, password, avatar) VALUES($1,$2,$3,$4,$5) returning id",
//     [firstname, lastname, email, hashed, avatar]
//   );
// };
//
// // change avatar
// module.exports.updateAvatar = function updateAvatar(userId, avatar) {
//   return db.query("UPDATE users SET avatar = $1 WHERE id = $2", [
//     avatar,
//     userId
//   ]);
// };
//
// // get full user
// module.exports.getUser = function getUser(userId) {
//   return db.query("SELECT * FROM users WHERE id = $1", [userId]);
// };
//
// //login
// module.exports.loginUser = function loginUser(email, password) {
//   var hashed = crypto
//     .createHash("md5")
//     .update(password)
//     .digest("hex");
//   return db.query(
//     "SELECT id,email,password FROM users WHERE email = $1 AND password = $2 ",
//     [email, hashed]
//   );
// };
//
// //editbio
// module.exports.editUserBio = function editUserBio(userId, bioText) {
//   return db.query(
//     "UPDATE users SET biotext= $1 WHERE id = $2 returning biotext",
//     [bioText, userId]
//   );
// };
//
// //friendship button
//
// function getInitialStatus(myId, otherId) {
//   let q = `SELECT * FROM friendships
// 		WHERE (receiver_id = $1 AND sender_id = $2)
// 		OR (receiver_id = $2 AND sender_id = $1)`;
//
//   let params = [myId, otherId];
//
//   return db.query(q, params);
// }
//
// module.exports.checkAllFriendRequests = function checkAllFriendRequests(myId) {
//   return db.query(
//     `SELECT * from friendships INNER JOIN users ON users.id = sender WHERE receiver = $1 AND accepted = false`,
//     [myId]
//   );
// };
//
// module.exports.checkAllFriends = function checkAllFriends(myId) {
//   return db.query(
//     `SELECT * from friendships INNER JOIN users ON users.id = sender WHERE receiver = $1 AND accepted = true`,
//     [myId]
//   );
// };
//
// module.exports.friendRequest = function friendRequest(myId, otherUserId) {
//   // first check
//   return db.query(
//     `INSERT INTO friendships (receiver, sender)  VALUES ($1, $2) RETURNING *`,
//     [otherUserId, myId]
//   );
// };
// module.exports.checkFriendship = function checkFriendRequest(myId, otherUserId) {
//   return db.query(
//     `SELECT * from friendships WHERE ((receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)) AND accepted = true`,
//     [myId, otherUserId]
//   );
// };
// module.exports.checkFriendRequest = function checkFriendRequest(myId, otherUserId) {
//   return db.query(
//     `SELECT * from friendships WHERE sender = $1 AND receiver = $2 AND accepted = false`,
//     [myId, otherUserId]
//   );
// };
// module.exports.acceptFriendRequest = function acceptFriendRequest(
//   myId,
//   otherUserId
// ) {
//   return db.query(
//     `UPDATE friendships SET accepted = true WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)`,
//     [myId, otherUserId]
//   );
// };
//
// module.exports.cancelFriendRequest = function cancelFriendRequest(
//   myId,
//   otherUserId
// ) {
//   return db.query(
//     `DELETE FROM friendships WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)`,
//     [myId, otherUserId]
//   );
// };
//
//
// //socket
// module.exports.getUsersByIds= function getUsersByIds(arrayOfIds) {
//     const query = `SELECT id, firstname, lastname, avatar FROM users WHERE id = ANY($1)`;
//     return db.query(query, [arrayOfIds]);
// }
//just a comment to update my mess
