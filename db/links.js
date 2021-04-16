const { client } = require('./index');
//why are we passing in objects again?
const createLink = async ({count = 0, date, url}) => {
    try {
        const { rows: [link]} = await client.query(`
            INSERT INTO links (count, date, url)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [count, date, url]);

        return link;
    } catch (error) {
        throw error;
    }
}



const getLinks = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * from links;
        `);
        
        const linkIds = rows.map((r) => r.id) // .map the ids to array <- loops over the link objects and returns a new array with the values returned from the function
        const comments = await getCommentsByLinkIds(linkIds);
        // loop over the comments and add them to the appropriate link

        const tags = await getTagsByLinkIds(linkIds)
        
        // loop over the tags and add them to the appropriate link
        return rows;

    } catch (error) {
        throw error;
    }
}

const getComments = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * from links;
        `);
        
        const linkIds = rows.map((r) => r.id) 
        const comments = await getCommentsByLinkIds(linkIds);
    
        return comments;

    } catch (error) {
        throw error;
    }
}

const getTags = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * from links;
        `);
        
        const linkIds = rows.map((r) => r.id) 

        const tags = await getTagsByLinkIds(linkIds)
        
        return tags;
        
    } catch (error) {
        throw error;
    }
}

const getCommentsByLinkIds = async (linkIds) => {

    try {
        const { rows } = await client.query(`
            SELECT * from comments
            Where "linkId" in (${linkIds.join(', ')})
        `);
        return rows

    } catch (error) {
        throw error;
    }
}

const getTagsByLinkIds = async (linkIds) => {

    try {
        const { rows } = await client.query(`
            SELECT * from tags
            Where "linkId" in (${linkIds.join(', ')})
        `);
        return rows

    } catch (error) {
        throw error;
    }
}

/*
UPDATE TABLE_NAME
 SET COLUMN = VALUE
WHERE CONDITION; // id = the id of whatever the links id is

SORT by count
CRUD    
SEARCH FILTER
*/

async function updateLink({linkId, fields = {}}) {

    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ link ] }= await client.query(`
        UPDATE links
        SET ${ setString }
        WHERE id=${ linkId }
        RETURNING *;
      `, Object.values(fields));
  
      return link;
    } catch (error) {
      throw error;
    }
  }

  async function updateComment({linkId, fields = {}}) {
  
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ link ] }= await client.query(`
        UPDATE comments
        SET ${ setString }
        WHERE id=${ linkId }
        RETURNING *;
      `, Object.values(fields));
  
      return link;
    } catch (error) {
      throw error;
    }
  }

  async function updateCount({linkId, fields = {}}) {
  
    console.log(fields)
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ link ] }= await client.query(`
        UPDATE links
        SET ${ setString }
        WHERE id=${ linkId }
        RETURNING *;
      `, Object.values(fields));
  
      return link;
    } catch (error) {
      throw error;
    }
  }

  async function updateTag({linkId, fields = {}}) {
    // const { url, date, count } = fields 
    console.log(fields)
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ link ] }= await client.query(`
        UPDATE tags
        SET ${ setString }
        WHERE id=${ linkId }
        RETURNING *;
      `, Object.values(fields));
  
      return link;
    } catch (error) {
      throw error;
    }
  }


async function destroyLink(linkId) {
    console.log(linkId)
    try {
        await client.query(`
        DELETE FROM comments
        WHERE id = ${linkId};
        `);

        await client.query(`
      DELETE FROM tags
      WHERE id = ${linkId};
      `);

        await client.query(`
      DELETE FROM links
      WHERE id = ${linkId};
      `);
      } catch(error){
         throw error;
        }
  }


// what prevents comments from just not being attached to a link? Shouldn't that be a dependency
const createComment = async ({comment, linkId}) => {
    try{
        const { rows:[result] } = await client.query(`
        INSERT into comments (comment, "linkId")
        VALUES($1, $2)
        RETURNING *;
        `, [comment, linkId]);

        return result
    } catch(error) {
        throw error
    }
}

const createTag = async ({tag, linkId}) => {
    try{
        const { rows:[result] } = await client.query(`
        INSERT into tags (tag, "linkId")
        VALUES($1, $2)
        RETURNING *;
        `, [tag, linkId]);

        return result
    } catch(error) {
        throw error
    }
}



module.exports = {
    createLink,
    getLinks,
    getComments,
    createComment,
    getCommentsByLinkIds,
    createTag,
    getTags,
    updateLink,
    destroyLink,
    updateComment,
    updateTag,
    updateCount
}