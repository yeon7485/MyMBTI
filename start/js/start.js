const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

// 답변 버튼 만들기
function addAnswer(answerText, qIdx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    // 답변 버튼에 클래스 추가
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    // 클릭하면 다음 질문으로 
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++){
                children[i].style.display = "none";
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

// 질문과 답변 불러오기
function goNext(qIdx){
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}

// main 페이지에서 qna 페이지로 화면 전환
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
        let qIdx = 0;
        goNext(qIdx);
    }, 300);
}