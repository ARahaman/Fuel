
const router = require('./api');
const Worksheet = require('../models/worksheet');

router.get('/worksheets', async (req, res, next) => {
  const worksheets = await Worksheet.getRecrods().populate('workerid')
  res.json(worksheets);
});

router.get('/worksheets/worker', async (req, res, next) => {
  let worksheets = {data: []};
  if(req.user){
    worksheets = await Worksheet.getRecrod( { 'workerid': req.user._id.toString(), 'createdOn': (new Date()).toLocaleDateString()} );
  }
  res.json(worksheets);
});

router.post('/worksheets', async (req, res, next) => {
  let worksheets = null;
  if (req.body) {
    if(req.id && req.provider){
        worksheets = await Worksheet.createRecrod(req.body)
    } else {
        worksheets  = await Worksheet.createRecrod({ 
            workerid: req.user._id,
            worksheet: JSON.stringify(req.body)
        });
    } 
    res.json(worksheets)
  } else {
    res.json({
      error: 'The input field is empty'
    })
  }
});

router.put('/worksheets/:id', async (req, res, next) => {
  const worksheets = await Worksheet.updateRecrod({ '_id': req.params.id }, req.body)
  res.json(worksheets);
})

router.delete('/worksheets/:id', async (req, res, next) => {
  const worksheets = await Worksheet.deleteRecrod({ '_id': req.params.id })
  res.json(worksheets);
})

module.exports = router;
