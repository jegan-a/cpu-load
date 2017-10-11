module.exports = function (req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  res.sseSend = function(data) {
    //res.write("data: " + JSON.stringify(calclulateCPUAverage(data)) + "\n\n");
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  next()
}

function calclulateCPUAverage(data){
  console.log(data);
  let total=0,ideal=0;
  if(data){
    for( let {times} of data){

       total += times.user + times.sys+times.ideal;
       ideal += times.ideal;
    }
  }

  return ideal/total;
}
