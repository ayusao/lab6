async function partition(ele, beg, end) {
    console.log('Partition() ', `left = ${beg}, right = ${end}`);

    if (beg < end) {
        let pivot = beg;
        let left = beg;
        let right = end;
        let key = ele[pivot].style.height;

        ele[right].style.background = 'blue';
        ele[left].style.background = 'purple';
        await delayRoutine(delay);
        await delayRoutine(delay);
        ele[pivot].style.background = 'red';
        await delayRoutine(delay);

        while (left < right) {
            while (parseInt(ele[left].style.height) <= parseInt(key) && left < end) {
                ele[left].style.background = '#6b5b95';
                left++;
                ele[left].style.background = 'purple';
                ele[pivot].style.background = 'red';
                await delayRoutine(delay);
            }

            while (parseInt(ele[right].style.height) > parseInt(key)) {
                ele[right].style.background = '#6b5b95';
                right--;
                ele[right].style.background = 'blue';
                await delayRoutine(delay);
            }

            if (left < right) {
                swap(ele[left], ele[right]);
                playNote(200+left*300);
                playNote(200+(right-ele.length)*300);
                ele[right].style.background = 'purple';
                ele[left].style.background = 'blue';
                await delayRoutine(delay);
                await delayRoutine(delay);
                ele[right].style.background = 'blue';
                ele[left].style.background = 'purple';
            }
        }
        await delayRoutine(delay);
        await delayRoutine(delay);
        playNote(400);
        swap(ele[pivot], ele[right]);
        ele[right].style.background = 'green';
        ele[pivot].style.background = '#6b5b95';
        return right;
    }
    else
        return;
    
}

async function quicksort(ele, beg, end) {
    console.log("Quick sort(): ", `left = ${beg}, right = ${end}`);
    if (beg < end) {
        let pivotindex = await partition(ele, beg, end);
        if(pivotindex==0)
        {
            playNote(400);
            ele[0].style.background = 'green';
        }
        await quicksort(ele, beg, pivotindex - 1);
        await quicksort(ele, pivotindex + 1, end);
    }
    else if (beg>=end)
    {
        if(beg >= 0 && end >= 0 && beg <ele.length && end <ele.length){
            playNote(400);
            ele[beg].style.background = 'green';
            ele[end].style.background = 'green';
        }
    }
}


const quickSortbtn = document.querySelector(".quickSort");

quickSortbtn.addEventListener('click', async function () {
    let ele = document.querySelectorAll('.bar');
    let beg = 0;
    let end = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quicksort(ele, beg, end);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

