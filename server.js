const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, data) => {
    res.json(data.rows);
  });
});

app.post('/api/users', (req, res) => {
  db.query(`INSERT INTO users(email,username,password) VALUES('${req.body.email}','${req.body.username}','${req.body.password}')`, err => {
    if (err) console.log(err);
  });
});

app.get('/api/stories', (req, res) => {
  const stories = [
    { title: 'New Dog Park Opening Soon', author: 'Zach Coursey', comments: 1, likes: 4, categories: ['recreation', 'business'], liked: false, disliked: false, time: new Date('August 25, 2018 12:24:53'), latitude: 37.708168, longitude: -122.468893,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quis enim lobortis scelerisque fermentum dui faucibus. Viverra maecenas accumsan lacus vel facilisis volutpat est. Leo vel orci porta non. Sit amet venenatis urna cursus eget nunc. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Augue ut lectus arcu bibendum at varius vel pharetra. Ullamcorper dignissim cras tincidunt lobortis. Est velit egestas dui id ornare arcu odio ut sem. Quam elementum pulvinar etiam non. Nunc sed augue lacus viverra vitae. Odio eu feugiat pretium nibh. Malesuada fames ac turpis egestas.'
    },
    { title: 'Construction In The Downtown Area', author: 'John Doe', comments: 0, likes: 3, categories: ['traffic', 'alert'], liked: true, disliked: false, time: new Date('August 25, 2018 08:57:27'), latitude: 37.900222, longitude: -122.551254,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque id diam vel quam elementum pulvinar etiam. Blandit volutpat maecenas volutpat blandit aliquam etiam. Cursus metus aliquam eleifend mi. Lacus laoreet non curabitur gravida arcu. Sed arcu non odio euismod. Purus in mollis nunc sed id. Praesent elementum facilisis leo vel fringilla est ullamcorper. Massa sapien faucibus et molestie ac feugiat. Pretium lectus quam id leo. Aliquet nec ullamcorper sit amet risus nullam eget felis. Nec dui nunc mattis enim ut tellus.'
    },
    { title: 'Watch Out For Pidgeons', author: 'Jane Doe', comments: 3, likes: 1, categories: ['gossip'], liked: false, disliked: true, time: new Date('August 24, 2018 17:14:44'), latitude: 37.755957, longitude: -122.416702,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit amet nisl purus. Sed blandit libero volutpat sed cras ornare. Odio euismod lacinia at quis risus sed. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Lobortis elementum nibh tellus molestie nunc non blandit. Ac turpis egestas sed tempus urna. Risus ultricies tristique nulla aliquet enim tortor at auctor. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Maecenas accumsan lacus vel facilisis volutpat est. Morbi tempus iaculis urna id. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.'
    },
    { title: 'New Dog Park Opening Soon', author: 'Zach Coursey', comments: 1, likes: 4, categories: ['recreation', 'business'], liked: true, disliked: false, time: new Date('August 25, 2018 06:46:37'), latitude: 37.894803, longitude: -122.061175,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quis enim lobortis scelerisque fermentum dui faucibus. Viverra maecenas accumsan lacus vel facilisis volutpat est. Leo vel orci porta non. Sit amet venenatis urna cursus eget nunc. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Augue ut lectus arcu bibendum at varius vel pharetra. Ullamcorper dignissim cras tincidunt lobortis. Est velit egestas dui id ornare arcu odio ut sem. Quam elementum pulvinar etiam non. Nunc sed augue lacus viverra vitae. Odio eu feugiat pretium nibh. Malesuada fames ac turpis egestas.'
    },
    { title: 'Construction In The Downtown Area', author: 'John Doe', comments: 0, likes: 3, categories: ['traffic', 'alert'], liked: true, disliked: false, time: new Date('August 24, 2018 07:59:04'), latitude: 37.665576, longitude: -122.089417,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque id diam vel quam elementum pulvinar etiam. Blandit volutpat maecenas volutpat blandit aliquam etiam. Cursus metus aliquam eleifend mi. Lacus laoreet non curabitur gravida arcu. Sed arcu non odio euismod. Purus in mollis nunc sed id. Praesent elementum facilisis leo vel fringilla est ullamcorper. Massa sapien faucibus et molestie ac feugiat. Pretium lectus quam id leo. Aliquet nec ullamcorper sit amet risus nullam eget felis. Nec dui nunc mattis enim ut tellus.'
    },
    { title: 'Watch Out For Pidgeons', author: 'Jane Doe', comments: 3, likes: 1, categories: ['alert'], liked: false, disliked: false, time: new Date('August 25, 2018 21:35:32'), latitude: 37.444216, longitude: -122.149419,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit amet nisl purus. Sed blandit libero volutpat sed cras ornare. Odio euismod lacinia at quis risus sed. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Lobortis elementum nibh tellus molestie nunc non blandit. Ac turpis egestas sed tempus urna. Risus ultricies tristique nulla aliquet enim tortor at auctor. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Maecenas accumsan lacus vel facilisis volutpat est. Morbi tempus iaculis urna id. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.'
    }
  ];
  res.json(stories);
});

app.listen(port, () => console.log(`Listening at port ${port}`));
