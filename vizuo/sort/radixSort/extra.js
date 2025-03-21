
var sortBtn = document.getElementById("sort");
var newArrayBtn = document.getElementById("newArray");
var mArrayBtn = document.getElementById("sizeArray");
var aArrayBtn = document.getElementById("sizeArray2");

var speed = 1;
document.getElementById("counting").innerText = speed;
  
function increment() {
    if (speed < 4)
    speed = speed + 1;
    document.getElementById("counting").innerText = speed;
}

function decrement() {
    if(speed > 1)
    speed = speed - 1;
    document.getElementById("counting").innerText = speed;
}

document.getElementById("sizeCount").innerText = totalBars;
function incrementSize() {
    if (totalBars < 30)
    {
    totalBars++;
    container.style.width=`${(598/20)*totalBars}px`;
    getArray(totalBars);
    getIndex(totalBars);
    }
    document.getElementById("sizeCount").innerText = totalBars;
}

function decrementSize() {
    if(totalBars > 15)
    {
    totalBars--;
    container.style.width=`${(598/20)*totalBars}px`;
    getArray(totalBars);
    getIndex(totalBars);
    }
    document.getElementById("sizeCount").innerText = totalBars;
}


  function deleteChild() {
    count_container.innerHTML = '';
  }
  function deleteChildArray() {
    container.innerHTML = '';
  }

 function disableSortingBtn(){
    sortBtn.style.backgroundColor= "grey";
    document.querySelector("#sort").disabled = true;
  }
  
  function enableSortingBtn(){
    sortBtn.style.backgroundColor="#6b5b95";
    document.querySelector("#sort").disabled = false;
  }
  
  function disableNewArray(){
    newArrayBtn.style.backgroundColor="grey";
    document.querySelector("#newArray").disabled = true;
  }
  
  function enableNewArray(){
    newArrayBtn.style.backgroundColor="#6b5b95";
    document.querySelector("#newArray").disabled = false;
  }
  
  function disableArraySizeBtn(){
    mArrayBtn.style.backgroundColor="grey";
    aArrayBtn.style.backgroundColor="grey";
    document.querySelector("#sizeArray").disabled= true;
    document.querySelector("#sizeArray2").disabled = true;
  }
  function enableArraySizeBtn(){
    mArrayBtn.style.backgroundColor="#6b5b95";
    aArrayBtn.style.backgroundColor="#6b5b95";
    document.querySelector("#sizeArray").disabled= false;
    document.querySelector("#sizeArray2").disabled = false;
  }

  newArray.addEventListener("click",function(){
    enableSortingBtn();
    enableArraySizeBtn();
    getArray(totalBars);
    getIndex(totalBars);
  });

  sortBtn.addEventListener("click", async function(){
    disableSortingBtn();
    disableNewArray()
    disableArraySizeBtn();
    play();
   });

   getArray(totalBars);
   getIndex(totalBars);