var express = require('express')
  , app = express()
  , sse = require('./sse')
  , os = require('os');

var connections = []
  , votes = {yes: 0, no: 0}

app.engine('jade', require('jade').__express) //__
app.set('view engine', 'jade')

app.use(sse)



app.get('/stream', function(req, res) {
    res.sseSetup()
    setInterval(function() {
    //let time = new Date().toLocaleTimeString()
    //let cpu =os.cpus();
    let cpu =os.loadavg()
    res.sseSend(cpu)
  }, 5000)


  connections.push(res)
})

app.listen(3001, function() {
  console.log('Listening on port 3001...')
})
