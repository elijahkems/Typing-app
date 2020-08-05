const content = document.querySelector('#content p').innerText;
const typingArea = document.querySelector('#typing');
const startBtn = document.querySelector('#start-btn');
const showTime = document.querySelector('#show-time')
let elapsedTime;
let timerStarted = false
let clockArr = [0,0,0];
let Interval;
const startTimer = () => {
    if (!timerStarted) {
        Interval = setInterval(runClock ,10)
        timerStarted = true
    }
}


const startOver = () => {
    clearInterval(Interval)
    elapsedTime = 0;
    clockArr = [0,0,0]
    timerStarted = false;
    typingArea.value = ""
    typingArea.style.borderColor = 'grey';
    showTime.innerHTML = '00:00:00'
}

const spellCheck = () => {
    let value = typingArea.value.trim()
    let subText = content.substring(0, value.length)
    if (value === content) {
        //all text is matched
        typingArea.style.borderColor = 'green';
        matchHandler()
    } else {
        //part of text is matched
        if (value === subText) {
            typingArea.style.borderColor = '#0984e3';
        } else {
            typingArea.style.borderColor = 'red';
        }
    }
}
const leadingZero = (time) => {
    if (time <= 9) {
        time = '0' + time;
    }
    return time;
}
const runClock = () => {
    clockArr[2] += 1;
    if (clockArr[2] === 100) {
        clockArr[1]++;
        clockArr[2] = 0;
    }
    if (clockArr[1] === 60) {
        clockArr[0]++;
        clockArr[1] = 0;
    }
    if (clockArr[0] === 60) {
        clockArr = [0,0,0];
    }

    showTime.innerHTML = `${leadingZero(clockArr[0])}:${leadingZero(clockArr[1])}:${leadingZero( clockArr[2])}`
}

const matchHandler = () => {
    clearInterval(Interval);

}
typingArea.addEventListener('keydown', startTimer)
typingArea.addEventListener('keyup', spellCheck)
startBtn.addEventListener('click', startOver)