const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12; // 질문 개수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {

    // select 배열에 있는 최대값 반환
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    var name = infoList[point].name;
    name = name.replace(/, /ig, '<br>');
    resultName.innerHTML = name;
    

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}


function goResult() {
    qna.style.WebkitAnimation = "fadeOut 0.7s";
    qna.style.animation = "fadeOut 0.7s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 0.7s";
        result.style.animation = "fadeIn 0.7s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 300)
    })
    setResult();
}

// 답변 버튼 만들기
function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    // 답변 버튼에 클래스 추가
    answer
        .classList
        .add('answerList');
    answer
        .classList
        .add('my-3');
    answer
        .classList
        .add('py-3');
    answer
        .classList
        .add('mx-auto');
    answer
        .classList
        .add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    // 클릭하면 다음 질문으로
    answer.addEventListener("click", function () {
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = "none";
            }
            goNext(++qIdx);
        }, 450);
    }, false);
}

// 질문과 답변 불러오기
function goNext(qIdx) {
    // 마지막 질문일 때 호출 후 리턴
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100 / endPoint) * (qIdx + 1) + '%';

}

// main 페이지에서 qna 페이지로 화면 전환
function begin() {
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