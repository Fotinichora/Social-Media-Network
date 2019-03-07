const express = require('express');
const app = express();
const compression = require('compression');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const db = require("./db");
app.use(cookieParser());

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// function requireLoggedInUser(req, res, next) {
//     if (!req.session.userId) {
//         res.sendStatus(403);
//     } else {
//         next();
//     }
// }


// app.get('/user', requireLoggedInUser, (req, res) => {
//     db.getUserById(req.session.userId).then(({rows}) {
//         const user = rows.pop();
//         if (!user.image) {
//             user.image = '/default.jpg';
//         }
//     });
// });


// app.get('/welcome', function(req, res) {
//     if (req.session.userId) {
//         res.redirect('/');
//     } else {
//         res.sendFile(__dirname + '/index.html');
//     }
// });



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
        res.redirect("thanks");
      } else {
        res.render("login", {
          //layout: "main",
          error: "Something went rong TRY AGAIN!!!"
        });
      }
    })
    .catch(console.log(err => console.log("errr", err)));
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
