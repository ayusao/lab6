let container = document.getElementById("bar_container");
let numOfBars = 20;
const maxValue = 100;
const minValue = 5;
let unsortedArray = [];
let sort_btn = document.getElementById("sort_btn");
let new_array_btn=document.getElementById("new_array");
let delay = 260;
let delayElement = document.querySelector('#speed_input');
let arraySize=document.querySelector("#array_size")

function deleteChild() {
    container.innerHTML = '';
  }

delayElement.addEventListener('input', function(){
    delay = 320 - parseInt(delayElement.value);//the more the slider goes right, lesser the delay value ie faster the speed
});

arraySize.addEventListener('input',function(){
    container.style.width=`${(598/20)*arraySize.value}px`;
    numOfBars=parseInt(arraySize.value);
    generateBar(parseInt(arraySize.value));
})

function disableSortingBtn(){
  sort_btn.style.opacity="0.4";
  document.querySelector("#sort_btn").disabled = true;
}
function enableSortingBtn(){
  sort_btn.style.opacity="1";
  document.querySelector("#sort_btn").disabled = false;
}

function disableNewArrayBtn(){
  new_array_btn.style.opacity="0.4";
  document.querySelector("#new_array").disabled = true;
}
function enableNewArrayBtn(){
  new_array_btn.style.opacity="1";
  document.querySelector("#new_array").disabled = false;
}

function disableArraySizeBtn(){
    document.querySelector("#array_size").disabled=true;
  }
  function enableArraySizeBtn(){
    document.querySelector("#array_size").disabled=false;
  }

function generateRandomNum(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
}

function generateBar(numOfBars) {
    deleteChild();

    for (let i = 0; i < numOfBars; i++) {
        let bars = document.createElement("div");
        bars.classList.add("bar");
        let randomValue = generateRandomNum(minValue, maxValue);
        unsortedArray[i] = randomValue;

        bars.style.height = `${unsortedArray[i] * 3}px`;
        bars.style.transform = `translate(${i * 30}px)`;

        container.appendChild(bars);
    }
}

function timeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms));
}

//shell short function
async function shellSort(array) {
    let bars=document.querySelectorAll(".bar");
    let Gap=numOfBars;
    let temp;
    while (Gap>1) {
        await timeDelay(delay);
        Gap = Math.floor((Gap+1) / 2);
        for (let j = Gap; j < numOfBars; j++) {
            for (let i = (j - Gap); i >= 0;i= (i - Gap)) {
                let k=i+Gap;
                await timeDelay(delay);
                bars[k].style.backgroundColor = "yellow";
                bars[i].style.backgroundColor = "yellow";
                playNote(200+i*200);
               // playNote(200+j*200);
                await timeDelay(delay);
                if (array[k] < array[i]) 
                {
                    await timeDelay(delay);
                    temp = array[i];
                    array[i] = array[k];
                    bars[i].style.height = `${array[i] * 3}px`;
                    await timeDelay(delay);
                    array[k] = temp;
                    bars[k].style.height = `${array[i + Gap] * 3}px`;
                    playNote(200+i*200);
                    playNote(200+j*200);
                    await timeDelay(delay);
                }
                else
                {
                    bars[k].style.backgroundColor = "#6b5b95";
                    bars[i].style.backgroundColor = "#6b5b95";
                    await timeDelay(delay);
                    break;
                }
                bars[k].style.backgroundColor = "#6b5b95";
                bars[i].style.backgroundColor = "#6b5b95";
                await timeDelay(delay);
            }
        }
        
    }
   for (i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "chocolate";
    }
    return array;
}

new_array_btn.addEventListener("click",function(){
    enableSortingBtn();
    enableArraySizeBtn();
    generateBar(numOfBars);
  });
  
  sort_btn.addEventListener("click", async function(){
   disableSortingBtn();
   disableNewArrayBtn();
   disableArraySizeBtn();
   await shellSort(unsortedArray);
   enableNewArrayBtn();
  });

  generateBar(numOfBars);

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