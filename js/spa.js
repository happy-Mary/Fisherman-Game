var svgMan;

function LoadSvgFisherman()
    {
        $.ajax("http://fe.it-academy.by/Sites/0020684/images/fisherman.svg",
           { type:'GET', dataType:'text', success:LoadedSvgFiserman, error:ErrorHandler }
        );
    }

    function LoadedSvgFiserman(data)
    { svgMan = data;}

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

//файлы для spa 
function TestLoadScript(url)
    {
        $.ajax(url,
            { type:'GET', dataType:'script', success:LoadedScript, error:ErrorHandler }
        );
    }

    function LoadedScript(data)
    {console.log("It's ready!"); }

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

function TestLoadDataMain()
    {
        $.ajax("spa_files/main.html",
            { type:'GET', dataType:'html', success:LoadMain, error:ErrorHandler }
        );
    }

    function LoadMain(data)
    {
          document.getElementById('main_container').innerHTML=data;
          var toRec = document.getElementsByClassName("toRecPage")[0];
          toRec.addEventListener('click', SwitchToRecPage, false);
          var toInfo = document.getElementsByClassName("toInfoPage")[0];
          toInfo.addEventListener('click', SwitchToInfoPage, false);
          toGame =  document.getElementsByClassName("toGamePage")[0];
          toGame.addEventListener('click', SwitchToGamePage, false);
          TestLoadScript("js/sound.js");
    }

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

function TestLoadDataRec()
    {
        $.ajax("spa_files/records.html",
            { type:'GET', dataType:'html', success:LoadRec, error:ErrorHandler }
        );
    }

    function LoadRec(data)
    {
        document.getElementById('main_container').innerHTML=data;
         var linkRecToMain = document.getElementsByClassName("tomain")[0];
        linkRecToMain.addEventListener('click', SwitchToMainPage, false);
    }

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

function TestLoadDataInfo()
    {
        $.ajax("spa_files/info.html",
            { type:'GET', dataType:'html', success:LoadInfo, error:ErrorHandler }
        );
    }

    function LoadInfo(data)
    {
        document.getElementById('main_container').innerHTML=data;
        var linkInfoToMain = document.getElementsByClassName("tomain")[0];
        linkInfoToMain.addEventListener('click', SwitchToMainPage, false);
    }

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

function TestLoadDataGame()
    {
        $.ajax("spa_files/game.html",
            { type:'GET', dataType:'html', success:LoadGame, error:ErrorHandler }
        );
    }

    function LoadGame(data)
    {
        document.getElementById('main_container').innerHTML=data;
         //var gameToMain = document.getElementsByClassName("home")[0];
         // gameToMain.addEventListener('click', SwitchToMainPage, false);
          TestLoadScript("js/man.js");
          LoadSvgFisherman();
    }

    function ErrorHandler(jqXHR,StatusStr,ErrorStr)
    {
        alert(StatusStr+' '+ErrorStr);
    }

//spa ////////////////////////////////////////////////////////////////////////////////////////
window.onhashchange=SwitchToStateFromURLHash;
var SPAStateH={};

function SwitchToStateFromURLHash()
  {
    var URLHash=window.location.hash;
    var StateStr=URLHash.substr(1);

if ( StateStr!="" )
{
      var PartsA=StateStr.split("_")
      SPAStateH={ pagename: PartsA[0] };
}
    else
      SPAStateH={pagename:'Main'}; 

    switch ( SPAStateH.pagename )
    {
      case 'Main':
        TestLoadDataMain();
        break;
      case 'Info':
        TestLoadDataInfo();
        break;
      case 'Records':
        TestLoadDataRec();
        break;
      case 'Game':
        TestLoadDataGame();
         break;
    }
  }

  function SwitchToState(NewStateH)
  {
    var StateStr=NewStateH.pagename;
    location.hash=StateStr;
  }

  function SwitchToMainPage()
  {
    SwitchToState( { pagename:'Main' } );
  }

  function SwitchToInfoPage()
  {
    SwitchToState( { pagename:'Info' } );
  }

  function SwitchToRecPage()
  {
    SwitchToState( { pagename:'Records' } );
  }
 function SwitchToGamePage()
  {
    SwitchToState( { pagename:'Game' } );
  }

SwitchToStateFromURLHash();
window.onload = SwitchToMainPage;


