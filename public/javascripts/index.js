// Script to handle the brand Design javascript to change screens
document.addEventListener('DOMContentLoaded', function () {
    const screens = document.querySelectorAll('.screen');
    const indexText = document.querySelector('.index');
    let currentIndex = 0;

    function updateIndex() {
        const formattedIndex = (currentIndex + 1)
            .toString()
            .padStart(2, '0');
        const formattedLength = screens.length.toString()
            .padStart(2, '0');
        indexText.textContent = `${formattedIndex}/${formattedLength}`;
    }

    function showScreen(index, direction) {
        screens.forEach((screen, i) => {
            if (i === index) {
                screen.classList.add('active');
                screen.classList.add(direction === 'left' ? 'swipe-left' : 'swipe-right');
                screen.addEventListener('animationend', () => {
                    screen.classList.remove('swipe-left', 'swipe-right');
                }, {
                    once: true
                });
            } else {
                screen.classList.remove('active');
            }
        });
        currentIndex = index;
        updateIndex();
    }

    showScreen(0, '');

    document.querySelector('.previous')
        .addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + screens.length) % screens.length;
            showScreen(currentIndex, 'right');
        });

    document.querySelector('.next')
        .addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % screens.length;
            showScreen(currentIndex, 'left');
        });

    updateIndex();
});

document.querySelectorAll(".accordion-item").forEach((item) => {
    item.querySelector(".accordion-item-header").addEventListener("click", () => {
        item.classList.toggle("open");
    });
});


const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (!card.hasAttribute('active')) {
            updateActiveCard(card);
        }
    });
});

function updateActiveCard(activeCard) {
    cards.forEach((card) => {
        if (card === activeCard) {
            card.setAttribute('active', '');
        } else {
            card.removeAttribute('active');
        }
    })
}