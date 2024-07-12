function mixImages(tabImages, tabNbrsAleatoires, cards) {
    tabNbrsAleatoires.sort(() => Math.random() - 0.5);
    cards.forEach((element, index) => {
        element.innerHTML='';
        const img = document.createElement('img');
        img.setAttribute('src', tabImages[tabNbrsAleatoires[index]]);
        element.appendChild(img);
    });
}

function commencerPartie(btnStartGame, btnRestartGame, tabImages, tabNbrsAleatoires, cards) {
    let restart = false;
    mixImages(tabImages, tabNbrsAleatoires, cards);
    btnStartGame.disabled = true;
    btnStartGame.style = "cursor:initial;box-shadow:none;";
    btnRestartGame.disabled = false;
    btnRestartGame.removeAttribute("style");
}

function recommencerPartie(btnStartGame, btnRestartGame, tabImages, tabNbrsAleatoires, cards) {
    let restart = true;
    mixImages(tabImages, tabNbrsAleatoires, cards);
    btnStartGame.disabled = true;
    btnStartGame.style = "cursor:initial;box-shadow:none;";
    btnRestartGame.disabled = false;
    btnRestartGame.removeAttribute("style");
}

function viderTableaux(tableaux){
    for(let i = 0;i<tableaux.length+1;i++){
        tableaux.shift();
    }
}

function compterTempsDeJeux(elementHours,elementMin,elementSec){
    let hours = 0,
        min = 0,
        sec = 0;
        defeat = false;
    let intervalId = setInterval(()=>{
        switch(sec){
            case 59: 
                sec = 0;
                min++;
                break;
            case sec < 59:
                sec++;
                break;
            default:
                sec =  0;
        }
        switch(min){
            case 59: 
                min = 0;
                hours++;
                break;
            case min < 59:
                min++;
                break;
            default:
                min =  0;
        }
        switch(hours){
            case 24: 
                defeat = true;
                break;
            case hours < 23:
                hours++;
                break;
            default:
                hours =  0;
        }

        
    },1000)
}

export {recommencerPartie,commencerPartie,mixImages,viderTableaux};