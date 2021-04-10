const apiRouter = require('express').Router();
const { createLink, getLinks } = require('../db/links');


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
  
  const { url, date, count, description } = req.body;
  const link = await createLink({ url, date, count, description })
  res.send({ link })

  } catch(error) {
    throw error
  }
})




module.exports = apiRouter;
