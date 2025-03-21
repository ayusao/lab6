function lead(n){

    switch(n){
        case 1:
            location.href = 'bubbleSort/bubble.html';
            break;
        case 2:
            location.href = 'insertionSort/insertion.html';
            break;
        case 3:
            location.href = 'selectionSort/selection.html';
            break;
        case 4:
            location.href = 'quickSort/quick.html';
            break;
        case 5:
            location.href = 'mergeSort/merge.html';
            break;
        case 6:
            location.href = 'heapSort/heapMain.html';
            break;
        case 7:
            location.href = 'radixSort/radixMain.html';
            break;
        case 8:
            location.href = 'shellSort/shell.html';
            break;
        case 9: 
            location.href = '../main.html';
            break;
        default:
            location.href = '../main.html';
            break;
    }
}