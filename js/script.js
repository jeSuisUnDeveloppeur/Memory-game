document.addEventListener('DOMContentLoaded',()=>{
    const cardContainer = document.querySelector('.card-container');
    const startButton = document.querySelector('.btn-startGame');
    const restartButton = document.querySelectorAll('.btn-restartGame');
    const difficultRadios = document.querySelectorAll('input[name="difficulty"]');
    const backCards = document.querySelectorAll('.container-back-side-card>img');
    const modal = document.querySelector(".modal-victory");
    const playerTime = document.querySelector(".player-time");
    const CompteurHours = document.querySelector(".compteur-hours");
    const CompteurMin = document.querySelector(".compteur-min");
    const CompteurSec = document.querySelector(".compteur-sec");

    let imgBackSides;
    let timerInterval;

    let difficulty = "easy";
    let cardImages = [];
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let pairsRevealed = 0;

    //Initialize the game
    function init(){
        difficultRadios.forEach(radio=>{
            radio.addEventListener('change',handleDifficultyChange);
        });

        backCards.forEach(backCard=>{
            backCard.addEventListener('click',()=>changeCardBack(backCard.src));
        });

        startButton.removeAttribute('disabled');
        startButton.removeAttribute('style');
        restartButton[1].disabled="true";
        restartButton[1].style="box-shadow:none";

        startButton.addEventListener('click',()=>startGame());
        generateGrid();
        
    }

    function changeCardBack(backCardSrc){
        imgBackSides = document.querySelectorAll('.card .side--back>img');
        imgBackSides.forEach(imgBackSide=>{
            imgBackSide.src = backCardSrc
        })
    }

    //handle difficulty change
    function handleDifficultyChange(event){
        difficulty = event.target.value;
        generateGrid();
    }

    //generate the card grid based on the selected difficulty
    function generateGrid(){
        cardContainer.innerHTML ="";
        const numCards = getNumCards();
        cardImages = generateCardImages(numCards);
        cardImages = shuffleArray(cardImages);

        cards = cardImages.map(image=>createCardElement(image));
        cards.forEach(card=>cardContainer.appendChild(card));
    }

    //get the number of cards based on difficulty
    function getNumCards(){
        return difficulty === "easy" ? 12: difficulty === "normal" ? 24 : 36 ;
    }

    //generate the card images array
    function generateCardImages(numCards){
        const images = Array(numCards/2).fill().map((_,i)=>`images/${i+1}.jpg`);
        return [...images,...images];
    }

    //Create a card element
    function createCardElement(image){
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="side side--back">
            <img src="images/dos-Magic.jpg"/>
        </div>
        <div class="side side--front">
            <img src="${image}"/>
        </div>
        `;
        card.addEventListener('click',()=>flipCard);
        return card;
    }

    //shuffle an array
    function shuffleArray(array){
        for(let i = array.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    }

    //handle card flip
    function flipCard(){
        if(lockBoard) return;
        if(this === firstCard)return;

        this.classList.add('flip');
        if(!firstCard){
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    //check if the flipped cards match
    function checkForMatch(){
        let isMatch = firstCard.querySelector('.side--front>img').src === secondCard.querySelector('.side--front>img').src;
        isMatch?disableCards():unflipCards();
    }

    //disable the matched cards
    function disableCards(){
        pairsRevealed++;
        if ((difficulty === "easy" && pairsRevealed === 6) ||
            (difficulty === "normal" && pairsRevealed === 12) ||
            (difficulty === "hard" && pairsRevealed === 18)) {
            victory();
        }
        firstCard.removeEventListener('click',flipCard);
        secondCard.removeEventListener('click',flipCard);
        resetBoard();
    }

    //unflip the cards if they don't match
    function unflipCards(){
        lockBoard = true;
        setTimeout(()=>{
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        },1000)
    }

    //function reset the board
    function resetBoard(){
        [firstCard,secondCard,lockBoard] = [null,null,false];
    }

    //start the game
    function startGame(){
        startButton.disabled="true";
        startButton.style.boxShadow = "none";
        restartButton[1].removeAttribute('disabled');
        restartButton[1].removeAttribute('style');
        restartButton.forEach(button=>{
            button.addEventListener('click',resetGame);
        });
        shuffleArray(cardImages);
        cards.forEach((card,index)=>{
            card.querySelector('.side--front>img').src = cardImages[index];
            card.classList.remove('flip');
            card.addEventListener("click",flipCard);
        })
        resetBoard();
        startTimer(getTimeLimit());
    }

    function resetGame(){
        modal.style.display="none";
        clearInterval(timerInterval);
        pairsRevealed = 0;
        generateGrid();
        init();
    }

    function getTimeLimit(){
        return difficulty === "easy" ? 60 : difficulty ==='normal' ? 120 : 180;
    }

    function startTimer(duration){
        let timer = duration,
            minutes,
            seconds;
        timerInterval = setInterval(()=>{
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            document.querySelector('.compteur-min').textContent = minutes;
            document.querySelector('.compteur-sec').textContent = seconds;

            if(--timer < 0){
                clearInterval(timerInterval);
                alert("Temps écoulé !");
            }
        },1000)
    }

    function victory(){
        clearInterval(timerInterval);
        playerTime.textContent = `${CompteurHours.textContent} : ${CompteurMin.textContent} : ${CompteurSec.textContent}`; 
        modal.style.display = "block";
    }
    init();
})