  import { Router } from 'express';
  import path from 'path';
  import news from '../models/news.js';
  import ejs from 'ejs';
  import methodoverride from 'method-override';
  const router = Router();
  const __dirname = path.resolve();
  router.use(methodoverride('X-HTTP-Method-Override'));
  router.use(methodoverride('X-HTTP-Method'));
  router.use(methodoverride('X-Method-Override'));
  router.use(
    methodoverride((req, res) => {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
  
  router
    .route('/news')
    .get((req, res) => {
        res.send(news);
    })
    .post((req, res) => {
      news.sort((n1, n2) => {
          if(n1.id < n2.id)
          return -1;
          else if(n1.id > n2.id)
          return 1;
          else
          return 0;
      })
      let el = req.body;
      el.id = news[news.length - 1].id + 1;
      console.log(el);
      news.push(el);
      console.log(news);
      res.redirect("/");
  })
  router
    .route('/news/:id')
    .get((req, res) => {
      // console.log(news[req.params.id - 1]);
      // res.send(news[req.params.id - 1]);
      const newsItem = news.find((item) => item.id == req.params.id);
      console.log(newsItem);
      res.send(newsItem);
    })
    // .delete((req, res) => {
    //   // news.splice(req.params.id - 1, 1);
    //   // res.send("ok");
    //   news.find((item, index) => {
    //     if (item.id == req.params.id) {
    //       news.splice(index, 1);
    //       res.redirect('/');
    //     }
    //   });
    // })
    .delete((req, res) => {
      const toDelete = news.find((n) => n.id == req.params.id);
      if (toDelete) {
        news.splice(news.indexOf(toDelete), 1);
        res.redirect('/');
      }
    })
    .post ((req, res) => {
      const toUpdate = news.find((n) => n.id == req.params.id);
      if (toUpdate) {
        toUpdate.title = req.body.title;
        toUpdate.text = req.body.text;
        res.redirect('/');
      }
    })
    .put((req, res) => {
      const toUpdate = news.find((n) => n.id == req.params.id);
      if (toUpdate) {
        toUpdate.title = req.body.title;
        toUpdate.text = req.body.text;
        res.redirect('/');
      }
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