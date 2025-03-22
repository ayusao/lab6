function swap(element1, element2) {
    console.log('Swap function()');
    
    let temp = element1.style.height;
    element1.style.height = element2.style.height;
    element2.style.height = temp;  
}

function disableSortingBtn(){
    document.querySelector(".insertionSort").disabled = true;
}

function enableSortingBtn(){
    document.querySelector(".insertionSort").disabled = false;
}

function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

function delayRoutine(millisecs) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, millisecs); 
    }) 
}

function disableHomeBtn(){
    document.querySelector(".home").disabled = true;
}

function enableHomeBtn(){
    document.querySelector(".home").disabled = false;
}


function createNewArray(noOfBars = 20) {

    deleteChild();

    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }
    console.log(array);

    const bars = document.querySelector("#bars");
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;//height of div element
        // const label = document.createElement("div");
        // label.innerHTML = array[i];
        // label.classList.add('label');
        // bar.appendChild(label);
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

let arraySize = document.querySelector('#arr_sz');

let delay = 260;

let delayElement = document.querySelector('#speed_input');

let array = [];

let home = document.querySelector('#home');

arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);//the more the slider goes right, lesser the delay value ie faster the speed
});

home.addEventListener('click', function()
{
    console.log("Returning to home page");
    document.location.href = '../index.html';
});

createNewArray();

const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

let audioCtx = null;

function playNote(freq)
{
    if(audioCtx==null)
    {
        audioCtx= new(AudioContext||
            webkitAudioContext ||
            window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.05;

    osc.connect(node);
    node.connect(audioCtx.destination);
}