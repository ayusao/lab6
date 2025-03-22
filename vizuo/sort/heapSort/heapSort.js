var container = document.getElementById("heapArray");

//to create the bars
function getArray(m) {
    for(var i=0;i<m;i++)
    {
        var randomValue = Math.ceil(Math.random()*100);

        var arrayElement = document.createElement("div");
        arrayElement.classList.add("block");

        arrayElement.style.height = `${randomValue * 3}px`;
        arrayElement.style.transform = `translate(${i * 30}px)`;

        var arrayElementLabel = document.createElement("label");
        arrayElementLabel.classList.add("block_id");
        arrayElementLabel.innerText = randomValue;

        arrayElement.appendChild(arrayElementLabel);
        container.appendChild(arrayElement);
    }
}

//to create the index at bottom of the bars
var count_container  = document.getElementById("count");

function getIndex(m) {
    for(var i=0;i<m;i++)
    {
        var arrayElement2 = document.createElement("div");

        arrayElement2.classList.add("block2");

        arrayElement2.style.height = `${20}px`;
        arrayElement2.style.transform = `translate(${i * 30}px)`;

        var arrayElementLabel2 = document.createElement("label");
        arrayElementLabel2.classList.add("block_id3");
        arrayElementLabel2.innerText = i;

        arrayElement2.appendChild(arrayElementLabel2);
        count_container.appendChild(arrayElement2);
    }
}

async function delay(m)
{
  await new Promise((resolve) =>
  setTimeout(() => {
    resolve();
  }, m - (speed*250))
);
}

async function Heapify(n, i) {
    var blocks = document.querySelectorAll(".block");
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2
    
    // If left child is larger than root
    if (
      l < n &&
      Number(blocks[l].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
      largest = l;
    
    // If right child is larger than largest so far
    if (
      r < n &&
      Number(blocks[r].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
      largest = r;
    
    // If largest is not root
    if (largest != i) {

      blocks[i].style.backgroundColor = "red";
      blocks[largest].style.backgroundColor = "red";

         await delay(800);
         playNote(500+i*200);
         playNote(200+i*200);

      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[largest].style.height;
      blocks[largest].style.height = temp1;
      blocks[i].childNodes[0].innerText =
      blocks[largest].childNodes[0].innerText;
      blocks[largest].childNodes[0].innerText = temp2;

      main();
      await delay(800);
 
      blocks[i].style.backgroundColor = "#6b5b95";
      blocks[largest].style.backgroundColor = "#6b5b95";
      // Recursively Hapify the affected sub-tree
      await Heapify(n, largest);

    }
  }
    
  // Asynchronous HeapSort function
  async function HeapSort(n) {
    var blocks = document.querySelectorAll(".block");
    var indexBox = document.querySelectorAll(".block2");
    
    // Build heap (rearrange array)
    for (var i = n / 2 - 1; i >= 0; i--) {
      await Heapify(n, i);
    }
    
    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {
    
      blocks[i].style.backgroundColor = "aqua";
      blocks[0].style.backgroundColor = "aqua";
      await delay(800);
      // Move current root to end
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[0].style.height;
      blocks[0].style.height = temp1;
      blocks[i].childNodes[0].innerText = 
      blocks[0].childNodes[0].innerText;
      blocks[0].childNodes[0].innerText = temp2;
      
      main();
      blocks[0].style.backgroundColor = "#6b5b95";
      blocks[i].style.backgroundColor = "rgb(26, 129, 26)";
      indexBox[i].style.backgroundColor = "rgb(26, 129, 26)";
      playNote(500+i*200);
      playNote(200+i*200);
    
      await delay(1000);
      // Call max Heapify on the reduced heap
      await Heapify(i, 0);
    }
    blocks[0].style.backgroundColor = "rgb(26, 129, 26)";
    indexBox[0].style.backgroundColor = "rgb(26, 129, 26)";
    enableNewArray();
  }

  getArray(totalBars);
  getIndex(totalBars);

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