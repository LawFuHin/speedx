//set up module
const express = require("express");
const cors = require("cors");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");
http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const moment = require("moment");

//set up app
const app = express();

app.use(
  cors({
    origin: process.env.FONTEND_SERVER,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "photos")));

// --------openai-----------
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// --------openai-----------

app.post("/ai/davinci", async (req, res) => {
  console.log(req.body.prompt);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
});

// ---------------------------------------
//socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FONTEND_SERVER,
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username, room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    await knex
      .select("*")
      .from("messages")
      .where("room", room)
      .limit(100)
      .then((last100Messages) => {
        socket.emit("last_100_messages", last100Messages);
      })
      .catch((err) => console.log(err));
  });

  socket.on("send_message", async (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("receive_message", data);

    await knex("messages")
      .insert({ message, username, room, __createdtime__ })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });
});

// ---------------------------------------

app.get("/", (req, res) => {
  res.send("<h1>Backend Server<h1/>");
  res.json();
});

//api all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await knex("items").select("*");
    res.json(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/search", async (req, res) => {
  var { selectedCategory, searchInput } = req.query;
  console.log(selectedCategory, searchInput);
  if (selectedCategory == "empty" && searchInput == "empty") {
    try {
      await knex
        .select("*")
        .from("items")
        .orderBy("postTime", "desc")
        .then((items) => {
          res.json(items);
        });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } else if (searchInput == "empty") {
    try {
      await knex
        .select("*")
        .from("items")
        .where("category", selectedCategory)
        .orderBy("postTime", "desc")
        .then((items) => {
          res.json(items);
        });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } else if (selectedCategory == "empty") {
    try {
      await knex
        .select("*")
        .from("items")
        .where("itemName", "like", `%${searchInput}%`)
        .orderBy("postTime", "desc")
        .then((items) => {
          res.json(items);
        });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } else {
    try {
      await knex
        .select("*")
        .from("items")
        .where("itemName", "like", `%${searchInput}%`)
        .andWhere("category", selectedCategory)
        .orderBy("postTime", "desc")
        .then((items) => {
          res.json(items);
        });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  //await knex to insert the search_term, search_item of current time, and users id
  // try {
  //   await knex("search").insert({
  //     user_id,
  //     search_term,
  //     search_time: knex.fn.now(),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  let query = await knex("users").where({ username }).first();
  if (!query) {
    const hashed = await bcrypt.hash(password, 10);
    await knex("users").insert({ username, password: hashed });
    res.json("success");
  } else {
    res.json("unsuccess");
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  let query = await knex("users").where({ username }).first();
  if (query) {
    let result = await bcrypt.compare(password, query.password);
    if (result) {
      const payload = {
        id: query.id,
        username: query.username,
      };
      const tokenValue = jwt.sign(payload, process.env.JWT_SECRET);
      const data = {
        token: tokenValue,
        username: query.username,
        id: query.id,
      };
      console.log(data);
      res.json(data);
    }
  } else {
    res.json("unsuccess");
  }
});

app.post("/credential/change/username", async (req, res) => {
  const { old_username, new_username, password } = req.body;
  console.log(req.body);

  let query_old_username = await knex("users")
    .where({ username: old_username })
    .first();

  let query_new_username = await knex("users")
    .where({ username: old_username })
    .first();

  let query_password = await bcrypt.compare(
    password,
    query_old_username.password
  );

  if (query_old_username || !query_new_username || query_password) {
    await knex("users")
      .update({ username: new_username })
      .where({ username: old_username });
    res.json("success");
  } else {
    res.json("Failed");
    res.sendStatus(401);
  }
});

app.post("/credential/change/password", async (req, res) => {
  const { old_password, new_password, username } = req.body;
  console.log(req.body);

  let query_username = await knex("users").where({ username }).first();

  let query_password = await bcrypt.compare(
    old_password,
    query_username.password
  );

  if (query_username || query_password) {
    await knex("users")
      .update({ password: new_password })
      .where({ password: old_password });
    res.json("success");
  } else {
    res.json("Failed");
    res.sendStatus(401);
  }
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  const {
    sellerID,
    seller,
    itemName,
    itemPrice,
    description,
    category,
    photo1Name,
    photo2Name,
    photo3Name,
  } = req.body;

  const [insertedItem] = await knex("items")
    .insert({
      sellerID,
      seller,
      itemName,
      itemPrice,
      description,
      category,
      postTime: knex.fn.now(),
      status: "available",
      visitCount: 0,
      searchCount: 0,
      editTime: knex.fn.now(),
      photo1Name,
      photo2Name,
      photo3Name,
    })
    .returning("*");

  if (req.files) {
    const photo1 = req.files.photo1;
    const photo2 = req.files.photo2;
    const photo3 = req.files.photo3;
    const timenow = Date.now();
    if (photo1) {
      const photo1Name = `${path.extname(photo1.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${insertedItem.id}photo1${photo1Name}`,
        photo1.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );

      await knex("items")
        .where("id", insertedItem.id)
        .update({
          photo1Name: `${timenow}itemid${insertedItem.id}photo1${photo1Name}`,
        });
    }
    if (photo2) {
      const photo2Name = `${path.extname(photo2.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${insertedItem.id}photo2${photo2Name}`,
        photo2.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );
      await knex("items")
        .where("id", insertedItem.id)
        .update({
          photo2Name: `${timenow}itemid${insertedItem.id}photo2${photo2Name}`,
        });
    }

    if (photo3) {
      const photo3Name = `${path.extname(photo3.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${insertedItem.id}photo3${photo3Name}`,
        photo3.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );
      await knex("items")
        .where("id", insertedItem.id)
        .update({
          photo3Name: `${timenow}itemid${insertedItem.id}photo3${photo3Name}`,
        });
    }
  }
});

app.post("/edit", async (req, res) => {
  console.log(req.body);
  const {
    id,
    sellerID,
    seller,
    itemName,
    itemPrice,
    description,
    category,
    photo1Name,
    photo2Name,
    photo3Name,
    status,
  } = req.body;

  await knex("items").where("id", id).update({
    sellerID,
    seller,
    itemName,
    itemPrice,
    description,
    category,
    status,
    photo1Name,
    photo2Name,
    photo3Name,
    editTime: knex.fn.now(),
  });

  if (req.files) {
    const photo1 = req.files.photo1;
    const photo2 = req.files.photo2;
    const photo3 = req.files.photo3;
    const timenow = Date.now();
    if (photo1) {
      const photo1Name = `${path.extname(photo1.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${id}photo1${photo1Name}`,
        photo1.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );

      await knex("items")
        .where("id", id)
        .update({
          photo1Name: `${timenow}itemid${id}photo1${photo1Name}`,
        });
    }
    if (photo2) {
      const photo2Name = `${path.extname(photo2.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${id}photo2${photo2Name}`,
        photo2.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );
      await knex("items")
        .where("id", id)
        .update({
          photo2Name: `${timenow}itemid${id}photo2${photo2Name}`,
        });
    }

    if (photo3) {
      const photo3Name = `${path.extname(photo3.name)}`;
      fs.writeFile(
        `./photos/${timenow}itemid${id}photo3${photo3Name}`,
        photo3.data,
        (err) => {
          if (err) return res.status(500).send(err);
        }
      );
      await knex("items")
        .where("id", id)
        .update({
          photo3Name: `${timenow}itemid${id}photo3${photo3Name}`,
        });
    }
  }
});

app.get("/items/all", async (req, res) => {
  const query = await knex.select("*").from("items");
  res.json(query);
});

app.get("/items/:itemID", async (req, res) => {
  const query_checkID = await knex("items")
    .where("id", req.params.itemID)
    .first();

  if (query_checkID) {
    await knex("items")
      .where("id", req.params.itemID)
      .increment("visitCount", 1);

    const query = await knex
      .select("*")
      .from("items")
      .where("id", req.params.itemID);
    res.json(query);
  } else {
    res.json("empty");
  }
});

app.get("/items/:itemID/visit", async (req, res) => {
  //finish the code
  if (await knex("items").where("id", req.params.itemID).first()) {
    await knex("items")
      .where("id", req.params.itemID)
      .increment("visitCount", 1);
  }
  res.sendStatus(200);
});

app.get("/items/:itemID/search", async (req, res) => {
  //finish the code
  await knex("items")
    .where("id", req.params.itemID)
    .increment("searchCount", 1);
});

app.get("/photos/:photoName", (req, res) => {
  res.sendFile(path.join(__dirname, "photos", req.params.photoName));
});

// app.get("/photos/:photoName", (req, res) => {
//   const photoPath = path.join(__dirname, "photos", req.params.photoName);
//   if (fs.existsSync(photoPath)) {
//     res.sendFile(photoPath);
//   } else {
//     res.sendFile(path.join(__dirname, "photos", "default.jpg"));
//   }
// });

// app.get("/photos/:photoName", (req, res) => {
//   const photoPath = `./photos/${req.params.photoName}`;
//   const defaultPhoto = `./default.jpg`;

//   if (photoPath) {
//     console.log("exist");
//   } else {
//     console.log("not exist");
//   }
// });

app.get("/photos/:photoName", (req, res) => {
  const photoPath = path.join(__dirname, "photos", req.params.photoName);
  const defaultPhoto = path.join(__dirname, "default.jpg");
  fs.access(photoPath, fs.constants.F_OK, (err) => {
    if (!err) {
      res.sendFile(photoPath);
    } else {
      res.sendFile(defaultPhoto);
    }
  });
});

app.get("/query/:queryType", async (req, res) => {
  switch (req.params.queryType) {
    case "new":
      const newItems = await knex("items")
        .where("status", "available")
        .orderBy("postTime", "desc")
        .limit(100);
      res.send(newItems);
      break;

    case "hit":
      const oneDayAgo = moment().subtract(24, "hours").toDate();
      const hitItems = await knex("items")
        .where("status", "available")
        .where("postTime", ">=", oneDayAgo)
        .orderBy("visitCount", "desc")
        .limit(100);

      if (hitItems.length == 0) {
        const topHit = await knex("items")
          .where("status", "available")
          .orderBy("visitCount", "desc")
          .limit(100);
        res.send(topHit);
      } else {
        res.send(hitItems);
      }
      break;

    case "shuffle":
      const shuffleItems = await knex("items")
        .where("status", "available")
        .orderByRaw("RANDOM()")
        .limit(100);
      res.send(shuffleItems);
      break;

    default:
      res.status(400).send({ error: "Invalid query type" });
      break;
  }
});

app.get("/profile/:username", async (req, res) => {
  console.log(req.params.username);
  const profileItems = await knex("items")
    .where("seller", req.params.username)
    .andWhere("status", "available")
    .orderBy("postTime", "desc");
  res.send(profileItems);
});

app.post("/message", async (req, res) => {
  const { message, receiver, sender } = req.body;
  await knex("messages")
    .insert({
      message,
      receiver,
      sender,
      postTime: knex.fn.now(),
    })
    .then(() => {
      console.log("write success", message, receiver, sender);
      res.status(200).send("Message inserted successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Failed to insert message");
    });
});

app.get("/messagelog/:username", async (req, res) => {
  console.log(req.params.username);
  try {
    const messageLog = await knex
      .select()
      .from("messages")
      .where(function () {
        this.where("sender", req.params.username).orWhere(
          "receiver",
          req.params.username
        );
      })
      .orderBy("postTime", "desc")
      .then((results) => {
        res.send(results);
        res.status(200).send("Message log retrieved successfully");
      });
  } catch (error) {
    console.log(error);
  }
});

server.listen(process.env.BACKEND_SERVER_PORT, () => {
  console.log(
    `Backend Server is listening to port ${process.env.BACKEND_SERVER_PORT}`
  );
});
