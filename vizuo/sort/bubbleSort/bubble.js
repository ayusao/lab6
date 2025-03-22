const defaultArraySize = 20;

let arraySize = defaultArraySize;
let array = [];

let sortingProcess;

initialize(arraySize);
let delay = 260;
let delayElement = document.querySelector('#speed_input');
let sizeElement = document.querySelector('#size-slider');

delayElement.addEventListener('input', function(){
    delay = 320 - parseInt(delayElement.value); //the more the slider goes right, lesser the delay value ie faster the speed
});

sizeElement.addEventListener('input', function(){
    arraySize = parseInt(sizeElement.value);
    initialize(arraySize);
});

// for generating random values
function initialize(size = arraySize) {
  // Stop any ongoing sorting process
  if (sortingProcess) {
    clearTimeout(sortingProcess);
    sizeElement.disabled = false;
  }

  // Generate a new array of random values
  array = [];
  for (var i = 0; i < size; i++) {
    array[i] = Math.random();
  }
  
  showbars();
  
  // Update the arraySize variable if a size is provided
  if (size !== undefined) {
    arraySize = size;
  }
}


function play() {
  sizeElement.disabled = true;
  const copyarray = [...array];
  const swapping = bubbleSort(copyarray);
  animate(swapping);
}

function animate(swaps) {
  if (swaps.length === 0) {
    showbars();
    sizeElement.disabled = false;
    return;
  }

  const [i, j] = swaps.shift();
  [array[i], array[j]] = [array[j], array[i]];
  showbars([i, j]);

  sortingProcess = setTimeout(() => {
    animate(swaps);
  }, delay);
  playNote(200+i*200);
  playNote(400+j*200);
}

function bubbleSort(array) {
  const swaps = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j <= array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swaps.push([j, j + 1]);

        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return swaps;
}

// for displaying the bars
function showbars(indices) {
  const container = document.getElementById("container1");
  container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i]*100+"%";
    bar.classList.add("bar");

    if (indices && indices.includes(i)) {
      bar.style.backgroundColor = "red";
    }
    container.appendChild(bar);
  }
}


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
