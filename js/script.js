// Aguarda o carregamento do DOM para evitar erros
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const levelSelect = document.getElementById('accessibility-level');
    const categorySelect = document.getElementById('category');
    const gamesGrid = document.getElementById('games-grid');
    const gameCards = document.querySelectorAll('.game-card');
    const noResultsMsg = document.getElementById('no-results');
    const resultCountSpan = document.getElementById('result-count');

    function filterGames() {
        const searchText = searchInput.value.toLowerCase();
        const selectedLevel = levelSelect.value;
        const selectedCategory = categorySelect.value;
        let visibleCount = 0;

        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const cardLevel = card.getAttribute('data-level');
            const cardCategory = card.getAttribute('data-category');

            const matchesText = title.includes(searchText);
            const matchesLevel = selectedLevel === 'todos' || cardLevel === selectedLevel;
            
            let matchesCategory = selectedCategory === 'todos';
            if (!matchesCategory) {
                if (selectedCategory === cardCategory) matchesCategory = true;
                if (selectedCategory === 'puzzle' && cardCategory === 'puzzle') matchesCategory = true;
            }

            if (matchesText && matchesLevel && matchesCategory) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.classList.remove('hidden');
            resultCountSpan.textContent = "Nenhum jogo encontrado.";
        } else {
            noResultsMsg.classList.add('hidden');
            resultCountSpan.textContent = `Exibindo ${visibleCount} jogo${visibleCount !== 1 ? 's' : ''}`;
        }
    }

    function resetFilters() {
        searchInput.value = '';
        levelSelect.value = 'todos';
        categorySelect.value = 'todos';
        filterGames();
    }

    // Exporta a função resetFilters para o escopo global (para o botão funcionar)
    window.resetFilters = resetFilters;

    searchInput.addEventListener('input', filterGames);
    levelSelect.addEventListener('change', filterGames);
    categorySelect.addEventListener('change', filterGames);

    // Roda o filtro uma vez ao iniciar
    filterGames();
});