var socket = io.connect('http://localhost:4000');
var repettion = 1,
  x = 50,
  y = 250,
  i = 0,
  Xtr = 0,
  Ytr = 0,
  rot = 0,
  id = 'lineAB',
  linedraw = `M  ${x}   ${y} `;

var command1 = document.getElementById('txarea');
window.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    console.log(command1.value);
    socket.emit('commands', {
      command1: command1.value
    });
    command1.value = "";
  }
}, false);

function colorFun(color) {
  document.getElementById("turtle").setAttribute("stroke", color);
  i = i + 1;
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace             id='lineAB'+i;
  id = "lineAB" + i;
  linedraw = `M  ${x} ${y} `;
  console.log(id);
  newElement.setAttribute("d", linedraw);
  newElement.setAttribute("id", id, "fill-opacity", "0");
  newElement.setAttribute("fill-opacity", "0");
  newElement.setAttribute("stroke-width", "3");
  svg.appendChild(newElement);
  document.getElementById(id).setAttribute("stroke", color);
}

function move(value) {
  y = y + mathSin(value);
  x = x + mathCos(value);
  linedraw = `M  ${x} ${y} `;
  Xtr = Xtr + mathCos(value);
  Ytr = Ytr + mathSin(value);
  document.getElementById("turtle").setAttribute("transform", `translate(${Xtr},${Ytr}) rotate(${rot}, 50 250)`);
  document.getElementById("turtle").setAttribute("stroke", "red");
  i = i + 1;
  var svg = document.getElementsByTagName('svg')[0]; //Get svg element
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  id = 'lineAB' + i;
  linedraw = `M  ${x} ${y} `;
  newElement.setAttribute("d", linedraw);
  newElement.setAttribute("id", id, "fill-opacity", "0");
  newElement.setAttribute("fill-opacity", "0");
  newElement.setAttribute("stroke-width", "3");
  svg.appendChild(newElement);
  document.getElementById(id).setAttribute("stroke", "red");
}

function forward(value) {
  i = i + 1;
  linedraw = `${linedraw}  l  ${mathCos(value)} ${mathSin(value)}`;
  y = y + mathSin(value);
  x = x + mathCos(value);
  Xtr = Xtr + mathCos(value);
  Ytr = Ytr + mathSin(value);
  document.getElementById(id).setAttribute("d", linedraw);
  document.getElementById("turtle").setAttribute("transform", `translate(${Xtr},${Ytr}) rotate(${rot}, 50 250)`);
}

function rotate(value) {
  rot = rot + parseInt(value);
  console.log(rot);
  document.getElementById("turtle").setAttribute("transform", `translate(${Xtr},${Ytr}) rotate(${rot}, 50 250)`);
}

socket.on('commands', function(data) {
  let action = data.command1.split(" ");
  let j = 0;
  if (action[j] == "repeat") {
    repettion = action[j + 1];
    j = j + 2;
  }
  for (let k = 0; k < repettion; k++) {
    j = 0;
    while (j < action.length) {
      switch (action[j]) {
        case 'fd':
          forward(action[j + 1]);
          break;
        case 'rt':
          rotate(action[j + 1]);
          break;
        case 'mv':
          move(action[j + 1]);
          break;
        case 'green':
          colorFun("green");
          break;
        case 'red':
          colorFun("red");
          break;
        case 'blue':
          colorFun("blue");
          break;
        case 'black':
          colorFun("black");
          break;

      }
      j = j + 2;
    }

  }
});
