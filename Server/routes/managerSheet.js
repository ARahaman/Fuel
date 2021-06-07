
const router = require('./api');
const Managersheet = require('../models/managersheet');

router.get('/managersheet', async (req, res, next) => {
  const managersheet = await Managersheet.getRecrods().populate('managerid')
  res.json(managersheet);
});

router.post('/managersheet', async (req, res, next) => {
  let managersheet = null;
  if (req.body) {
    if(req.id && req.provider){
        managersheet = await Managersheet.createRecrod(req.body)
    } else {
        managersheet  = await Managersheet.createRecrod({ 
            workerid: req.user._id,
            worksheet: JSON.stringify(req.body)
        });
    } 
    res.json(managersheet)
  } else {
    res.json({
      error: 'The input field is empty'
    })
  }
});

router.put('/managersheet/:id', async (req, res, next) => {
  const managersheet = await Managersheet.updateRecrod({ '_id': req.params.id }, req.body)
  res.json(managersheet);
})

router.delete('/managersheet/:id', async (req, res, next) => {
  const managersheet = await Managersheet.deleteRecrod({ '_id': req.params.id })
  res.json(managersheet);
})

module.exports = router;
