// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

const { createLink, createComment, getLinks, createTag } = require('./links');

async function connect() {
  await client.connect();
}

async function buildTables() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS links_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS links;
  `);


    await client.query(`
   
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        date TEXT NOT NULL,
        url TEXT NOT NULL,
        count INT NOT NULL,
    
      );
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        comment TEXT NOT NULL,
        "linkId" INT references links(id) NOT NULL,
        UNIQUE("linkId", comment)
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tag TEXT UNIQUE NOT NULL,
        "linkId" INT references links(id) NOT NULL,
        UNIQUE("linkId", tag)
        
      );
      CREATE TABLE links_tags (
        id SERIAL PRIMARY KEY,
        "linkId" INT references links(id),
        "tagId" INT references tags(id),
        UNIQUE("linkId", "tagId")
      );
    
    `);
    
      } catch(error) {
        throw error
      }

    // drop tables in correct order

    // build tables in correct order
}

async function populateInitialData() {
  try {
    const linkOne = await createLink({
      count: 1,
      date: new Date().toString(),
      url: 'fake.com',
    });
    
    const commentOne = await createComment({
      linkId: linkOne.id,
      comment: 'this site is so fake'
    });
    const tagOne = await createTag({
      linkId: linkOne.id,
      tag: 'deception'
    });
    
    swag = await getLinks()
    console.log(swag)
  } catch (error) {
    throw error;
  }
}

connect()
  .then(buildTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());