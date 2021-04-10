// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

const { createLink } = require('./links');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
      DROP TABLE links_tags;
      DROP TABLE tags;
      DROP TABLE comments;
      DROP TABLE links;
    `);

    await client.query(`
   
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        date TEXT NOT NULL,
        url TEXT NOT NULL,
        count INT NOT NULL,
        description TEXT
      );
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        comment TEXT NOT NULL,
        "linkId" INT references links(id),
        UNIQUE("linkId", comment)
        
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        text TEXT UNIQUE NOT NULL
        
      );
      CREATE TABLE links_tags (
        id SERIAL PRIMARY KEY,
        "linkId" INT references links(id),
        "tagId" INT references tags(id),
        UNIQUE("linkId", "tagId")
      );
    
    `);


    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    throw error;
  }
}


async function populateInitialData() {
  try {
    const linkOne = await createLink({
      count: 1,
      date: new Date().toString(),
      url: 'fake.com',
    });
    console.log(linkOne);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());