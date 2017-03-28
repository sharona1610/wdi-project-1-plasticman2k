var myGamePiece
var myObstacles = []
var mySound
var canvas

function startGame () {
  myGamePiece = new component(50, 50, 'assets/miniXwingV3.png', 10, 120, 'image')
  myGamePiece.gravity = 10
  myGameArea.start()
  var timeoutHandle
  function countdown (minutes) {
    var seconds = 60
    var mins = minutes
    function tick () {
      var counter = document.getElementById('timer')
      var current_minutes = mins - 1
      seconds--
      counter.innerHTML =
            current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds)
      if (seconds > 0) {
        timeoutHandle = setTimeout(tick, 1000)
      } else {
        if (mins > 1) {
          setTimeout(function () { countdown(mins - 1) }, 1000)
        }
      }
    }
    tick()
  }
  countdown(1)
}

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 800
    this.canvas.height = 400
    this.context = this.canvas.getContext('2d')
    document.querySelector('.container').appendChild(this.canvas)
    this.frameNo = 0
    this.interval = setInterval(updateGameArea, 15)
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function component (width, height, color, x, y, type) {
  this.type = type
  if (type == 'image') {
    this.image = new Image()
    this.image.src = color
  }
  this.type = type
  // this.score = 0
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.x = x
  this.y = y
  this.gravity = 20
  this.gravitySpeed = 20
  this.update = function () {
    ctx = myGameArea.context
    if (this.type == 'image') {
      ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height)
    } else {
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  this.newPos = function () {
    this.gravitySpeed += this.gravity
    this.x += this.speedX
    this.y += this.speedY + this.gravitySpeed
    this.hitBottom()
  }

  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height
    if (this.y > rockbottom) {
      this.y = rockbottom
      this.gravitySpeed = 0
    }
  }

  this.crashWith = function (otherobj) {
    var myleft = this.x
    var myright = this.x + (this.width)
    var mytop = this.y
    var mybottom = this.y + (this.height)
    var otherleft = otherobj.x
    var otherright = otherobj.x + (otherobj.width)
    var othertop = otherobj.y
    var otherbottom = otherobj.y + (otherobj.height)
    var crash = true
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false
    }
    return crash
  }
}

function updateGameArea () {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      return
    }
  }

  myGameArea.clear()
  myGameArea.frameNo += 1
  if (myGameArea.frameNo == 1 || everyinterval(15)) {
    x = myGameArea.canvas.width
    minHeight = 50
    maxHeight = 100
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
    minGap = 200
    maxGap = 300
    gap = Math.floor(Math.random() * (maxGap - minGap + 2) + minGap)
    myObstacles.push(new component(10, height, 'red', x, 0))
    myObstacles.push(new component(10, x - height - gap, 'red', x, height + gap))
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1
    myObstacles[i].update()
  }
    // myScore.text="SCORE: " + myGameArea.frameNo;
    // myScore.update();
  myGamePiece.newPos()
  myGamePiece.update()
}

function everyinterval (n) {
  if ((myGameArea.frameNo / n) % 1 == 0) { return true }
  return false
}

function accelerate (n) {
  myGamePiece.gravity = n
}
