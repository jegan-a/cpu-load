var express = require('express')
  , app = express()
  , sse = require('./sse')
  , os = require('os');

var connections = []

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.use(sse)

app.get('/stream', function(req, res) {
    res.sseSetup()
    setInterval(function() {
    let cpu =os.cpus();
    res.sseSend(cpu)
  }, 2000)
  connections.push(res)
})

app.listen(3001, function() {
  console.log('Listening on port 3001...')
})
