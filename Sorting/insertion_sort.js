/**
 * Created by Administrator on 2017/2/28 0028.
 */


/**
 *
 * @param raw_array {Array}
 * @returns sorted_array {Array}
 */
var insertionSort = function (raw_array) {
    var resultArray = [];
    if(raw_array.length==0){
        return resultArray;
    }else if(raw_array.length==1){
        resultArray.push(raw_array[0]);
        return resultArray;
    }else{
        resultArray.push(raw_array[0]);
        resultArray.push(Infinity);
        resultArray.unshift(-Infinity);
        var i = 1,
            j,
            resLength;
        while (i<raw_array.length){
            j = 0;
            resLength = resultArray.length;
            for(j=0;i<=resLength-2;j++){
                if(resultArray[j]<=raw_array[i]&&raw_array[i]<=resultArray[j+1]){
                    resultArray.splice(j+1,0,raw_array[i]);
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
console.log(
    insertionSort([1])
);
console.log(
    insertionSort([])
);
