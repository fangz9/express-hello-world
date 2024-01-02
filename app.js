const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;


// Initialize app
const app = express();
//  Url Encoded Middle Ware
app.use(express.urlencoded({ extended: true }));

// Enable All CORS(Cross-Origin Resource Sharing) Requests
app.use(cors);

//  Let me store my URI in a variable, this is from the mongodb site
// This is meant to be hidden in an .env file but we will do that later
const uri =
  "mongodb+srv://prybertocode:drkillerbean.@agrointech.eidpvbr.mongodb.net/myUsers?retryWrites=true&w=majority";
// Lets Test the Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Lets Check the connection
const db = mongoose.connection;

// Check for Errors
db.on("error", (err) => {
  console.error(err);
});

// Lets Test Our by hardcoding some data to our mongodb database
// So Lets define something Called a Schema(New database field)
// I'm Defining what will be in the Schema and the data type
const userSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Title: String,
  Email: String,
  Country: String,
  Street: String,
  Zip: Number,
});

const User = mongoose.model("User", userSchema);

// So to direct the localhost:4000/submit to actually submit we do this
// Req is request
// Res is response

app.get("/", (req, res) => res.type('html').send(html));
app.post("/submit", async (req, res) => {
  // Destructuring
  const { firstName, lastName, title, email, country, street, zip } = req.body;

  const newUser = new User({
    First_name: firstName,
    Last_Name: lastName,
    Title: title,
    Email: email,
    Country: country,
    Street: street,
    Zip: zip,
  });

  // Try-Catch For Proper Error Handling

  try {
    await newUser.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


const server = app.listen(port, () => console.log(`App listening on port ${port}!`));
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Private Server!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Don't Touch This Server hahaha Just Kidding
    </section>
  </body>
</html>
`
