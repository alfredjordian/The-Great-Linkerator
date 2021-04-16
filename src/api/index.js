import axios from 'axios';

export async function getLinks() {
  try {
    const { data : {links}} = await axios.get('/api/links');
    return links;
  } catch (error) {
    throw error;
  }
}

export async function createLink(date, url, comments, tags) {
  try {
    const { data : {links}} = await axios.post('/api/links', {
      date,
      url,
      comments,
      tags
    });
    return links;
  } catch (error) {
    throw error;
  }
}

export async function updateLink(date, url, count, comment, tag, linkId) {
  try {
    const { data : {links}} = await axios.patch(`/api/link/${linkId}`, {
      date,
      url,
      count,
      comment,
      tag,
    });
    return links;
  } catch (error) {
    throw error;
  }
}


export async function destroyLink(linkId) {
 
  try {
    const { data : {message} } = await axios.delete(`/api/link/${linkId}`);
    return message;
  } catch (error) {
    throw error;
  }
}


export async function getComments() {
  try {
    const { data : {comments}} = await axios.get('/api/comments');
    return comments;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data : {tags}} = await axios.get('/api/tags');
    return tags;
  } catch (error) {
    throw error;
  }
}



// Step 1: Use this getLinks mock data to build frontend
// Step 2: Then move mock data into Api Router in a Basic way
// Step 3: Finish DB Queries and then make apiRouter Pull and res.send() on that route
// Step 4: Make the getLinks() helper function do an await fetch call
// Step 5: Stare in awe that everything works
// RUN CLIENT:DEV AND SERVER:DEV DURING THE API/DB PORTION TO TEST.



// Link the return info to the api, then replace return call with a fetch

// routes/index.js
// apiRouter.get('/links', (req, res) => {
//   // db call
//   // const links = await getLinks() //db getLinks 
//   res.send([
//     {
//       comments : ['str1', 'str2', 'str3'],
//       count: 1,
//       link: 'url',
//       tags: ['tag1', 'tag2', 'tag3']
//     }
//   ])
// })