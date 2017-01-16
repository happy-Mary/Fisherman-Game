function GameClass() {

// REQUEST ANIMATION SUPPORT
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


// RANDOM NUMBER
function RandomDiap(N,M)
{
    return Math.floor(Math.random()*(M-N+1))+N;
}

// типы рыб
var fishes = ["fish_blue", "fish_gold", "fish_green", "fish_bone"];
// получаем элементы со страницы
var gameSpace =  document.getElementsByClassName("game-field")[0];
var skySpace = document.getElementsByClassName("sky")[0];
var seaSpace = document.getElementsByClassName("sea")[0];
var dno = document.getElementsByTagName("img")[0];
var MesWin = document.getElementsByClassName("hello-message")[0];
var ElCount = document.getElementsByClassName("points")[0];

// глобальные размеры
var seaSZ = seaSpace.getBoundingClientRect();

// КЛАССЫ ИГРЫ
// класс рыбы
function FishClass() {
	// свойства
	var self = this;
	self.width = 5;
	self.posY;
	self.posX;
	self.Speed;
	self.SpeedY;
	self.type = fishes[RandomDiap(0,fishes.length - 1)];
	self.catched = false;	
	self.fishSvg;
	self.SvgSize;
	self.dir = false;
	self.point;
	self.deleted = false;

	// создать рыбу
	self.createFish = function() {
		var xmlns = "http://www.w3.org/2000/svg";
		self.fishSvg = document.createElementNS (xmlns, "svg");
		self.fishSvg.style.display = "inline-block";
		self.fishSvg.style.width = self.width + "vw";
		self.fishSvg.style.position = "absolute";
		// при создании задаем рандомное положение
		self.posY = RandomDiap(30, seaSpace.offsetHeight-dno.offsetHeight/2);
		self.posX = RandomDiap(0, seaSpace.offsetWidth);
		self.fishSvg.style.top = self.posY + "px";
		self.fishSvg.style.left = self.posX + "px";
		seaSpace.appendChild(self.fishSvg);

		var use = document.createElementNS(xmlns, "use");
		use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "http://fe.it-academy.by/Sites/0020684/images/sprite.svg#"+self.type);
		use.setAttributeNS(null, "class", self.type);
		self.fishSvg.appendChild(use);
		self.SvgSize = self.fishSvg.getBoundingClientRect();
		if (self.type === "fish_blue") {
			var svgW = 460;
			var svgH = 250;
			self.point = 20;
		} else if (self.type === "fish_gold") {
			var svgW = 420;
			var svgH = 420;
			self.point = 50;
		} else if (self.type === "fish_green") {
			var svgW = 404;
			var svgH = 212;
			self.point = 10;
		} else if (self.type === "fish_bone") {
			var svgW = 89;
			var svgH = 37;
			self.point = -25;
		}
			self.fishSvg.setAttributeNS(null, "width", svgW);
			self.fishSvg.setAttributeNS(null, "viewBox", 0+" "+0+" "+svgW+" "+svgH);
	}

	self.Update = function() {
		self.fishSvg.style.top = self.posY + "px";
		self.fishSvg.style.left = self.posX + "px";
		self.SvgSize = self.fishSvg.getBoundingClientRect();
	}

	self.Move = function() {
		
		if (self.posY <= 40 && self.speedY !== 0 && self.catched && !self.deleted) {
			self.posY=60;
			var count = ElCount.innerHTML
			count = parseFloat(count)+self.point;
        	ElCount.innerHTML = count;
        	self.catched = false;
		}

		else if(self.catched) {self.Speed = 0; self.speedY = -3;}
		else if (self.type === "fish_blue" && !self.catched) {
			self.Speed = 2.4;
			self.speedY = 0;
			self.dir = true;
		} else if (self.type === "fish_gold" && !self.catched) {
			self.Speed = 4.6;
			self.speedY = 0;
			self.dir = true;
		} else if (self.type === "fish_green" && !self.catched) {
			self.Speed = -2.1;
			self.speedY = 0;
		} else if (self.type === "fish_bone" && !self.catched) {
			self.Speed = -3.7;
			self.speedY = 0;
		}
			self.posX += self.Speed; 
			self.posY += self.speedY;

		if (self.dir && self.posX>=seaSpace.offsetWidth) 
			{self.posX = RandomDiap(0-seaSpace.offsetWidth/2, 0-self.SvgSize.width);
		 	self.posY = RandomDiap(30, seaSpace.offsetHeight-dno.offsetHeight/2);}

		else if(!self.dir && self.posX<=0-self.SvgSize.width) 
			{self.posX = RandomDiap(seaSpace.offsetWidth, seaSpace.offsetWidth+seaSpace.offsetWidth/2);
		 	self.posY = RandomDiap(30, seaSpace.offsetHeight-dno.offsetHeight/2);}

		 	// движение рыб
			self.fishSvg.style.transform = 'translateX('+self.Speed+'px)';
			self.fishSvg.style.transform = 'translateY('+self.SpeedY+'px)';
	}

	self.Catched = function() {
		self.catched = true; 
	}
}

// класс рыбака
function ManClass() {
	var self = this;
	self.stylesMan;
	self.manSvg;
	self.manSize;
	self.posX = 0;
	self.posY;
	self.speedX = 0;
	self.catched = false;
        self.goRight = false;
  	self.Update = function(){
                self.manSize = self.manSvg.getBoundingClientRect();
		self.manSvg.style.left = this.posX + "px";
		self.posY = parseFloat(skySpace.offsetHeight) - parseFloat(self.manSize.height);
		self.manSvg.style.top = self.posY+"px";
	}

	self.SetElement = function(svgman) {
		skySpace.innerHTML = svgman;
		self.manSvg = document.getElementById("fisherman");
	        self.manSvg.style.width = "10%";
	}

	// стили отображения для рыбака
	self.stylesMan = function() {
	self.manSvg.style.width = "10%";
	self.manSvg.style.position = "absolute";
	self.manSize = self.manSvg.getBoundingClientRect();
	self.posY = parseFloat(skySpace.offsetHeight) - parseFloat(self.manSize.height);
	self.manSvg.style.left = self.posX + "px";
	self.manSvg.style.top = self.posY+"px";
	}

//конец класса рыбака
}

// класс удочки, в нем леска
function LurClass() {
	var self = this;
	self.fisherman;
	self.lurSvg;
	self.lurSize;
	var Hook;
	self.height = 40,
	self.speedX,
	self.speedY = 0,
	self.posX,
	self.posY,
	self.got = false;

	self.Update = function() {
		self.posX = parseFloat(self.fisherman.posX+self.fisherman.manSize.width-5);
		self.posY = self.fisherman.posY;
		self.lurSvg.style.left =  self.posX +"px";
		self.lurSvg.style.top =  self.posY +"px";
		self.lurSvg.style.height = self.height + "px";
		Hook.style.top = self.posY + self.lurSize.height-3 + "px";;
		Hook.style.left = self.posX + "px";
		self.lurSize = self.lurSvg.getBoundingClientRect();
	}

	// функция установки рыбака для лески
	self.SetFisherman = function(man) {
		self.fisherman = man;
		self.speedX = self.fisherman.speedX;
		self.posX = parseFloat(self.fisherman.posX+self.fisherman.manSize.width-5);
		self.posY = self.fisherman.posY;
	}
	// создаем леску
	self.createLur = function(){
		var xmlns = "http://www.w3.org/2000/svg";
		self.lurSvg = document.createElementNS (xmlns, "svg");
		self.lurSvg.style.position = "absolute";
		self.lurSvg.style.width = "1%";
		self.lurSvg.style.left =  self.posX +"px";
		self.lurSvg.style.top =  self.posY +"px";
		self.lurSvg.style.height = self.height + "px"
		gameSpace.appendChild(self.lurSvg);
		self.lurSize = self.lurSvg.getBoundingClientRect();

		// LINE
		var lineG = document.createElementNS(xmlns, "line");
		lineG.setAttribute("stroke-width", ".3em");
		lineG.setAttribute("x1", "0");
		lineG.setAttribute("y1", "0");
		lineG.setAttribute("y2", "100%");
		lineG.setAttribute("x2", "0");
		lineG.setAttribute("stroke",  "gray");
		self.lurSvg.appendChild(lineG);
		self.createHook();

	}
	self.createHook = function() {
		var xmlns = "http://www.w3.org/2000/svg";
		Hook = document.createElementNS (xmlns, "svg");
		Hook.style.display = "inline-block";
		Hook.style.width = ".8%";
		Hook.style.position = "absolute";
		Hook.style.top = self.posY + self.lurSize.height-3 + "px";;
		Hook.style.left = self.posX + "px";

		Hook.setAttributeNS(null, "width", 159);
		Hook.setAttributeNS(null, "viewBox", 0+" "+0+" "+159+" "+296);
		gameSpace.appendChild(Hook);

		var useL = document.createElementNS(xmlns, "use");
		useL.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "http://fe.it-academy.by/Sites/0020684/images/sprite.svg#hook");
		Hook.appendChild(useL);
	}
}

// фабрика создания объектов рыб MODEL
function FishesFactory() {
	var self = this;
	self.CreateFishes = function(num) {
		var num = num;
		for (var i = 0; i < num; i++) {
		Fish = new FishClass();
		Fish.createFish();
		ReadyFishes.push(Fish); }
	}
}
// обновление положения рыб
function FishesUpdate() {
	for (i=0; i<=ReadyFishes.length-1; i++) {
		ReadyFishes[i].Update();
	}
}
// движение рыб
function FishesMove() {
	for (i=0; i<=ReadyFishes.length-1; i++) {
		ReadyFishes[i].Move();
	}
}

// СВОЙСТВА КЛАССА ИГРЫ
//переменные объектов

var ManH;
var LurH;
var Fish;
// factories
var FishF;
// массив созданных рыб
var ReadyFishes = [];
var CatchedFishes = [];
//таймеры 
var GameRAF;
var SecondTimer;
//переменные координат тапа
var touchOffsetX;
var touchOffsetY;

// СОЗДАНИЕ ОБЪЕКТОВ
// объявляем фабрику рыб и создаем рыб
var FishF = new FishesFactory();
//создаем 10 рыб
FishF.CreateFishes(10);
// создаем объект рыбака
var ManH = new ManClass();
ManH.SetElement(svgMan);

ManH.stylesMan();

// создаем объект удочки
var LurH = new LurClass();
LurH.SetFisherman(ManH);
LurH.createLur();

// НАЧАЛО ИГРЫ
// события тачскрина
if ( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ){
gameSpace.addEventListener('touchstart', function(event) {
event.preventDefault();
event.stopPropagation();
if (event.targetTouches.length == 1) {
var touch=event.targetTouches[0];
touchOffsetX = touch.pageX - gameSpace.offsetLeft;
touchOffsetY = touch.pageY - gameSpace.offsetTop;
if (touchOffsetX >= ManH.posX) {ManH.speedX = 5.3; ManH.goRight = true;}
else if (touchOffsetX <= ManH.posX) {ManH.speedX = -5.3; ManH.goRight = false;}
if (touchOffsetY>=LurH.posY+LurH.height) {LurH.speedY = 4.2;}
}
}, false);
}

var gameGo = document.getElementsByClassName("gobutton")[0];
gameGo.addEventListener("click", StartGame, false);
document.onkeydown = MovePl;
document.onkeyup = StopPl;

window.addEventListener("resize", function(){
         ManH.Update();
	 LurH.Update();
}, false)


// Метод запускает процессы игры
function StartGame() {
        FonA();
        SecondTimer = setInterval(Tick, 1000);
	MesWin.style.display = "none";
	ClickSoundInit(); 
	pauseButton.onclick = pauseGame;
	playButton.onclick = playGame;
	Game();
}

//таймер для счетчика
function Tick() {
	var TimeElem = document.getElementsByClassName("time")[0];
	var Tseconds = TimeElem.innerHTML;
	Tseconds--;
	TimeElem.innerHTML = Tseconds;
	if (Tseconds<=0) {
		clearInterval(SecondTimer);
		cancelAnimationFrame(GameRAF);
               MesWin.innerHTML = "<p>Вы набрали </p>" + ElCount.innerHTML +" <span>очков</span><br>" + "<input type='button' value='на главную' onclick=SwitchToMainPage();>";
                MesWin.style.display = "block";
	}
}

function MovePl(e) {
	e.preventDefault();
	e = e || window.event;
	var keyCode = e.keyCode;
	// условия движения рыбака
	if (keyCode === 39 && !ManH.catched) {ManH.speedX = 6.3;}
	else if(keyCode === 37 && !ManH.catched) {ManH.speedX = -6.3;}
	else if(keyCode === 39 && ManH.catched) {ManH.speedX = 0;}
	else if(keyCode === 37 && ManH.catched) {ManH.speedX = 0;}

	// условия движения лески
        // ограничение лески внизу
	else if(keyCode === 40 && LurH.lurSize.bottom>=seaSZ.bottom-dno.offsetHeight/2) {LurH.speedY = 0;}
	else if(keyCode === 40 && !LurH.got) {LurH.speedY = 4;} //рыба не словлена
	else if(keyCode === 40 && LurH.got) {LurH.speedY = 0;} //рыба словлена
	
}

function StopPl(e) {
	e.preventDefault();
	e = e || window.event;
	var keyCode = e.keyCode;
	if (keyCode === 39) {ManH.speedX = 0;}
	else if(keyCode === 37) {ManH.speedX = 0;}
	else if(keyCode === 40 && !LurH.got) {LurH.speedY = -4;}
	else if(keyCode === 40 && LurH.got) {LurH.speedY = 0;}
}

function Game() { 
        cancelAnimationFrame(GameRAF);
	GameRAF = requestAnimationFrame(Game);

	 ManH.Update();
	 LurH.Update();
	 FishesUpdate();
	 Collision();

	 // движение чувака
	 ManH.posX += ManH.speedX;
	 LurH.height += LurH.speedY;
	 FishesMove();

	// ограничение движения удочки
	if(LurH.height <=30 ) {LurH.speedY = 0;}

	 // ограничение движения рыбака
	if(ManH.posX <= 0) {ManH.posX=0;  ManH.speedX = 0;}
	var LeftCoast = parseFloat(skySpace.offsetWidth - ManH.manSize.width-LurH.lurSize.width);
	if (ManH.posX >= LeftCoast) {ManH.posX = LeftCoast; ManH.speedX = 0;}

         //столкновения с тапами
         if (ManH.goRight && ManH.posX >= touchOffsetX) {ManH.speedX = 0;}
         else if (!ManH.goRight && ManH.posX <= touchOffsetX) {ManH.speedX = 0;}

        // тут столкновения удочки с тапом
        if (LurH.posY+LurH.height >= touchOffsetY) {LurH.speedY = -4;}
	}


// ПОПЫТКА ОБНАРУЖЕНИЯ СТОЛКНОВЕНИЙ
function Collision() {
	for (var i = 0; i<=ReadyFishes.length-1; i++) {
		var FishTop = ReadyFishes[i].SvgSize.top;
		var FishBot = ReadyFishes[i].SvgSize.top+ReadyFishes[i].SvgSize.height;
		var FishLeft = ReadyFishes[i].SvgSize.left;
		var FishRight = ReadyFishes[i].SvgSize.right;
		var LurBot = LurH.lurSize.top+LurH.lurSize.height;
		var LurLeft = LurH.lurSize.left;

		if(LurBot<=FishBot && LurBot>=FishTop && LurLeft>=FishLeft && LurLeft<=FishRight){
			ManH.catched = true;
			ReadyFishes[i].Catched();
			LurH.got = true;
			LurH.height = FishBot-ReadyFishes[i].SvgSize.height - LurH.lurSize.top;
                        KillFish(ReadyFishes[i].fishSvg);
		}
	}
}

function KillFish(killedFish) {
	var KilledFish = killedFish;
	var pageFishes = seaSpace.getElementsByTagName("svg");
	seaSpace.removeChild(KilledFish);
	CatchedFishes.push(KilledFish);
	ClickSound();
    Vibro();
    FishF.CreateFishes(1);
    LurH.got = false;
    ManH.catched = false;
}

// ИГРА НА ПАУЗЕ
var pauseButton = document.getElementsByClassName("pause")[0];
var pauseGame = function() {
        clearInterval(SecondTimer);
	cancelAnimationFrame(GameRAF);
}

// ИГРА ВОЗОБНОВЛЯЕТСЯ
var playButton = document.getElementsByClassName("play")[0];
var playGame = function() {
        SecondTimer = setInterval(Tick, 1000);
	GameRAF = requestAnimationFrame(Game);
}

// ПРИ ВОЗВРАТЕ НА ГЛАВНУЮ СТРАНИЦУ
var gameToMain = document.getElementsByClassName("home")[0];
gameToMain.addEventListener("click", function() {
        clearInterval(SecondTimer);
	cancelAnimationFrame(GameRAF);
        var T = confirm("Вы уверены, что хотите уйти? Ваши достижения не сохранятся!");
        if(T===true) {SwitchToMainPage();}
        else { SecondTimer = setInterval(Tick, 1000);
	         GameRAF = requestAnimationFrame(Game);}       
}, 
false)


//звуки столкновения, вибрация
var ClickAudio=new Audio;
 if ( ClickAudio.canPlayType("audio/mpeg")=="probably" )
       ClickAudio.src="http://fe.it-academy.by/Projects/Shkovskaja/sound/splash.mp3";
    else
    	ClickAudio.src="http://fe.it-academy.by/Projects/Shkovskaja/sound/splash.ogg"

function ClickSoundInit() {
    ClickAudio.play(); // запускаем звук
    ClickAudio.pause(); // и сразу останавливаем
 }

function ClickSound() {
    ClickAudio.currentTime=0; // в секундах
    ClickAudio.play();
}

function Vibro() {
   if (navigator.vibrate) {
        window.navigator.vibrate(200); 
    }
}
//фоновая музыка 
function FonA() {
      var myAudio = document.getElementsByClassName('audio_fon')[0];
     if (myAudio.duration <= 0 || myAudio.paused) {
     myAudio.play();
     }
}
// конец класса игры
}


//Object Game
var Game = new GameClass;