/**
 * Created by Administrator on 2017/3/11 0011.
 */
var TreeNode = (function () {
    /**
     * @param data {Number}
     * @param left {Node}
     * @param right {Node}
     * @constructor
     */
    var Node = function (data, left, right) {
        "use strict";
        var data = data || 0;
        this.left = left || null;
        this.right = right || null;
        this.__defineGetter__("data", function () {
            return data;
        });
    };

    /**
     * @description 插入元素
     * @param node {Node}
     */
    Node.prototype.insert = function (node) {
        switch ((node.data - this.data) / Math.abs(node.data - this.data)) {
            case 0://do nothing
                break;
            case 1:
                if (this.right) {
                    this.right.insert(node);
                } else {
                    this.right = node;
                }
                break;
            case -1:
                if (this.left) {
                    this.left.insert(node);
                } else {
                    this.left = node;
                }
                break;
        }
        return this;
    };
    /**
     * @description 中序遍历
     */
    Node.prototype.inOrder = function () {
        if (this.left) {
            this.left.inOrder();
        }
        console.log(this.data);
        if (this.right) {
            this.right.inOrder();
        }

    };

    return Node;
})();

var root = new TreeNode(5);
root.insert(new TreeNode(5)).insert(new TreeNode(8));
root.insert(new TreeNode(6.5)).insert(new TreeNode(-2)).insert(new TreeNode(-1));
root.inOrder();
''