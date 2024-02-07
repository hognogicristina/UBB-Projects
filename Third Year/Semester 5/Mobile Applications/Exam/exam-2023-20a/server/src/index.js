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


const workouts = [
  { id: 1, name: "Jogging", type: "Cardio", duration: 30, calories: 250, date: "2023-02-19", notes: "Ran in the park" },
  { id: 2, name: "Weightlifting", type: "Strength", duration: 60, calories: 400, date: "2023-02-18", notes: "Did squats and bench press" },
  { id: 3, name: "Yoga", type: "Flexibility", duration: 45, calories: 150, date: "2023-02-17", notes: "Focused on deep breathing and stretching" },
  { id: 4, name: "Swimming", type: "Cardio", duration: 45, calories: 400, date: "2023-02-16", notes: "Swam laps at the pool" },
  { id: 5, name: "Cycling", type: "Cardio", duration: 60, calories: 350, date: "2023-02-15", notes: "Biked around the city" },
  { id: 6, name: "Pilates", type: "Flexibility", duration: 45, calories: 200, date: "2023-02-14", notes: "Worked on core strength and balance" },
  { id: 7, name: "Boxing", type: "Cardio", duration: 60, calories: 500, date: "2023-02-13", notes: "Practiced punches and footwork" },
  { id: 8, name: "Hiking", type: "Cardio", duration: 120, calories: 600, date: "2023-02-12", notes: "Explored a nearby trail" },
  { id: 9, name: "Zumba", type: "Cardio", duration: 60, calories: 400, date: "2023-02-11", notes: "Danced to Latin music" },
  { id: 10, name: "CrossFit", type: "Strength", duration: 75, calories: 500, date: "2023-02-10", notes: "Did a series of high-intensity exercises" },
  { id: 11, name: "Barre", type: "Flexibility", duration: 60, calories: 300, date: "2023-02-09", notes: "Used a ballet barre for resistance training" },
  { id: 12, name: "Tennis", type: "Cardio", duration: 90, calories: 700, date: "2023-02-08", notes: "Played singles with a friend" },
  { id: 13, name: "Gymnastics", type: "Flexibility", duration: 60, calories: 350, date: "2023-02-07", notes: "Worked on handstands and cartwheels" },
  { id: 14, name: "Rowing", type: "Cardio", duration: 45, calories: 400, date: "2023-02-06", notes: "Used a rowing machine at the gym" },
  { id: 15, name: "Martial Arts", type: "Strength", duration: 90, calories: 600, date: "2023-02-05", notes: "Learned self-defense techniques" },
  { id: 16, name: "Hatha Yoga", type: "Flexibility", duration: 60, calories: 200, date: "2023-02-04", notes: "Practiced sun salutations and held poses for 5-10 breaths." },
  { id: 17, name: "Vinyasa Flow", type: "Cardio", duration: 75, calories: 400, date: "2023-02-03", notes: "Moved through a series of poses in sync with breath." },
  { id: 18, name: "Restorative Yoga", type: "Flexibility", duration: 90, calories: 150, date: "2023-02-02", notes: "Used props to support the body in gentle, relaxing poses." },
  { id: 19, name: "Yin Yoga", type: "Flexibility", duration: 60, calories: 100, date: "2023-02-01", notes: "Held poses for several minutes to stretch connective tissues." },
  { id: 20, name: "Power Yoga", type: "Cardio", duration: 90, calories: 500, date: "2023-01-31", notes: "Moved through a challenging sequence at a fast pace." }
];

const router = new Router();
router.get('/all', ctx => {
  ctx.response.body = workouts;
  ctx.response.status = 200;
});

router.get('/types', ctx => {
  const types = workouts.map(obj => obj.type);
  const unique = new Set(types);
  ctx.response.body = [...unique];
  ctx.response.status = 200;
});

router.get('/workouts/:type', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.params;
  const type = headers.type;
  ctx.response.body = workouts.filter(obj => obj.type == type);
  ctx.response.status = 200;
});

const broadcast = (data) =>
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

router.post('/workout', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.request.body;
  // console.log("body: " + JSON.stringify(headers));
  const name = headers.name;
  const type = headers.type;
  const duration = headers.duration;
  const calories = headers.calories;
  const date = headers.date;
  const notes = headers.notes;
  if (typeof name !== 'undefined'
    && typeof type !== 'undefined'
    && typeof duration !== 'undefined'
    && typeof calories !== 'undefined'
    && typeof date !== 'undefined'
    && typeof notes !== 'undefined') {
    const index = workouts.findIndex(obj => obj.name == name && obj.type == type);
    if (index !== -1) {
      const msg = "Workout already exists!";
      console.log(msg);
      ctx.response.body = { text: msg };
      ctx.response.status = 404;
    } else {
      let maxId = Math.max.apply(Math, workouts.map(obj => obj.id)) + 1;
      let obj = {
        id: maxId,
        name,
        type,
        duration,
        calories,
        date,
        notes
      };
      workouts.push(obj);
      broadcast(obj);
      ctx.response.body = obj;
      ctx.response.status = 200;
    }
  } else {
    const msg = "Missing or invalid name: " + name + " type: " + type
      + " duration: " + duration + " calories: " + calories
      + " date: " + date + " notes: " + notes;
    console.log(msg);
    ctx.response.body = { text: msg };
    ctx.response.status = 404;
  }
});

router.del('/workout/:id', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.params;
  // console.log("body: " + JSON.stringify(headers));
  const id = headers.id;
  if (typeof id !== 'undefined') {
    const index = workouts.findIndex(obj => obj.id == id);
    if (index === -1) {
      const msg = "No property with id: " + id;
      console.log(msg);
      ctx.response.body = { text: msg };
      ctx.response.status = 404;
    } else {
      let obj = workouts[index];
      workouts.splice(index, 1);
      ctx.response.body = obj;
      ctx.response.status = 200;
    }
  } else {
    ctx.response.body = { text: 'Id missing or invalid' };
    ctx.response.status = 404;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 2320;

server.listen(port, () => {
  console.log(`🚀 Server listening on ${port} ... 🚀`);
});