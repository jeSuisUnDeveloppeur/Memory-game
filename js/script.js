import {commencerPartie,mixImages,recommencerPartie,viderTableaux} from "../lib/helpersFunctions.js";
document.addEventListener("DOMContentLoaded", () => {
    //Les variables et tableaux
    const tableauxNbrsAleatoiresFacile = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const tableauxNbrsAleatoireNormal = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12,13,14,15,16,17,18,19,20,21,22,23,24
    ];

    const tableauxNbrsAleatoireDifficle = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12,13,14,15,16,17,18,19,20,21,22,23,24,
        25,26,27,28,29,30,31,32,33,34,36
    ]

    const tableauxImagesFacile = [
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg",
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg"];

    const tableauxImagesNormal = [
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg",
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg",
        "../images/7.jpg",
        "../images/8.jpg",
        "../images/9.jpg",
        "../images/10.jpg",
        "../images/11.jpg",
        "../images/12.jpg",
        "../images/7.jpg",
        "../images/8.jpg",
        "../images/9.jpg",
        "../images/10.jpg",
        "../images/11.jpg",
        "../images/12.jpg",
    ];

    const tableauxImagesDifficile = [
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg",
        "../images/1.jpg",
        "../images/2.jpg",
        "../images/3.jpg",
        "../images/4.jpg",
        "../images/5.jpg",
        "../images/6.jpg",
        "../images/7.jpg",
        "../images/8.jpg",
        "../images/9.jpg",
        "../images/10.jpg",
        "../images/11.jpg",
        "../images/12.jpg",
        "../images/7.jpg",
        "../images/8.jpg",
        "../images/9.jpg",
        "../images/10.jpg",
        "../images/11.jpg",
        "../images/12.jpg",
        "../images/13.jpg",
        "../images/14.jpg",
        "../images/15.jpg",
        "../images/16.jpg",
        "../images/17.jpg",
        "../images/18.jpg",
        "../images/13.jpg",
        "../images/14.jpg",
        "../images/15.jpg",
        "../images/16.jpg",
        "../images/17.jpg",
        "../images/18.jpg",
    ];
    //boutons démarrer et redémarrer une partie
    const btnStartGame = document.querySelector(".btn-startGame");
    const btnRestartGame = document.querySelector(".btn-restartGame");
    //radio buttons difficultés
    const easyDifficulty = document.querySelector("#easy");
    const normalDifficulty = document.querySelector("#normal");
    const hardDifficulty = document.querySelector("#difficult");
    //tableaux qui contient les radios bouttons de difficulté
    const difficulty = [
        easyDifficulty,
        normalDifficulty,
        hardDifficulty
    ];
    //le conteneur de cartes, les cartes et les fronts side de cartes
    const cardsContainer = document.querySelector(".card-container");
    const cards = [...document.querySelectorAll(".card")];
    const frontSidecards = [...document.querySelectorAll(".card>div.side.side--front")];
    //tableaux index et src de l'image révélée
    const indexCardsRevealed = [];
    const imgCardsRevealed = [];
    //variables victoire/défaite et faces révélé
    let nbrFacesRevealed = 0;
    let victory = 0;
    let defeat = 6;

    difficulty.forEach(element=>{
        element.addEventListener("click",()=>{
            switch(element.id){
                case "easy":
                    mixImages(tableauxImagesFacile,tableauxNbrsAleatoiresFacile,frontSidecards);
                    break;
                case "normal":
                    mixImages(tableauxImagesNormal,tableauxNbrsAleatoireNormal,frontSidecards);
                    break;
                case "difficult":
                    mixImages(tableauxImagesDifficile,tableauxNbrsAleatoireDifficle,frontSidecards);
                    break;
            }
        })
        })
    })
    
    
    //commencer une partie
    btnRestartGame.disabled = true;
    btnRestartGame.style = "box-shadow:none";

    btnStartGame.addEventListener("click", (event) => {
        commencerPartie(btnStartGame, btnRestartGame, tableauxImages, tableauxNbrsAleatoires, frontSidecards);
        cards.forEach((element,index)=>{
            element.addEventListener("click",(event)=>{
                    let frontSideOfElement = [...element.children][0];
                    let imgOfFrontSide = frontSideOfElement.querySelector('img');
                    let imgSrc = imgOfFrontSide.src;

                if(nbrFacesRevealed < 2 ){
                    event.currentTarget.style="transform:rotateY(180deg);";

                    imgCardsRevealed.push(imgSrc);
                    indexCardsRevealed.push(index);

                    nbrFacesRevealed++;

                    if(nbrFacesRevealed == 2){
                        if(imgCardsRevealed[0] != imgCardsRevealed[1]){
                            setTimeout(()=>{
                                cards.forEach((element,index) => {
                                    if(index == indexCardsRevealed[0] || index == indexCardsRevealed[1]){
                                        element.style="transform:rotateY(360deg);";   
                                    }
                                });
                                viderTableaux(imgCardsRevealed);
                                viderTableaux(indexCardsRevealed); 
                            },800)
                                nbrFacesRevealed = 0; 
                                defeat--;
                                if(defeat == 0){
                                    let defeatMessage = document.createElement('p');
                                    defeatMessage.innerHTML = "Vous avez perdu !";
                                }                       
                        }
                        else{
                            if(imgCardsRevealed[0] == imgCardsRevealed[1]){
                                viderTableaux(imgCardsRevealed);
                                viderTableaux(indexCardsRevealed);
                                nbrFacesRevealed = 0;
                                victory++;
                                if(victory == 6){
                                    let VictoryMessage = document.createElement('p');
                                }
                            }
                        } 
                    }
                }
                 
            })
        })
    });

    //recommencer une partie
    btnRestartGame.addEventListener("click", () => {
        cards.forEach(element=>{
            element.removeAttribute("style");
    });
    setTimeout(()=>{
        nbrFacesRevealed = 0;
        victory = 0;
        defeat = 6;
        recommencerPartie(btnStartGame, btnRestartGame, tableauxImages, tableauxNbrsAleatoires, frontSidecards);
    },500) 
})
