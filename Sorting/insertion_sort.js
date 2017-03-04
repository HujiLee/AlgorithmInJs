/**
 * Created by Administrator on 2017/2/28 0028.
 */



var insertionSort = function (array) {
    var resultArray = [];
    if(array.length==0){
        return resultArray;
    }else if(array.length==1){
        resultArray.push(array[0]);
        return resultArray;
    }else{
        resultArray.push(array[0]);
        resultArray.push(Infinity);
        resultArray.unshift(-Infinity);
        var i = 1,
            j,
            resLength;
        while (i<array.length){
            j = 0;
            resLength = resultArray.length;
            for(j=0;i<=resLength-2;j++){
                if(resultArray[j]<=array[i]&&array[i]<=resultArray[j+1]){
                    resultArray.splice(j+1,0,array[i]);
                    break;//不能缺!!!否则就是死循环
                }
            }
            i++;
        }
        resultArray.splice(0,1);
        resultArray.splice(-1,1);
        return resultArray;

    }

};
console.log(
    insertionSort([1,9,8,12,-5,-7,8,0,Infinity])//[ -7, -5, 0, 1, 8, 8, 9, 12, Infinity ]
);
