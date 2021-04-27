# HestiBots.js
The official [HestiBots](https://hestibots.xyz) API wrapper for Node.js

## Installation
Simply run `npm i boats.js`

## Usage
Posting Bot Server Count:
```js
const HestiClient = require('hestibots.js');
const Hesti = new HestiClient('API Key');

Hesti.postStats('Bot ID', SERVER_COUNT, USER_COUNT).then((post) => {
    console.log(post.success);
}).catch(err => {
    console.error(err);
});
```

Getting Bot Info:
```js
const HestiClient = require('hestibots.js');
const Hesti = new HestiClient('API Key');

Boats.Hesti('Bot ID').then((bot) => {
    console.log(bot);
}).catch(err => {
    console.error(err);
});
```

Getting User Info:
```js
const HestiClient = require('hestibots.js');
const Hesti = new HestiClient('API Key');

    Boats.getUser('User ID').then((user) => {
    console.log(user);
}).catch(err => {
    console.error(err);
});
```

Checking if a user voted your bot:
```js
const HestiClient = require('hestibots.js');
const Hesti = new HestiClient('API Key');

Hesti.getVoted('Bot ID', 'User ID').then((voted) => {
    console.log(voted);
}).catch(err => {
    console.error(err);
});
```

## License
[MIT](LICENSE)