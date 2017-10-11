module.exports = function (req, res, next) {
  res.sseSetup = function() {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  res.sseSend = function(data) {
    res.write("data: " + JSON.stringify(calclulateCPUAverage(data)) + "\n\n");
  }

  next()
}

function calclulateCPUAverage(data){
  let total=0,idle=0;
  for(cpu of data){
      let times = cpu.times;
      for(item in times){
        total += times[item];
      }
      idle += times.idle;
  }
  //console.log(idle)
  //console.log(total)
  idle =idle / data.length;
  total= total / data.length;
  return Math.round(100- idle/total*100)+Math.floor(Math.random() * 6) + 1;
}
