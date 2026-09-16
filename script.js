
document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    
    if (!likeBtn) return;
    
    const likeSvg = likeBtn.querySelector("svg");

    // Localiza o nó de texto dentro do botão de like (onde fica o número)
    let textNode = Array.from(likeBtn.childNodes).find(node => 
        node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // Inicializa as variáveis de controle a partir de 0
    let baseLikes = 0;
    let isLiked = false;

    // Atualiza o contador inicial para 0 na tela
    if (textNode) {
        textNode.textContent = ` ${baseLikes}`;
    }

    // Função para formatar números (ex: 1000 -> 1.0K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Função de animação visual (bounce)
    function triggerAnimation() {
        if (likeSvg) {
            likeSvg.style.transform = "scale(1.4)";
            setTimeout(() => {
                likeSvg.style.transform = "scale(1)";
            }, 150);
        }
    }

    // Aplica ou remove o estilo visual de curtido
    function updateVisuals() {
        if (isLiked) {
            likeSvg.style.fill = "#ef4444";
            likeSvg.style.stroke = "#ef4444";
            likeSvg.style.color = "#ef4444";
            likeBtn.classList.add("liked");
        } else {
            likeSvg.style.fill = "none";
            likeSvg.style.stroke = "currentColor";
            likeSvg.style.color = "inherit";
            likeBtn.classList.remove("liked");
        }
    }

    // Função para adicionar curtida
    function addLike() {
        baseLikes++;
        isLiked = true;
        updateVisuals();
        triggerAnimation();

        if (textNode) {
            textNode.textContent = ` ${formatLikes(baseLikes)}`;
        }
    }

    // Evento de clique no BOTÃO DE CORAÇÃO (Curte ou Descurte)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isLiked) {
            // Se já estava curtido, descurte (-1, com limite em 0)
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            updateVisuals();
        } else {
            // Se não estava curtido, adiciona curtida
            baseLikes++;
            isLiked = true;
            updateVisuals();
            triggerAnimation();
        }

        if (textNode) {
            textNode.textContent = ` ${formatLikes(baseLikes)}`;
        }
    });

    // Evento de clique na IMAGEM PRINCIPAL (Sempre aumenta likes)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});