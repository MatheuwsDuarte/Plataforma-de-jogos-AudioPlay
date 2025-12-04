// Aguarda o carregamento do DOM para evitar erros
document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos de filtro existentes
    const searchInput = document.getElementById('search');
    const levelSelect = document.getElementById('accessibility-level');
    const categorySelect = document.getElementById('category');
    
    const languageSelect = document.getElementById('language'); 
    const priceSelect = document.getElementById('price');       
    
    // Seleção dos elementos do grid e contagem
    const gamesGrid = document.getElementById('games-grid');
    const gameCards = document.querySelectorAll('.game-card');
    const noResultsMsg = document.getElementById('no-results');
    const resultCountSpan = document.getElementById('result-count');

    function filterGames() {
        // Obter valores dos filtros
        const searchText = searchInput.value.toLowerCase();
        const selectedLevel = levelSelect.value;
        const selectedCategory = categorySelect.value;
        const selectedLanguage = languageSelect.value; 
        const selectedPrice = priceSelect.value;       

        let visibleCount = 0;

        gameCards.forEach(card => {
            // Obter dados do jogo (título para busca de texto)
            const title = card.querySelector('h3 a').textContent.toLowerCase();
            
            // Obter atributos de dados
            const cardLevel = card.getAttribute('data-level');
            const cardCategory = card.getAttribute('data-category');
            const cardLanguage = card.getAttribute('data-language'); 
            const cardPrice = card.getAttribute('data-price');       

            // Filtro por texto
            const matchesText = title.includes(searchText);

            //  Filtro por nível de acessibilidade
            const matchesLevel = selectedLevel === 'todos' || cardLevel === selectedLevel;

            //  Filtro por gênero 
            const matchesCategory = selectedCategory === 'todos' || cardCategory === selectedCategory;

            //  Filtro por idioma 
            const matchesLanguage = selectedLanguage === 'todos' || 
                                    cardLanguage === selectedLanguage ||
                                    (cardLanguage === 'multi' && (selectedLanguage === 'portugues' || selectedLanguage === 'ingles' || selectedLanguage === 'espanhol'));
            
            //  Filtro por preço
            const matchesPrice = selectedPrice === 'todos' || cardPrice === selectedPrice; 

            
            // Lógica final: O card é visível se todos os filtros forem verdadeiros
            if (matchesText && matchesLevel && matchesCategory && matchesLanguage && matchesPrice) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Atualizar o contador e a mensagem de "sem resultados"
        if (visibleCount === 0) {
            noResultsMsg.classList.remove('hidden');
            resultCountSpan.textContent = "Nenhum jogo encontrado.";
        } else {
            noResultsMsg.classList.add('hidden');
            resultCountSpan.textContent = `Exibindo ${visibleCount} jogo${visibleCount !== 1 ? 's' : ''}`;
        }
    }

    // Função para limpar todos os filtros
    function resetFilters() {
        searchInput.value = '';
        levelSelect.value = 'todos';
        categorySelect.value = 'todos';
        languageSelect.value = 'todos'; 
        priceSelect.value = 'todos';   
        filterGames();
    }

    // Exporta a função resetFilters para o escopo global (para o botão funcionar no HTML)
    window.resetFilters = resetFilters;

    // Adicionar Event Listeners para todos os filtros
    searchInput.addEventListener('input', filterGames);
    levelSelect.addEventListener('change', filterGames);
    categorySelect.addEventListener('change', filterGames);
    languageSelect.addEventListener('change', filterGames); 
    priceSelect.addEventListener('change', filterGames);    // NOVO

    // Roda o filtro uma vez ao iniciar (garante a contagem inicial correta)
    filterGames();
});