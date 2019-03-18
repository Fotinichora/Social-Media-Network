const express = require("express");
const app = express();
//const socket = io.connect();
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cookie_reader = require('cookie');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const db = require("./db");
app.use(cookieParser());

app.use(express.static("./public"));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" })); // to put MEGA IMAGES LIKE GOOGLE

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

function requireLoggedInUser(req, res, next) {
  if (!req.session.userId) {
    res.sendStatus(403);
  } else {
    next();
  }
}

//need to be fixed

app.post("/register", (req, res) => {
  const { firstname, lastname, email, password, avatar } = req.body;

  db.createUser(firstname, lastname, email, password, avatar)
    .then(results => {
      if (results) {
        res.cookie("user", results.rows[0].id);
        res.send({ success: "ok" });
      }
      // else
      //   res.render("register", {
      //     error: "please put your password"
      //   });
    })
    .catch(err => res.send({ error: err }));
});

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.loginUser(email, password)
    .then(results => {
      if (results.rows.length > 0) {
        //console.log(results)
        res.cookie("user", results.rows[0].id);
        res.send({ success: "ok" });
      } else {
        res.send({ error: "bad password" });
      }
    })
    .catch(console.log(err => console.log("errr", err)));
});

//logout

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.send({ success: "ok" });
});

// get the user from database with avatar same time
app.get("/user", (req, res) => {
  if (!req.cookies.user) {
    return res.send({
      error: "You are not Log In"
    });
  }
  const userId = parseInt(req.cookies.user);
  db.getUser(userId)
    .then(users => {
      res.send({ user: users.rows[0] });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//otherprofile
app.get("/user-api/:id", (req, res) => {
  db.getUser(req.params.id)
    .then(users => {
      res.send({ user: users.rows[0] });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

// check all fiends friended
app.get("/checkallfriends", (req, res) => {
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.checkAllFriends(myUserId)
    .then(results => {
      if (results.rows.length) {
        res.send({ results: results.rows });
      } else {
        res.send({ results: [] });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

// check all fiends requests
app.get("/checkallfriendreqs", (req, res) => {
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.checkAllFriendRequests(myUserId)
    .then(results => {
      if (results.rows.length) {
        res.send({ results: results.rows });
      } else {
        res.send({ results: [] });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//checkfriend
app.get("/arewefriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.checkFriendship(myUserId, theOtherUserId)
    .then(results => {
      if (results.rows.length) {
        res.send({ exists: true });
      } else {
        res.send({ exists: false });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//checkfriend
app.get("/checkoutgoingfriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.checkFriendRequest(myUserId, theOtherUserId)
    .then(results => {
      if (results.rows.length) {
        res.send({ exists: true });
      } else {
        res.send({ exists: false });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

app.get("/checkincomingfriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.checkFriendRequest(theOtherUserId, myUserId)
    .then(results => {
      if (results.rows.length) {
        res.send({ exists: true });
      } else {
        res.send({ exists: false });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

app.get("/acceptfriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.acceptFriendRequest(myUserId, theOtherUserId)
    .then(results => {
      res.send({ success: "ok" });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//cancelfriend
app.get("/cancelfriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.cancelFriendRequest(myUserId, theOtherUserId)
    .then(() => {
      res.send({ success: "ok" });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//addfriend
app.get("/addfriend/:id", (req, res) => {
  const theOtherUserId = req.params.id;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const myUserId = parseInt(req.cookies.user);
  db.friendRequest(myUserId, theOtherUserId)
    .then(() => {
      res.send({ success: "ok" });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//upload annoying avatar!
app.post("/upload_avatar", (req, res) => {
  const { avatar } = req.body;
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const userId = parseInt(req.cookies.user);
  console.log("cookii", userId);
  db.updateAvatar(userId, avatar)
    .then(() => {
      res.send({ success: "ok" });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: err });
    });
});

//editUserBio

app.post("/editbio", (req, res) => {
  console.log("req.body:", req.body);
  const { bioText } = req.body;
  if (!req.cookies.user) {
    return res.send({
      error: "You are not Log In"
    });
  }
  const userId = parseInt(req.cookies.user);

  console.log("editBio:", userId, req.body.biotext);
  db.editUserBio(userId, req.body.biotext)

    .then(results => {
      if (results) {
        console.log(results);
        res.send({ success: "ok", results: results });
      }
    })
    .catch(err => res.send({ error: err }));
});

app.get("*", function(req, res) {
  // if (!req.session.userId) {
  //     res.redirect('/welcome');
  // } else {
  res.sendFile(__dirname + "/index.html");
  // }
});

// io.on("connection", function(socket) {
//   console.log(`socket with the id ${socket.id} is now connected`);
//
//   socket.on("disconnect", function() {
//     console.log(`socket with the id ${socket.id} is now disconnected`);
//   });
//
//   socket.on("thanks", function(data) {
//     console.log(data);
//   });
//
//   socket.emit("welcome", {
//     message: "Welome. It is nice to see you"
//   });
// });

// io.on('connection', socket => {
//   console.log('New connection', socket.id);
//
//   socket.on('welcome', function(data) {
//     console.log(data);
//     socket.emit('thanks', {
//       	message: 'Thank you. It is great to be here.'
//     });
// });

// socket.on('disconnect', () =>
// console.log('disconnection', socket.id);)
// });

//message to everybody
// io.emit('TAKE CARE');
//useful for friend request to receive message&fr
// io.sockets.sockets[myId].emit('');
//useful for everybody message accept a socket
// socket.broadcast.emit('presence', {
//   message: 'i am here'
//
// });

app.get("/", function(req, res) {
  // just a normal route
  res.sendStatus(200);
});


const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

server.listen(8080);

const onlineUsers = {};

io.on("connection", socket => {
  var cookies = cookie_reader.parse(socket.handshake.headers.cookie);
  var connectedUserId = cookies.user;

  // get this user from db
  onlineUsers[socket.id] = parseInt(connectedUserId);

  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
  });

  const dbusers = Object.values(onlineUsers);
  console.log(onlineUsers, dbusers);

  db.getUsersByIds(dbusers).then(({ rows }) => {
    socket.emit("onlineUsers", {
      onlineUsers: rows
    });
  });
  // const { userId } = socket.request.session;
  // if (!userId) {
  //   return socket.disconnect();
  // }
  // //send socket the full list of onlin users
  // onlineUsers[socket.id] = userId;
  //
  // db.getUsersByIds().then(({ rows }) => {
  //   socket.emit("onlineUsers", {
  //     onlineUsers: rows
  //   });
  // });
});
