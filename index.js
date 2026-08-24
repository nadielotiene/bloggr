import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

let posts = [
  { id: "1", title: "First Post", body: "Hello world" }
]

app.get('/', (req, res) => {
  res.render('index.ejs', { posts });
});

app.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render('index.ejs', { post });
});

app.post('/submit', (req, res) => {
  const id = String(posts.length + 1);
  const postTitle = req.body["title"];
  const postBody = req.body["post-body"];
  posts.push( {id: id, title: postTitle, body: postBody} );
  res.redirect('/');
});

app.patch('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  post.title = req.body.title;
  post.body = req.body.body;
  res.redirect(`/${post.id}`);
});

app.delete("/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});