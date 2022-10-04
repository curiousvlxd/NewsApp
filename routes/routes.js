  import { Router } from 'express';
  import path from 'path';
  import news from '../models/news.js';
  import ejs from 'ejs';
  const router = Router();
  const __dirname = path.resolve();
  router
    .route('/news')
    .get((req, res) => {
        res.send(news);
    })
   .post((req, res) => {
        console.log(req.body);
        news.push(req.body);
        res.redirect('/news');
   });
  router
    .route('/news/:id')
    .get((req, res) => {
      console.log(news[req.params.id - 1]);
      res.send(news[req.params.id - 1]);
    })
    .delete((req, res) => {
      news.splice(req.params.id - 1, 1);
      res.send("ok");
    })
    .put((req, res) => {
      news[req.params.id - 1] = req.body;
      res.send("ok");
    });
  router 
    .route('/')
    .get((req, res) => {
      res.render("index.ejs", {title: "NewsApp", news: news})
      // html = ejs.renderFile(path.resolve(__dirname, "views", "index.ejs"), {title: "NewsApp"}, (err, html) => {
      //   if (err) { throw new Error(err); }
      //   res.send(html);
      // });
    //   res.sendFile(path.resolve(__dirname, "views", "index.ejs"));
    // })
    })
   
    .post((req, res) => {
        res.send("<h1>Hello, I am express server (POST REQUEST)</h1>");
    })
    .delete((req, res) => {
        res.send("<h1>Hello, I am express server (DELETE REQUEST)</h1>");
    })
    .put ((req, res) => {
        res.send("<h1>Hello, I am express server (PUT REQUEST)</h1>");
    });
  router.get("/about", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "about.html"));
  });
  router.get("/posts", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "posts.html"));
  });


  export default router;