
var ClickAudio=new Audio;
 if ( ClickAudio.canPlayType("audio/mpeg")=="probably" )
        // ClickAudio.src="../sounds/splash.mp3";
    	ClickAudio.src="D:/Server/htdocs/stickman-fish/sounds/splash.mp3";
    else
        // ClickAudio.src="../sounds/splash..ogg";
    	ClickAudio.src="D:/Server/htdocs/stickman-fish/sounds/splash.ogg";


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
        window.navigator.vibrate(200); // вибрация 300мс
    }
}