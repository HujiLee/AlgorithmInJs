/**
 * Created by Administrator on 2017/3/11 0011.
 */
var TreeNode = (function () {
    class Node {
        private data: Number;
        left: Node;
        right: Node;

        constructor(data: Number=0, left: Node=null, right:Node= null) {
            this.data = data ;
            this.left = left ;
            this.right = right ;
        }

        inOrderPrint():void {
            if (this.left) {
                this.left.inOrderPrint();
            }
            console.log(this.data);
            if (this.right) {
                this.right.inOrderPrint();
            }
        }

        insert(node:Node):Node {
            if(node.data>this.data){
                if(this.right){
                    this.right.insert(node)
                }else{
                    this.right = node;
                }
            }
            else if(node.data<this.data){
                if (this.left) {
                    this.left.insert(node);
                } else {
                    this.left = node;
                }
            }

            return this;
        }

        findMax():Number{
            if(this.right){
                return this.right.findMax();
            }else{
                return this.data
            }
        }

        findMin():Number{
            if(this.left){
                return this.left.findMin();
            }else{
                return this.data
            }
        }

        contains(number:Number):Boolean{
            if(this.data==number){
                return true;
            }
            else{
                if(this.data<number){
                    if(this.right){
                        return this.right.contains(number);
                    }else{
                        return false;
                    }
                }else{
                    if(this.left){
                        return this.left.contains(number);
                    }else {
                        return false;
                    }

                }
            }
        }
    }

    return  Node;
})();
var root = new TreeNode();
root.insert(new TreeNode(2)).insert(new TreeNode(4)).insert(new TreeNode(-2));
root.insert(new TreeNode(-0.5)).insert(new TreeNode(-9));
root.inOrderPrint();
console.log(root.findMax());
console.log(root.findMin());
console.log(root.contains(2),root.contains(1));
"";

