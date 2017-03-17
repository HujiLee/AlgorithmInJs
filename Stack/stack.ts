/**
 * Created by Administrator on 2017/3/17 0017.
 */

let Stack = (function () {
    class Stack<Type>{
        private datas:Array<Type> = [];
        pop():Type{
            if(this.datas.length==0){
                return null;
            }else{
                return this.datas.pop();
            }
        }

        get size():Number{
            return this.datas.length;
        }

        push(value:Type):Stack<Type>{
            this.datas.push(value);
            return this;
        }

        isEmpty():Boolean{
            return this.datas.length==0;
        }

        toString():String{
            return this.datas.join(",")
        }


    }

    return Stack;
})();

var s = new Stack<Number>();
s.push(258).push(147).push(9).push(1);
debugger;
console.log(
    s.pop(),s.size,s.pop(),s.size,s.pop(),s.size,s.pop(),s.size
);
debugger;
console.log(
   s.pop(),s.size
)
debugger;