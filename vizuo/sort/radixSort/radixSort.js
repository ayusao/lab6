let arr = [];
var totalBars = 20;
document.getElementById("sizeCount").innerText = totalBars;
function incrementSize() {
    if (totalBars < 30)
    {
    totalBars++;
    getArray(totalBars);
    getIndex(totalBars);
    }
    document.getElementById("sizeCount").innerText = totalBars;
}
function decrementSize() {
    if(totalBars > 10)
    {
    totalBars--;
    getArray(totalBars);
    getIndex(totalBars);
    }
    document.getElementById("sizeCount").innerText = totalBars;
}

var container = document.getElementById("array");
function getArray(b) {

    deleteChildArray();
    for (var i = 0; i < b; i++) {
        var randomValue = Math.ceil(Math.random() * 100);

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

var count_container = document.getElementById("count");

function getIndex(b) {
    deleteChild();
    for (var i = 0; i < b; i++) {
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

async function delay(m) {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, m - (speed * 250)));
}
// Radix sort Javascript implementation
// A utility function to get maximum value in arr[]
function getMax(arr, n) {
    let mx = arr[0];
    for (let i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

// A function to do counting sort of arr[] according to
// the digit represented by exp.
function countSort(arr, n, exp) {
    var blocks = document.querySelectorAll(".block");
    let output = new Array(n); // output array
    let i;
    let count = new Array(10);
    for (let i = 0; i < 10; i++)
        count[i] = 0;

    // Store count of occurrences in count[]
    for (i = 0; i < n; i++)
        count[Math.floor(arr[i] / exp) % 10]++;

    // Change count[i] so that count[i] now contains
    // actual position of this digit in output[]
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array

    for (i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
    for (i = 0; i < n; i++) {
        arr[i] = output[i];
        playNote(700);
        blocks[i].style.height = `${output[i] * 3}px`;
        blocks[i].childNodes[0].innerText = output[i];
    }
}

async function radixsort(arr, n) {
    var blocks = document.querySelectorAll(".block");
    var indexBox = document.querySelectorAll(".block2");
    for (var j = 0; j < totalBars; j++) {
        arr[j] = Number(blocks[j].childNodes[0].innerText);
    }
    // Find the maximum number to know number of digits
    let m = getMax(arr, n);

    // Do counting sort for every digit. Note that
    // instead of passing digit number, exp is passed.
    // exp is 10^i where i is current digit number
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        await delay(2000);
        countSort(arr, n, exp)
    }
    for (var k = 0; k < totalBars; k++) {
        playNote(700);
        blocks[k].style.backgroundColor = "rgb(26, 129, 26)";
        indexBox[k].style.backgroundColor = "rgb(26, 129, 26)";
    }
    enableNewArray();
}
function play()
{
    radixsort(arr,totalBars);
}

let audioCtx = null;

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.05;

    osc.connect(node);
    node.connect(audioCtx.destination);
}
