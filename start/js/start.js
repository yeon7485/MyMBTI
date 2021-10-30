const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

function begin(){
    main.style.WebkitAnimation = "fadeOut 0.7s";
    main.style.animation = "fadeOut 0.7s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 0.7s";
        qna.style.animation = "fadeIn 0.7s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 300)
    }, 300);
}