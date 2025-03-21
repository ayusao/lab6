let container= document.getElementById("bar_container");
let positionContainer=document.getElementById("bar_pos_container");
let numOfBars=20;
const maxValue=100;
const minValue=5;
let unsortedArray=[];
let sortedArray=[];
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
  sortedArray=[];
  unsortedArray=[];
  container.style.width=`${(598/20)*arraySize.value}px`;
  positionContainer.style.width=`${(598/20)*arraySize.value}px`;
  numOfBars=parseInt(arraySize.value);
  generateArray(numOfBars);
  sortedArray=shellSort(unsortedArray);
  generateBar(sortedArray);
  displayBarPosition(numOfBars);
});

function disableSearchingBtn(){
  search_btn.style.opacity="0.7";
  document.querySelector("#search_btn").disabled = true;
}
function enableSearchingBtn(){
  search_btn.style.opacity="1";
  document.querySelector("#search_btn").disabled = false;
}

function disableNewArrayBtn(){
  new_array_btn.style.opacity="0.7";
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

function displayBarPosition(num)
{
  //deleteChildPosition();
  for (let i=0;i<num;i++)
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

function shellSort(array)
{
  let Gap=numOfBars;
  let temp;
  while(Gap>1){
    Gap=Math.floor((Gap+1)/2);
    for(let j=Gap;j<numOfBars;j++)
    {
      for(let i=(j-Gap);i>=0;i=(i-Gap))
      {
        let k=i+Gap;
        if(array[k]<array[i])
        {
          temp=array[i];
          array[i]=array[k];
          array[k]=temp;
        }
      }
    }
  }
  return array;
}
function timeDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve,ms));
}
let output=document.getElementById("output_text");
let output2=document.getElementById("output_text2");
let dataOutput=document.getElementById("data_text");
async function binarySearch(array){
  let bars=document.querySelectorAll(".bar");

  //Extracting value of element to be searched
  let num=document.getElementById("inputedData").value;
  //console.log(num);
 // num=`${num*4}px`;

  for(let i=0;i<bars.length;i++)
  {
    bars[i].style.backgroundColor="green";
  }
  await timeDelay(delay);
  output.innerText="";
  output2.innerText="";
  dataOutput.innerText="";
  //algorithm
  let start=0;
  let end=(bars.length-1);
  let pos=-1;
  while(start<=end)
  {
    let midd=Math.floor((start+end)/2);
    await  timeDelay(delay);
    playNote(500);
    bars[midd].style.backgroundColor="yellow";
    await timeDelay(delay);
    //let value=Number(bars[midd].childNodes[0].innerHTML);
    let value=array[midd];
    console.log(value);
    await timeDelay(delay);
    await timeDelay(delay);
    await timeDelay(delay);
    //console.log("hi");
    if(value==num)
    {
      pos=midd;
      playNote(400);
      await timeDelay(delay);
      playNote(400);
      bars[midd].style.backgroundColor="red";
      for(i=0;i<midd;i++)
      {
        bars[i].style.backgroundColor="grey";
      }
      for(i=midd+1;i<bars.length;i++)
      {
        bars[i].style.backgroundColor="grey";
      }
     // console.log("hi2");
      await timeDelay(delay);
      output.innerText="Element Found.";
      output2.innerText="The Position Of element In array is:";
      dataOutput.innerText=pos;
      //console.log("hi1");
      break;
    }
   if(value>num)
    {
      end=midd-1;
      await timeDelay(delay);
      bars[midd].style.backgroundColor="green";
      playNote(200+start*200);
      await timeDelay(delay);
      for(i=midd;i<bars.length;i++)
      {
        bars[i].style.backgroundColor="grey";
      }
      //console.log("hi2");
      await timeDelay(delay);
    }
    else //if(value<num)
    {
      start=midd+1;
      await timeDelay(delay);
      bars[midd].style.backgroundColor="green";
      playNote(200+start*200);
      await timeDelay(delay);
      for(i=0;i<=midd;i++)
      {
        bars[i].style.backgroundColor="grey";
      }
      //console.log("hi3");
      await timeDelay(delay);
    }
  }
  if(pos==-1)
  {
    output.innerHTML="Element Not Found";
    playNote(900);
    playNote(900);
  }
}

new_array_btn.addEventListener("click",function(){
  enableSearchingBtn();
  enableArraySizeBtn();
 sortedArray=[];
 unsortedArray=[];
 generateArray(numOfBars);
 sortedArray=shellSort(unsortedArray);
 generateBar(sortedArray);
 displayBarPosition(numOfBars);
 output.innerText="";
 output2.innerText="";
 dataOutput.innerText="";
});

search_btn.addEventListener("click",async function(){
  disableSearchingBtn();
  disableNewArrayBtn();
  disableArraySizeBtn();
  await binarySearch(sortedArray);
  enableNewArrayBtn();
});

generateArray(numOfBars);
sortedArray=shellSort(unsortedArray);
generateBar(sortedArray);
displayBarPosition(numOfBars);

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
