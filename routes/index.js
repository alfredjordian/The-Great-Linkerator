const apiRouter = require('express').Router();
const { createLink,
    getLinks,
     getComments,
     getTags, 
     createComment, 
     createTag, 
     destroyLink, 
     updateLink,
     updateComment,
      updateTag,
    updateCount } = require('../db/links');


apiRouter.get("/links", async (req, res, next) => {
  try {
  const links = await getLinks();
  res.send({
    links
  });
  
  } catch(error) {
    
    throw error
  }

});

apiRouter.post('/links', async (req, res) => {
  try {
  
  const { url, date, comments, tags } = req.body;
  const link = await createLink({ url, date })

  
  const comment = await createComment({ comment:comments, linkId: link.id })
  const tag = await createTag({ tag:tags, linkId: link.id })
  link.comment = comment;
  link.tag = tag;
  /*
     const obj = {
       comment,
       linkId: link.id
     }
  */
  res.send({ link })

  } catch(error) {
    throw error
  }
  
})


apiRouter.patch(`/link/:linkId`, async (req, res) => {

  try {
  
  const { date, url, count, comment, tag} = req.body;

  const {linkId} = req.params
  console.log(req.body)
  const link = await updateLink({ linkId, fields: {url, date} })
  console.log('asdhkjalkjh')
  const commentsReturn = await updateComment({ linkId, fields: {comment} })
  const tagsReturn = await updateTag({ linkId, fields: {tag} })
  const countReturn = await updateCount({ linkId, fields:{count} })
  res.send({ link, commentsReturn, tagsReturn, countReturn })

  } catch(error) {
    throw error
  }
  
})

apiRouter.delete('/link/:linkId', async (req, res) => {
  try {
  
  const { linkId } = req.params;
  console.log(req.params)
  const links = await destroyLink( linkId );
  res.send({ 
    message: "Link Deleted"
  });

  } catch(error) {
    throw error
  }
  
})

apiRouter.get('/comments', async (req, res) => {
  try {
  
  const comments = await getComments();

  res.send({ comments })

  } catch(error) {
    throw error
  }
})

// apiRouter.post('/links', async (req, res) => {
//   try {
  
//   const { comments } = req.body;
//   const comment = await createComment({ comment })
//   res.send({ comment })

//   } catch(error) {
//     throw error
//   }
  
// })

apiRouter.get('/tags', async (req, res) => {
  try {
  
  const tags = await getTags()

  res.send({ tags })

  } catch(error) {
    throw error
  }
})



module.exports = apiRouter;
