
const router = require('./api');
const User = require('../models/user');
const atob = require('atob');

router.get('/users', async (req, res, next) => {
  const users = await User.getRecrods()
  res.json(users);
});

router.get('/users/:id', async (req, res, next) => {
  const users = await User.getRecrod( { '_id': req.params.id} )
  res.json(users);
});

router.post('/users', async (req, res, next) => {
  let user = null;
  if (req.body) {
    if(req.id && req.provider){
      user = await User.createRecrod(req.body)
    } else {
      if(req.body.type==="signin"){
        user = await User.findOne({ name: req.body.username, token: req.body.password })
        if(!user){
          user = {}
        }
      } else {
        user  = await User.createRecrod({ 
          name: req.body.username, 
          id: (+new Date()), 
          provider: 'local',
          token: req.body.password
        });
      }
    } 
    res.json(user)
  } else {
    res.json({
      error: 'The input field is empty'
    })
  }
});

router.put('/users/:id', async (req, res, next) => {
  const user = await User.updateRecrod({ '_id': req.params.id }, req.body)
  res.json(user);
})

router.delete('/users/:id', async (req, res, next) => {
  const user = await User.deleteRecrod({ '_id': req.params.id })
  res.json(user);
})

module.exports = router;
