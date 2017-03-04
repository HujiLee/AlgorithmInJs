/**
 * Created by Administrator on 2017/3/4 0004.
 */

var TreeNode = (function () {
    var TheNode = function (data, left, right, parent) {
        "use strict";
        this.data = data;
        this.left = left || null;
        this.right = right || null;
        this.parent = parent || null;
    };
    /**
     * @returns {Number} 以本节点为root的子树的深度
     */
    TheNode.prototype.getDepth = function () {
        if (this.left) {
            if (this.right) {
                return Math.max(this.right.getDepth(), this.left.getDepth()) + 1;
            } else {
                return this.left.getDepth() + 1;
            }
        } else {
            if (this.right) {
                return this.right.getDepth() + 1;
            } else {
                return 1;
            }

        }
    };
    /**
     * 定义:平衡因子BF(Balance Factor)为该结点的左子树的深度减去它的右子树的深度
     */
    TheNode.prototype.__defineGetter__("BF", function () {
        return depth(this.left) - depth(this.right);
    });
    var depth = function (node) {
        if (!!node && node instanceof TheNode) {
            return node.getDepth();
        } else {
            return 0;
        }
    };
    /**
     * @param node {TheNode}
     */
    TheNode.prototype.insert = function (node) {
        if (node.data >= this.data) {
            if (this.right) {
                this.right.insert(node)
            } else {
                this.right = node;
                node.parent = this;
            }
        } else {
            if (this.left) {
                this.left.insert(node);
            } else {
                this.left = node;
                node.parent = this;
            }
        }
    };
    /**
     *
     * @param node {TheNode}
     */
    TheNode.prototype.printPreOrder = function () {
        console.log(this.data);
        if (this.left) {
            this.left.printPreOrder();
        }
        if (this.right) {
            this.printPreOrder.call(this.right);
        }
    };
    return TheNode;
})();
var AvlTree = (function () {
    var AVL = function () {
        this.root = null;
    };
    /**
     * @param node {TreeNode}
     */
    AVL.prototype.insert = function (node) {
        if (this.root == null) {
            this.root = node;
        } else {
            this.root.insert(node);
            //todo:翻转树??
            //todo:考虑到问题的前提是排好序的数组变成二叉排序树,只需要考虑其中一种情况
            var current = node;

            while (current.parent != null) {
                if (current.BF == -1 && current.parent.BF == -2) {
                    //翻转了昂
                    var A = current.parent,
                        B = current,
                        Bl = B.left,
                        needChangeRoot = (A == this.root);
                    if (A.parent) {
                        A.parent.right = B;
                    }
                    B.parent = A.parent;
                    A.parent = B;
                    B.left = A;
                    A.right = Bl;
                    if (Bl) {
                        Bl.parent = A;
                    }
                    if (needChangeRoot) {
                        //要改this.root了
                        this.root = B;
                    }
                    break;
                }
                current = current.parent;
            }
        }

    };

    /**
     * 打印前序遍历
     */
    AVL.prototype.printPreOrder = function () {
        if (this.root == null) {
            console.log(null)
        } else {
            this.root.printPreOrder();
        }
    };
    return AVL;
})();
var tree = new AvlTree();
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16];
(function () {
    for (var i in array) {
        console.log("___",array[i]);
        tree.insert(new TreeNode(array[i]));
        tree.printPreOrder();
        debugger;
    }
})();







