const sports = [
    {
        type: 'futebol',
        description: 'Um esporte jogado por duas equipes de onze jogadores com uma bola esférica. O objetivo é marcar gols na baliza adversária.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWY73gJKZU1vaHXFCVRDaOxD8eMzvgxCntQ&s' // Substitua pela URL da imagem de futebol
    },
    {
        type: 'basquete',
        description: 'Um esporte jogado por duas equipes de cinco jogadores cada, onde o objetivo é marcar pontos lançando a bola dentro de uma cesta elevada.',
        img: 'https://portalconteudoaberto.com.br/wp-content/uploads/2023/08/lebron-james-nba-recorde-1.webp' // Substitua pela URL da imagem de basquete
    },
    // Adicione mais esportes aqui
];

let gameBoard = document.getElementById('gameBoard');
let messageDiv = document.getElementById('message');
let flippedCards = [];
let matchedCards = [];

// Criar e embaralhar os cartões
let gameCards = sports.reduce((acc, sport) => {
    acc.push({ ...sport, isImage: true });
    acc.push({ ...sport, isImage: false });
    return acc;
}, []);
gameCards.sort(() => 0.5 - Math.random());

gameCards.forEach((card, index) => {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.type = card.type;
    cardElement.dataset.index = index;

    if (card.isImage) {
        let imgElement = document.createElement('img');
        imgElement.src = card.img;
        cardElement.appendChild(imgElement);
    } else {
        cardElement.innerText = card.description;
    }

    cardElement.addEventListener('click', onCardClick);
    gameBoard.appendChild(cardElement);
});

function onCardClick(event) {
    let clickedCard = event.currentTarget;

    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !matchedCards.includes(clickedCard.dataset.index)) {
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.type === flippedCards[1].dataset.type) {
                matchedCards.push(flippedCards[0].dataset.index, flippedCards[1].dataset.index);
                flippedCards = [];
                showMessage('Você acertou um par!');
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('flipped'));
                    flippedCards = [];
                    showMessage('Você não acertou. Tente novamente!');
                }, 1000);
            }
        }
    }
}

function showMessage(message) {
    messageDiv.innerText = message;
    setTimeout(() => {
        messageDiv.innerText = '';
    }, 2000);
}
