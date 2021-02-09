// input
// (4,3,2), (2,1,3,1), (3,1,5,2,4), (2,1,4,3), (2,3,1)
// (5,3,2), (6,1,4,7), (3,2,5,6,7), (1,3,4,2), (5,7,3)

var grid = [];
var st;
var textfield;
var Text;
var assigned = false;
var values = [];



function setup() {
  createCanvas(1000, 1000);

  textfield = createInput();
  textfield.changed(newText);
}



function draw() {
  background(255);

  assign();
  if (assigned == true) {
    display_stuff();
    noLoop();
  }
  fill(0);


}

var test1 = 3;
var test2 = 1;

function display_stuff() {
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      grid[i][j].neighbours(i, j);
      grid[i][j].Check(i, j);
      grid[i][j].display();

    }

  }

}

function assign() {
  for (var i = 0; i < values.length; i++) {
    grid[i] = [];
  }

  var x = 30;
  var y = height / 2;
  var t = Math.floor(values.length / 2);

  var cnt = 1;
  if (t > 0) {
    for (var i = t; i < values.length; i++) {
      //grid[i] = [];
      for (var j = 0; j < values[i].length; j++) {
        grid[i].push(new Cell(x, y, 30, values[i][j], color(255, 255, 255)));
        x += grid[i][j].w * sqrt(3);
      }

      y += 1.5 * grid[i][0].w;
      x = 30;
      x += cnt * (grid[i][0].w * sqrt(3) / 2);
      cnt++;
    }

    x = 30;
    y = height / 2;
    cnt = 1;

    for (var i = t; i >= 0; i--) {
      //grid[i] = [];
      for (var j = 0; j < values[i].length; j++) {
        grid[i].push(new Cell(x, y, 30, values[i][j], color(255, 255, 255)));
        x += grid[i][j].w * sqrt(3);
      }

      y -= 1.5 * grid[i][0].w;
      x = 30;
      x += cnt * (grid[i][0].w * sqrt(3) / 2);
      cnt++;
    }




    assigned = true;
  }

}


function Cell(x, y, w, value, C) {

  this.x = x;
  this.y = y;
  this.w = w;
  this.v = value;
  this.N = [];
  this.c = C;

  this.display = function() {
    fill(this.c);
    stroke(0);
    push();
    translate(this.x, this.y);
    beginShape();
    for (var i = 0; i <= 6; i++) {
      vertex(this.w * cos(i * PI / 3 + PI / 6), this.w * sin(i * PI / 3 + PI / 6));

    }
    endShape();
    fill(0);
    text(this.v, 0, 0);
    fill(this.c);
    pop();
  }

  this.neighbours = function(i, j) {
    for (var l = 1; l < this.v; l++) {
      this.N.push(l);
    }

  }

  this.Check = function(i, j) {
    if (i <= Math.floor((values.length / 2) - 1)) {
      if (i - 1 >= 0) {
        if (typeof grid[i - 1][j] != "undefined")
          if (isPresent(this.N, grid[i - 1][j].v)) removeArray(this.N, grid[i - 1][j].v);
      }
      if (i - 1 >= 0) {
        if (typeof grid[i - 1][j - 1] != "undefined")
          if (isPresent(this.N, grid[i - 1][j - 1].v)) removeArray(this.N, grid[i - 1][j - 1].v);
      }
      if (j + 1 < values[i].length) {
        if (typeof grid[i][j + 1] != "undefined")
          if (isPresent(this.N, grid[i][j + 1].v)) removeArray(this.N, grid[i][j + 1].v);
      }

      if (j + 1 < values[i + 1].length) {
        if (typeof grid[i + 1][j + 1] != "undefined")
          if (isPresent(this.N, grid[i + 1][j + 1].v)) removeArray(this.N, grid[i + 1][j + 1].v);
      }

      if (typeof grid[i + 1][j] != "undefined")
        if (isPresent(this.N, grid[i + 1][j].v)) removeArray(this.N, grid[i + 1][j].v);

      if (j - 1 >= 0) {
        if (typeof grid[i][j - 1] != "undefined")
          if (isPresent(this.N, grid[i][j - 1].v)) removeArray(this.N, grid[i][j - 1].v);
      }
    }

    if (i == Math.ceil((values.length / 2) - 1)) {
      if (j - 1 >= 0) {
        if (typeof grid[i][j - 1] != "undefined") {
          if (isPresent(this.N, grid[i][j - 1].v)) removeArray(this.N, grid[i][j - 1].v);
        }
        if (typeof grid[i - 1][j - 1] != "undefined") {
          if (isPresent(this.N, grid[i - 1][j - 1].v)) removeArray(this.N, grid[i - 1][j - 1].v);
        }
        if (typeof grid[i + 1][j - 1] != "undefined") {
          if (isPresent(this.N, grid[i + 1][j - 1].v)) removeArray(this.N, grid[i + 1][j - 1].v);
        }
      }
      if (j + 1 < values[i].length) {
        if (typeof grid[i][j + 1] != "undefined") {
          if (isPresent(this.N, grid[i][j + 1].v)) removeArray(this.N, grid[i][j + 1].v);
        }
        if (typeof grid[i - 1][j] != "undefined") {
          if (isPresent(this.N, grid[i - 1][j].v)) removeArray(this.N, grid[i - 1][j].v);
        }
        if (typeof grid[i + 1][j] != "undefined") {
          if (isPresent(this.N, grid[i + 1][j].v)) removeArray(this.N, grid[i + 1][j].v);
        }
      }
    }
    if (i > Math.ceil((values.length / 2) - 1)) {
      if (j - 1 >= 0) {
        if (typeof grid[i][j - 1] != "undefined") { 
          if (isPresent(this.N, grid[i][j - 1].v)) {
            removeArray(this.N, grid[i][j - 1].v);
          }
        }
      }

        if (typeof grid[i - 1][j] != "undefined") {
          if (isPresent(this.N, grid[i - 1][j].v)) {
            removeArray(this.N, grid[i - 1][j].v);
          }
        }
      
        if (typeof grid[i - 1][j + 1] != "undefined") {
          if (isPresent(this.N, grid[i - 1][j + 1].v)) removeArray(this.N, grid[i - 1][j + 1].v);
        }
      if (j + 1 < values[i].length) {
        if (typeof grid[i][j + 1] != "undefined") {
          if (isPresent(this.N, grid[i][j + 1].v)) removeArray(this.N, grid[i][j + 1].v);
        }
      }
      if (i + 1 < values.length) {
        if (typeof grid[i + 1][j] != "undefined") {
          if (isPresent(this.N, grid[i + 1][j].v)) removeArray(this.N, grid[i + 1][j].v);
        }
      }
      if (i + 1 < values.length && j - 1 > 0) {
        if (typeof grid[i + 1][j - 1] != "undefined") {
          if (isPresent(this.N, grid[i + 1][j - 1].v)) removeArray(this.N, grid[i + 1][j - 1].v);
        }
      }
    }

    if(this.N.length != 0) this.c = color(255,0,0);
  }
}

function newText() {
  var cnt = 0;

  st = textfield.value();

  Text = splitTokens(st, "()");

  for (var i = 0; i < Text.length; i++) {
    if (Text[i] != Text[1]) {
      values[cnt++] = splitTokens(Text[i], ",");
    }
  }

}

function isPresent(array, value) {
  for (var p = 0; p < array.length; p++) {
    if (array[p] == value)
      return 1;
  }
}

function removeArray(array, value) {
  var array2 = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) {
      array2 = array.splice(i, 1);
      i--;
    }

  }

}