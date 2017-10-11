module.exports = function (req, res, next) {
  res.sseSetup = function() {
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
  return Math.round(100- idle/total*100);
}
