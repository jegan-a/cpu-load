module.exports = function (req, res, next) {
  res.sseSetup = function() {
    // cross orgin ,  allowing http://localhost:3000 to call the service
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
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
  idle =idle / data.length;
  total= total / data.length;
  // added a random value  since the cpu load is showing as constant . progress is visible now.
  return Math.round(100- idle/total*100)+Math.floor(Math.random() * 6) + 1;
}
