const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride('_method')); // For handling PUT and DELETE requests
const { v4: uuidv4 } = require('uuid');
uuidv4(); // Generate a unique ID for each post


app.use(methodOverride('_method')); // For handling PUT and DELETE requests
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, 'public')));




let posts = [
    {   
        id : uuidv4(),
        username: "Satya",
        content : "This is my first post"
    },
    {
        id : uuidv4(),
        username: "John",
        content : "This is my second post"
    },
    {   
        id : uuidv4(),
        username: "Jane",
        content : "This is my third post"
    },
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id}= req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.redirect("/posts");

});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});