var koa = require('koa');
var app = module.exports = new koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app.use(cors());

app.use(middleware);

function middleware(ctx, next) {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${start.toLocaleTimeString()} ${ctx.response.status} ${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });
}

const events = [
  { id: 1, name: "Event A", team: "Conference Team", details: "Annual industry conference", status: "in progress", participants: 200, type: "conference" },
  { id: 2, name: "Event B", team: "Concert Team", details: "Live music concert", status: "planning", participants: 5000, type: "concert" },
  { id: 3, name: "Event C", team: "Exhibition Team", details: "Art and innovation exhibition", status: "completed", participants: 1000, type: "exhibition" },
  { id: 4, name: "Event D", team: "Sports Team", details: "Annual sports tournament", status: "on hold", participants: 300, type: "sports tournament" },
  { id: 5, name: "Event E", team: "Tech Summit Team", details: "Technology summit", status: "in progress", participants: 800, type: "tech summit" },
  { id: 6, name: "Event F", team: "Fashion Show Team", details: "Seasonal fashion showcase", status: "planning", participants: 1500, type: "fashion show" },
  { id: 7, name: "Event G", team: "Wedding Planning Team", details: "Luxury wedding ceremony", status: "completed", participants: 100, type: "wedding" },
  { id: 8, name: "Event H", team: "Educational Team", details: "Educational workshop series", status: "in progress", participants: 300, type: "workshop" },
  { id: 9, name: "Event I", team: "Community Outreach Team", details: "Charity and community outreach", status: "planning", participants: 50, type: "charity" },
  { id: 10, name: "Event J", team: "Film Festival Team", details: "International film festival", status: "completed", participants: 1200, type: "film festival" },
  { id: 11, name: "Event K", team: "Food Festival Team", details: "Culinary delights festival", status: "in progress", participants: 400, type: "food festival" },
  { id: 12, name: "Event L", team: "Health and Wellness Team", details: "Wellness retreat", status: "planning", participants: 80, type: "wellness retreat" },
  { id: 13, name: "Event M", team: "Product Launch Team", details: "New product launch event", status: "on hold", participants: 200, type: "product launch" },
  { id: 14, name: "Event N", team: "Cultural Celebration Team", details: "Multicultural celebration", status: "in progress", participants: 600, type: "cultural celebration" },
  { id: 15, name: "Event O", team: "Science Fair Team", details: "Student science fair", status: "completed", participants: 50, type: "science fair" },
];

const router = new Router();

router.get('/events', ctx => {
  ctx.response.body = events;
  ctx.response.status = 200;
});

router.get('/inProgress', ctx => {
  ctx.response.body = events.filter(project => project.status == "in progress");
  ctx.response.status = 200;
});

router.get('/allEvents', ctx => {
  ctx.response.body = events;
  ctx.response.status = 200;
});

router.get('/event/:id', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.params;
  // console.log("body: " + JSON.stringify(headers));
  const id = headers.id;
  if (typeof id !== 'undefined') {
    const index = events.findIndex(event => event.id == id);
    if (index === -1) {
      const msg = "No entity with id: " + id;
      console.log(msg);
      ctx.response.body = { text: msg };
      ctx.response.status = 404;
    } else {
      let event = events[index];
      ctx.response.body = event;
      ctx.response.status = 200;
    }
  } else {
    ctx.response.body = { text: 'Id missing or invalid' };
    ctx.response.status = 404;
  }
});

const broadcast = (data) =>
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

router.post('/event', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.request.body;
  // console.log("body: " + JSON.stringify(headers));
  const name = headers.name;
  const team = headers.team;
  const details = headers.details;
  const status = headers.status;
  const participants = headers.participants;
  const type = headers.type;
  if (typeof name !== 'undefined'
    && typeof team !== 'undefined'
    && typeof details !== 'undefined'
    && typeof status !== 'undefined'
    && typeof participants !== 'undefined'
    && typeof type !== 'undefined') {
    const index = events.findIndex(event => event.name == name && event.team == team);
    if (index !== -1) {
      const msg = "The entity already exists!";
      console.log(msg);
      ctx.response.body = { text: msg };
      ctx.response.status = 404;
    } else {
      let maxId = Math.max.apply(Math, events.map(event => event.id)) + 1;
      let event = {
        id: maxId,
        name,
        team,
        details,
        status,
        participants,
        type
      };
      events.push(event);
      broadcast(event);
      ctx.response.body = event;
      ctx.response.status = 200;
    }
  } else {
    const msg = "Missing or invalid name: " + name + " team: " + team + " details: " + details
      + " status: " + status + " participants: " + participants + " type: " + type;
    console.log(msg);
    ctx.response.body = { text: msg };
    ctx.response.status = 404;
  }
});

router.put('/enroll/:id', ctx => {
  const headers = ctx.params;
  const id = headers.id;
  if (typeof id !== 'undefined') {
    const index = events.findIndex(event => event.id == id);
    if (index === -1) {
      const msg = "No entity with id: " + id;
      console.log(msg);
      ctx.response.body = { text: msg };
      ctx.response.status = 404;
    } else {
      let event = events[index];
      event.participants++;
      ctx.response.body = event;
      ctx.response.status = 200;
    }
  } else {
    ctx.response.body = { text: 'Id missing or invalid' };
    ctx.response.status = 404;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 2426;

server.listen(port, () => {
  console.log(`🚀 Server listening on ${port} ... 🚀`);
});