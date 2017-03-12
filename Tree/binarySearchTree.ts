/**
 * Created by Administrator on 2017/3/11 0011.
 */
var BiNode = (function () {
    class _Node {
        private data: Number;
        left: _Node;
        right: _Node;
        private parent:_Node = null;
        constructor(data: Number = 0, left: _Node = null, right: _Node = null) {
            this.data = data;
            this.left = left;
            this.right = right;

        }

        inOrderPrint(): void {
            if (this.left) {
                this.left.inOrderPrint();
            }
            console.log(this.data);
            if (this.right) {
                this.right.inOrderPrint();
            }
        }

        insert(node: _Node): _Node {
            if(!node){
                return null;
            }
            if (node.data > this.data) {
                if (this.right) {
                    this.right.insert(node)
                } else {
                    this.right = node;
                    this.right.parent = this;
                }
            }
            else if (node.data < this.data) {
                if (this.left) {
                    this.left.insert(node);
                } else {
                    this.left = node;
                    this.left.parent = this;
                }
            }

            return this;
        }

        findMax(): Number {
            if (this.right) {
                return this.right.findMax();
            } else {
                return this.data
            }
        }

        findMin(): Number {
            if (this.left) {
                return this.left.findMin();
            } else {
                return this.data
            }
        }


        contains(number: Number): _Node {
            if (this.data == number) {
                return this;
            }
            else {
                if (this.data < number) {
                    if (this.right) {
                        return this.right.contains(number);
                    } else {
                        return null;
                    }
                } else {
                    if (this.left) {
                        return this.left.contains(number);
                    } else {
                        return null;
                    }

                }
            }
        }

        /**
         *
         * @param number
         * @returns {_Node} return the root after removing the node
         */
        remove(number: Number):_Node {
            let n = this.contains(number);
            if(n){
                let np = n.parent;
                if(np){
                    if(n===np.right){
                        np.right = n.right;
                        np.right.parent = np;
                        np.right.insert(n.left);
                    }else{
                        np.left = n.left;
                        np.left.parent = np;
                        np.left.insert(n.right)
                    }
                    return this;
                }else{
                    //set n.right as new root
                    n.right.insert(n.left);
                    n.right.parent = null;
                    return n.right;
                }
            }else{
                return this;
            }


        }


    }

    return _Node;
})();
var root = new BiNode();
root.insert(new BiNode(2)).insert(new BiNode(4)).insert(new BiNode(-2));
root.insert(new BiNode(-0.5)).insert(new BiNode(-9));
root.inOrderPrint();
console.log(root.findMax());
console.log(root.findMin());
console.log(root.contains(2), root.contains(1));
this["remove-2"] = root.remove(-2);
var newRoot = root.remove(0);
"";

