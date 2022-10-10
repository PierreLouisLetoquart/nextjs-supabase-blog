const express = require('express');
const app = express();

const db = {
    articles: [
      {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
      // ...
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
      // ...
    ]
  }

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/api/articles', (req,res) => {
    res.send(db);
})

app.get('/api/articles/:articleId', (req,res) => {
    const searchId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const article = db.articles.find(article=>article.id=== req.params.articleId);
    if (!article) res.status(404).send('Article non trouvé ');
    res.send("Article trouvé !");
})

app.get('/api/posts/:year/:month', (req,res)=> {
    res.send(req.params);
})

app.listen(3000,() => console.log('Ecoute le port 3000...'));

