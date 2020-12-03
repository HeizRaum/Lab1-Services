import Server from './server';
import Monitor from './monitor';

(async () => {
  new Server();
})();

(async () => {
  new Monitor(
    { name: 'server1', host: 'localhost', port: '8000', path: '/' },
    { name: 'server2', host: 'localhost', port: '8001', path: '/' },
  );
})();