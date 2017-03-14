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

        /**
         * @description 中序遍历,显示的就是从小到大排列
         */
        inOrderPrint(): void {
            if (this.left) {
                this.left.inOrderPrint();
            }
            console.log(this.data);
            if (this.right) {
                this.right.inOrderPrint();
            }
        }

        /**
         *
         * @param node
         * @returns {_Node} the root node itself
         */
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

        /**
         *
         * @returns {_Node} the node containing the maximum value
         */
        findMax(): _Node {
            if (this.right) {
                return this.right.findMax();
            } else {
                return this;
            }
        }

        /**
         *
         * @returns {_Node} the node containing the minimum value
         */
        findMin(): _Node {
            if (this.left) {
                return this.left.findMin();
            } else {
                return this;
            }
        }


        /**
         * @description if contains this number,return the node containing it;else return null
         * @param number
         * @returns {_Node}
         */
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
         * @returns {_Node} return the tree root after removing the node
         */
        remove(number: Number):_Node {
            let n = this.contains(number);
            if(n){
                let np = n.parent;
                /**
                 * @description np exists,so n is not the tree root
                 */
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
                }
                /**
                 * @description n is the tree root
                 */
                else{
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
{
    let root = new BiNode();
    root.insert(new BiNode(2)).insert(new BiNode(4)).insert(new BiNode(-2));
    root.insert(new BiNode(-0.5)).insert(new BiNode(-9));
    root.inOrderPrint();
    console.log(root.findMax());
    console.log(root.findMin());
    console.log(root.contains(2), root.contains(1));
    this["remove-2"] = root.remove(-2);
    var newRoot = root.remove(0);
    "";
}


