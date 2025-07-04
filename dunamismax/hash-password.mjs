import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('--- Admin User Creation Script ---');

rl.question('Enter a username for the admin user: ', (username) => {
  rl.question('Enter a password for the admin user: ', (password) => {
    if (!username || !password) {
      console.error('\nUsername and password cannot be empty.');
      rl.close();
      return;
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('\nError hashing password:', err);
        rl.close();
        return;
      }
      
      console.log('\n--- Generated SQL ---');
      console.log('Copy and run the following SQL statement in your MySQL database to create the user:');
      console.log(`
INSERT INTO users (username, password_hash) VALUES ('${username}', '${hash}');
`);
      
      rl.close();
    });
  });
});
