import startDatabaseConnection from '@infra/database/typeorm';

console.log('⏳ Connecting to the database...');

startDatabaseConnection()
  .then(async () => {
    console.log('👌 Connection established!');

    try {
      console.log('⏳ Starting server...');

      const app = (await import('./config/app')).default;

      app.listen(3333, () => {
        console.log(`🚀 Server is running at http://localhost:3333\n`);
      });
    } catch (error) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        '---------------------------------------'
      );
      console.log(
        '\x1b[31m%s\x1b[0m',
        '---- Server initialization failure ----'
      );
      console.log(
        '\x1b[31m%s\x1b[0m',
        '---------------------------------------'
      );

      console.log('\n', error, '\n');
    }
  })
  .catch(err => {
    console.log('\x1b[31m%s\x1b[0m', '-------------------------------------');
    console.log('\x1b[31m%s\x1b[0m', '---- Database connection failed ----');
    console.log('\x1b[31m%s\x1b[0m', '-------------------------------------');

    console.log('\n');

    console.error(err);
  });
