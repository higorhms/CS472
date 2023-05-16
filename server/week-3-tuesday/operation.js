const getResult = (operation, first, second) => {
  first = +first;
  second = +second;

  switch(operation){
    case "+":
      return {
        operation: "Sum",
        result: first + second,
      }
    case "-":
      return {
        operation: "Subtraction",
        result: first - second,
      }
    case "/":
      return {
        operation: "Division",
        result: first / second,
      }
    case "*":
      return {
        operation: "Multiplication",
        result: first * second,
      }
  }
}

exports.execute = function (req,res,vals) {
  const { operation, first, second } = vals;

  var result = getResult(operation, first, second); 
  
  parseInt(first) + parseInt(second);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`
    <!DOCTYPE html>
    <html>
      <head><meta charset=\"utf-8\"/>
        <title>Calculator Web Site</title>
        <style>
          body{
            text-align: center;
            border: 1px solid #666;
            padding: 50px;
            max-width: 30%;
            margin: 50px auto;
          }
        </style>
      </head>
        <body>
          <p>The ${result.operation} is: ${String(result.result)}</p>
          <a href="http://localhost:8080/">Home</a>
        </body>
    </html>
  `);
  return res.end();
};