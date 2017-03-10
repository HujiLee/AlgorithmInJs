/**
 * Created by Administrator on 2017/3/5 0005.
 */

/**
 *
 * @param raw {Array}
 * @returns sorted_array {Array}
 */
var bubbleSort = function (raw) {
    var sorted = raw.slice(0),
        temp;
    while (true) {
        var bool = false;
        for (var i = 0; i <= sorted.length - 2; i++) {
            if (sorted[i] > sorted[i + 1]) {
                temp = sorted[i];
                sorted[i] = sorted[i + 1];
                sorted[i + 1] = temp;
                bool = true;//进行了交换,说明还需要下一轮的检测来保证已经排序完毕
            }
        }
        if (!bool) {
            break;//这一轮没有进行过交换,说明已经排序完毕
        }
    }
    return sorted;
};

console.log(
    bubbleSort([Infinity,1, 2, -1])
);
console.log(
    bubbleSort([9.8,-5,11, 21,11 ,-1,-1])
);