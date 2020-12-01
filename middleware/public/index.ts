import Server from './server';
import Monitor from './monitor';

(async () => {
  new Server();
})();

(async () => {
  new Monitor(
    'localhost:3000',
    'localhost:4000'
  );
})();