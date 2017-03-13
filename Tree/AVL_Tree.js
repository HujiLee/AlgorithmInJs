/**
 * Created by Administrator on 2017/3/13 0013.
 */
var AvlNode = (function () {
    function AvlNode(value, left, right) {
        if (value === void 0) { value = 0; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.data = value;
        this.left = left;
        this.right = right;
    }
    Object.defineProperty(AvlNode.prototype, "depth", {
        get: function () {
            if (!this.left && !this.right) {
                return 1;
            }
            if (this.left && this.right) {
                return Math.max(this.left.depth, this.right.depth) + 1;
            }
            if (this.left) {
                return this.left.depth + 1;
            }
            if (this.right) {
                return this.right.depth + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    return AvlNode;
}());
var AVL_Tree = (function () {
    function AVL_Tree(node) {
        this.root = node;
    }
    return AVL_Tree;
}());
var root = new AvlNode();
root.left = new AvlNode(-9);
root.left.right = new AvlNode(-0.7);
root.right = new AvlNode(1);
'';
//# sourceMappingURL=AVL_Tree.js.map