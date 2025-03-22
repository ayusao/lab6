let container = document.getElementById("bar_container");
let numOfBars=20;
const maxValue=100;
const minValue=5;
let unsortedArray=[];
let sort_btn=document.getElementById("sort_btn");
let new_array_btn=document.getElementById("new_array");
//let return_btn=document.getElementsByClassName("return");
let delay = 260;
let delayElement = document.querySelector('#speed_input');
let arraySize=document.querySelector("#array_size");

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

function generateRandomNum(min,max)
{
  return (Math.floor(Math.random()*(max-min)+min));
}
function generateBar(numOfBars)
{
  deleteChild();
  
  for(let i=0;i<numOfBars;i++)
  {
    let bars=document.createElement("div");
    bars.classList.add("bar");
    let randomValue=generateRandomNum(minValue,maxValue);
    unsortedArray[i]=randomValue;

    bars.style.height=`${unsortedArray[i]*3}px`;
    bars.style.transform=`translate(${i * 30}px)`;

    container.appendChild(bars);
  }
}

function timeDelay(ms)
{
  return new Promise((resolve)=>setTimeout(resolve,ms));
}

//write mergeSort function
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    //visualize it for right and left side
    bars[k].style.height = arr[k] * 3 + "px";
    playNote(200+k*200);
    bars[k].style.backgroundColor = "lightgreen";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * 3+ "px";
      console.log(arr[k] * 3);
      playNote(300+k*300);
      bars[k + arr.length].style.backgroundColor = "yellow";
    }
    await timeDelay(delay);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] *3 + "px";
    playNote(200+k*200);
    bars[k].style.backgroundColor = "lightgreen";
    await timeDelay(delay);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * 3 + "px";
    playNote(200+k*200);
    bars[k].style.backgroundColor = "lightgreen";
    await timeDelay(delay);
    j++;
    k++;
  }
  return arr;
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
 await mergeSort(unsortedArray);
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