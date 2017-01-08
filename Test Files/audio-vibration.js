var ClickAudio=new Audio;
 if ( ClickAudio.canPlayType("audio/mpeg")=="probably" )
        ClickAudio.src="../sounds/splash.mp3";
    else
        ClickAudio.src="../sounds/splash..ogg";
    // если поддержка формата точно известна, можно сразу так:
    //var ClickAudio=new Audio("http://fe.it-academy.by/Examples/Sounds/button-16.mp3");

    // НАЖАТИЕ КНОПКИ СТАРТ ИГРЫ ВЫЗЫВАЕТ ФУНКЦИЮ НАЧАЛА ИГРЫ
    function Start()
    {
        ClickSoundInit(); // важно "запустить" звук по событию, т.е. нажатию кнопки
        RequestAnimationFrame(Tick);
    }
    // ПРОЦЕСС ИГРЫ
    function Tick()
    {
    	// В НУЖНЫЙ МОМЕНТ(УСЛОВИЕ СТОЛКНОВЕНИЯ)
    	// ВЫЗЫВАЕМ ЗВУК
    	if (true) {
    		ClickSound();
    		Vibro();
    	}
    	// ......

    	// В Ф-ЦИИ ХОДА ИГРЫ ОБНОВЛЯЕМ ВСЕ ЭЛЕМЕНТЫ
    	Element.Update();
    	// + ЗАПУСК АНИМАЦИИ
        RequestAnimationFrame(Tick);
    }
    // ЗА ПРЕДЕЛАМИ ОБНОВЛЯЕМ ЭЛЕМЕНТЫ ДЛЯ ПЕРВОНАЧАЛЬНОГО ПОЗИЦИОНИРОВАНИЯ(? РЫБАК И УДОЧКА?)
    	Element.Update();

    	function ClickSoundInit(){
        ClickAudio.play(); // запускаем звук
        ClickAudio.pause(); // и сразу останавливаем
    }

    function ClickSound() {
        ClickAudio.currentTime=0; // в секундах
        ClickAudio.play();
    }

    // ????? ВИБРАЦИЯ
    function Vibro()
    {
        if ( navigator.vibrate ) // есть поддержка Vibration API?
        {
                window.navigator.vibrate(200); // вибрация 300мс
        }
    }
    
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ФОНОВАЯ МУЗЫКА, НА ГЛАВНОЙ СТРАНИЦЕ КНОПКИ
    <audio id=ZVUK preload autoplay>
    <source src="sounds/fun.ogg" type="audio/ogg; codecs=vorbis">
    <source src="sounds/fun.mp3" type="audio/mpeg">
    </audio>

<br />
<input type=button value='играть' onclick='ZvukPlay()'>
<input type=button value='пауза' onclick='ZvukPause()'>
<input type=button value='в начало' onclick='ZvukRestart()'>

<script>

    var ZvukElem=document.getElementById('ZVUK');

    function ZvukPlay()
    {
        ZvukElem.play();
    }

    function ZvukPause()
    {
        ZvukElem.pause();
    }

    function ZvukRestart()
    {
        ZvukElem.currentTime=0; // в секундах
    }

</script>