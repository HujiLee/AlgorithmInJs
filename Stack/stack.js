/**
 * Created by Administrator on 2017/3/17 0017.
 */
var Stack = (function () {
    var Stack = (function () {
        function Stack() {
            this.datas = [];
        }
        Stack.prototype.pop = function () {
            if (this.datas.length == 0) {
                return null;
            }
            else {
                return this.datas.pop();
            }
        };
        Object.defineProperty(Stack.prototype, "size", {
            get: function () {
                return this.datas.length;
            },
            enumerable: true,
            configurable: true
        });
        Stack.prototype.push = function (value) {
            this.datas.push(value);
            return this;
        };
        Stack.prototype.isEmpty = function () {
            return this.datas.length == 0;
        };
        Stack.prototype.toString = function () {
            return this.datas.join(",");
        };
        return Stack;
    }());
    return Stack;
})();
var s = new Stack();
s.push(258).push(147).push(9).push(1);
debugger;
console.log(s.pop(), s.size, s.pop(), s.size, s.pop(), s.size, s.pop(), s.size);
debugger;
console.log(s.pop(), s.size);
debugger;
//# sourceMappingURL=stack.js.map