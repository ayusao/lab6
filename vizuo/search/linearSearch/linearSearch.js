let container= document.getElementById("bar_container");
let positionContainer=document.getElementById("bar_pos_container");
let numOfBars=20;
const maxValue=100;
const minValue=5;
let unsortedArray=[];
let delay=300;
let delayElement = document.querySelector('#speed_input');
let arraySize=document.querySelector("#array_size")
let search_btn=document.getElementById("search_btn");
let new_array_btn=document.getElementById("new_array_btn");

function deleteChild(){
  container.innerHTML='';
  positionContainer.innerHTML='';
}

delayElement.addEventListener('input', function(){
  delay = 320 - parseInt(delayElement.value);//the more the slider goes right, lesser the delay value ie faster the speed
});

arraySize.addEventListener('input',function(){
  unsortedArray=[];
  container.style.width=`${(598/20)*arraySize.value}px`;
  positionContainer.style.width=`${(598/20)*arraySize.value}px`;
  numOfBars=parseInt(arraySize.value);
  generateArray(numOfBars);
  generateBar(unsortedArray);
  displayBarPosition(unsortedArray);
});

function disableSearchingBtn(){
  search_btn.style.opacity="0.4";
  document.querySelector("#search_btn").disabled = true;
}
function enableSearchingBtn(){
  search_btn.style.opacity="1";
  document.querySelector("#search_btn").disabled = false;
}

function disableNewArrayBtn(){
  new_array_btn.style.opacity="0.4";
  document.querySelector("#new_array_btn").disabled = true;
}
function enableNewArrayBtn(){
  new_array_btn.style.opacity="1";
  document.querySelector("#new_array_btn").disabled = false;
}

function disableArraySizeBtn(){
    document.querySelector("#array_size").disabled=true;
  }
  function enableArraySizeBtn(){
    document.querySelector("#array_size").disabled=false;
  }

function generateRandomNum(min,max)
{
  return(Math.floor(Math.random()*(max-min)+min));
}
function generateArray(num)
{
  for(i=0;i<num;i++)
  {
    let randomNum=generateRandomNum(minValue,maxValue);
    unsortedArray[i]=randomNum;
  }
}

function generateBar(array)
{
  deleteChild();
  for(let i=0;i<array.length;i++)
  {
    let bars=document.createElement("div");
    bars.classList.add("bar");

    bars.style.height=`${array[i]*4}px`;
    bars.style.transform=`translate(${i*33}px)`;

    let barsLabel=document.createElement("label");
    barsLabel.classList.add("bar_size");
    barsLabel.innerText=array[i];

    bars.appendChild(barsLabel);
    container.appendChild(bars);
  }
}

function displayBarPosition(array)
{
  for (let i=0;i<array.length;i++)
  {
    let positions=document.createElement("div");
    positions.classList.add("position");

    positions.style.height=`${20}px`;
    positions.style.transform=`translate(${i*33}px)`;

    let barsPosition=document.createElement("label");
    barsPosition.classList.add("bar_position");
    barsPosition.innerText=i;

    positions.appendChild(barsPosition);
    positionContainer.appendChild(positions);
  }
}

function timeDelay(ms){
  return new Promise((resolve)=>setTimeout(resolve,ms));
}
let output=document.getElementById("output_text");
let output2=document.getElementById("output_text2");
let dataOutput=document.getElementById("data_text");
async function linearSearch(array)
{
  let bars=document.querySelectorAll(".bar");

  let num=document.getElementById("inputedData").value;

  for(let i=0;i<bars.length;i++)
  {
    bars[i].style.backgroundColor="green";
  }
  await timeDelay(delay);
  output.innerText="";
  output2.innerText="";
  dataOutput.innerText="";

  let pos=-1;
  let value;
  //algorithm
  for(i=0;i<bars.length;i++)
  {
    await timeDelay(delay);
    bars[i].style.backgroundColor="yellow";
    playNote(200+i*200);
    playNote(800-i*100);
    await timeDelay(delay);
     value=array[i];
     if(value==num)
     {
      pos=i;
      await timeDelay(delay);
      bars[i].style.backgroundColor="red";
      playNote(400);
      await timeDelay(delay);
      for(let j=i+1;j<bars.length;j++)
      {
        bars[j].style.backgroundColor="grey";
      }
      await timeDelay(delay);
      output.innerText="Element Found.";
      output2.innerText="The Position Of element In array is:";
      dataOutput.innerText=pos;
      break;
    }
    await timeDelay(delay);
    bars[i].style.backgroundColor="grey";
  }
  if(pos==-1)
  {
    playNote(900);
    playNote(900);
    output.innerHTML="Element Not Found";
  }
}

new_array_btn.addEventListener("click",function(){
  enableSearchingBtn();
  enableArraySizeBtn();
 sortedArray=[];
 unsortedArray=[];
 generateArray(numOfBars);
 generateBar(unsortedArray);
 displayBarPosition(unsortedArray);
 output.innerText="";
 output2.innerText="";
 dataOutput.innerText="";
});
search_btn.addEventListener("click",async function(){
  disableSearchingBtn();
  disableNewArrayBtn();
  disableArraySizeBtn();
  await linearSearch(unsortedArray);
  enableNewArrayBtn();
});
generateArray(numOfBars);
generateBar(unsortedArray);
displayBarPosition(unsortedArray);

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
