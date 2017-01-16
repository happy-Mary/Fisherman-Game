// ФОНОВАЯ МУЗЫКА
var muteButton = document.getElementsByClassName("sound")[0];
console.log(muteButton);
muteButton.onclick = Mute;
var play = true;


function Mute(e) {
    e.preventDefault();
    e = e || window.event;

    var audioElem = document.getElementsByClassName("audio_fon")[0];
    var imgMute = muteButton.getElementsByTagName("img")[0];

    if(play) {
        audioElem.pause();
        imgMute.src = "http://fe.it-academy.by/Sites/0020684/images/icon/soundoff.svg";
        play = false;
    }else if(!play) {
        audioElem.play();
        imgMute.src = "http://fe.it-academy.by/Sites/0020684/images/icon/soundon.svg";
        play = true;
    }
    return play;
}