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

        inOrderPrint() {
            if (this.left) {
                this.left.inOrderPrint();
            }
            console.log(this.data);
            if (this.right) {
                this.right.inOrderPrint();
            }
        }

        insert(node:Node) {
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
    }

    return  Node;
})();
var root = new TreeNode();
root.insert(new TreeNode(2)).insert(new TreeNode(4)).insert(new TreeNode(-2));
root.insert(new TreeNode(-0.5)).insert(new TreeNode(-9));
root.inOrderPrint();
"";

