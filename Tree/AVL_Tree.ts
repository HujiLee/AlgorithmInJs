/**
 * Created by Administrator on 2017/3/13 0013.
 */
class AvlNode{
    data:Number;
    left:AvlNode;
    right:AvlNode;
    constructor(value:Number = 0,left:AvlNode = null,right:AvlNode=null){
        this.data = value;
        this.left = left;
        this.right = right;
    }
    get depth(){
        if(!this.left&&!this.right){
            return 1;
        }
        if(this.left&&this.right){
            return Math.max(this.left.depth,this.right.depth)+1;
        }
        if(this.left){
            return this.left.depth+1;
        }
        if(this.right){
            return this.right.depth+1;
        }
    }
}

class AVL_Tree{
    root:AvlNode;

    constructor(node:AvlNode){
        this.root = node;

    }

}

var root = new AvlNode();
root.left = new AvlNode(-9);
root.left.right = new AvlNode(-0.7);
root.right = new AvlNode(1);
''