async function insertion(){
    console.log('Insertion sort()');
    const ele = document.querySelectorAll(".bar");//all the divs with the class bar
    ele[0].style.background = 'green';

    for(let i = 1; i < ele.length; i++){
        console.log(`${i}th loop`);
        let j = i - 1;
        let key = ele[i].style.height;

        //for last elem, if it is not to be moved color it green
        if(i==ele.length-1 && (parseInt(ele[j].style.height) <= parseInt(key)))
            ele[i].style.background = 'green';

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('Shifting');
            ele[i].style.background = 'purple';//selected element
            
            ele[j].style.background = 'red';
            ele[j + 1].style.height = ele[j].style.height;
            playNote(200+j*200);
            playNote(200+(j-ele.length)*200);
            j--;

            await delayRoutine(delay);

            // color for sorted
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
    }
}

const inSortbtn = document.querySelector(".insertionSort");

inSortbtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

