let weatherData;
let numOfParticles = 800;
let particleArr = [];

let rain  = ["#D1DBE4", "#96B1C2", "#618094", "#384B52", "#1C2329"];
let windy = ["#F2D8A7", "#F2E9CE", "#143259", "#304F8C", "#848DBF"];
let hot   = ["#D23009", "#FECD06", "#F6960E", "#E45324", "#D23009"];
let snowy = ["#F2F2F2", "#B6E1F2", "#B3DAF2", "#9BD1F2", "#7EC6F2"];
let humid = ["#718B72", "#DAA273", "#042F41", "#305952", "#C0D1D9"];
let cold  = ["#5872A6", "#7E9ABF", "#5881A6", "#A3BFD9", "#D5E5F2"];

function preload() {
  weatherData = loadJSON(
    "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.12&current=temperature_2m,weathercode,windspeed_10m"
  );
}

class Particle {
  constructor() {
    this.angle = random(TWO_PI);
    this.radius = random(5, 200);
    this.speed = weatherData.current.windspeed_10m * 0.0008;
    this.temperature = weatherData.current.temperature_2m;
    this.weatherCode = weatherData.current.weathercode;
    this.noiseOffset = random(1000);
    this.x = width / 2;
    this.y = height / 2;
  }

  getColor() {
    if ((this.weatherCode >= 51 && this.weatherCode <= 67) ||
        (this.weatherCode >= 80 && this.weatherCode <= 82)) {
      return random(rain);
    }
    if (this.speed * 1000 > 30) return random(windy);
    if (this.temperature < 0)   return random(snowy);
    if (this.temperature <= 12) return random(cold);
    if (this.temperature <= 18) return random(humid);
    return random(hot);
  }

  update() {
    let noiseVal = noise(this.noiseOffset, frameCount * 0.005);
    this.angle += this.speed + noiseVal * 0.02;
    this.radius += sin(frameCount * 0.01 + this.noiseOffset) * 0.3;
    this.radius = constrain(this.radius, 5, 200);

    this.x = width / 2 + cos(this.angle) * this.radius;
    this.y = height / 2 + sin(this.angle) * this.radius * 0.9;
  }

  draw() {
    let col = this.getColor();
    stroke(col);
    strokeWeight(random(1, 3));
    point(this.x, this.y);
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-container');
  frameRate(weatherData.current.windspeed_10m);
  for (let i = 0; i < numOfParticles; i++) {
    particleArr.push(new Particle());
  }
}

function draw() {
  background(0, 25);
  blendMode(ADD);

  for (let i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
    particleArr[i].draw();
  }

  blendMode(BLEND);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
