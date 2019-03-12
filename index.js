const express = require('express');
const app = express();
const compression = require('compression');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const db = require("./db");
app.use(cookieParser());


app.use(express.static('./public'));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'})); // to put MEGA IMAGES LIKE GOOGLE

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
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
  const { firstname, lastname, email, password, avatar} = req.body;

  db.createUser(firstname, lastname, email, password, avatar)
    .then(results => {
      if (results) {
        res.cookie("user", results.rows[0].id);
        res.send({success:'ok'})
      }
      // else
      //   res.render("register", {
      //     error: "please put your password"
      //   });
    })
    .catch(err => res.send({error:err}));
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.loginUser(email, password)
    .then(results => {

      if (results.rows.length > 0) {
        //console.log(results)
        res.cookie("user", results.rows[0].id);
        res.send({success:'ok'});
      } else {
        res.send({error:'bad password'});
      }
    })
    .catch(console.log(err => console.log("errr", err)));
});



// get the user from database with avatar same time
app.get("/user", (req, res) => {
  if (!req.cookies.user) {
    return res.render("profile", {
      error: "You are not Log In"
    });
  }
  const userId = parseInt(req.cookies.user);
  db.getUser(userId).then((users) => {
    res.send({user:users.rows[0]});
  }).catch((err)=>{
    console.log(err)
    res.send({error:err});
  })
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
  console.log("cookii",userId);
  db.updateAvatar(userId, avatar).then(() => {
    res.send({success:'ok'});
  }).catch((err)=>{
    console.log(err)
    res.send({error:err});
  })
})

//editUserBio

app.post("/editbio", (req, res) => {
  console.log("req.body:", req.body);
  const { bioText} = req.body;
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
        res.send({success:'ok', results:results})
      }
    })
    .catch(err => res.send({error:err}));
  });











app.get('*', function(req, res) {
    // if (!req.session.userId) {
    //     res.redirect('/welcome');
    // } else {
        res.sendFile(__dirname + '/index.html');
    // }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
