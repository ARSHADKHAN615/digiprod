require('dotenv').config();
const sequelize = require('../config/database');
const seedData = require('../seeders/sampleData');

async function seed() {
  try {
    // Sync database (this will drop all tables if force is true)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Run seeder
    await seedData();
    console.log('All done!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();