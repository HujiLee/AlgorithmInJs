/**
 * Created by Administrator on 2017/3/11 0011.
 */
var TreeNode = (function () {
    var Node = (function () {
        function Node(data, left, right) {
            if (data === void 0) { data = 0; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            this.data = data;
            this.left = left;
            this.right = right;
        }
        Node.prototype.inOrderPrint = function () {
            if (this.left) {
                this.left.inOrderPrint();
            }
            console.log(this.data);
            if (this.right) {
                this.right.inOrderPrint();
            }
        };
        Node.prototype.insert = function (node) {
            if (node.data > this.data) {
                if (this.right) {
                    this.right.insert(node);
                }
                else {
                    this.right = node;
                }
            }
            else if (node.data < this.data) {
                if (this.left) {
                    this.left.insert(node);
                }
                else {
                    this.left = node;
                }
            }
            return this;
        };
        Node.prototype.findMax = function () {
            if (this.right) {
                return this.right.findMax();
            }
            else {
                return this.data;
            }
        };
        Node.prototype.findMin = function () {
            if (this.left) {
                return this.left.findMin();
            }
            else {
                return this.data;
            }
        };
        Node.prototype.contains = function (number) {
            if (this.data == number) {
                return true;
            }
            else {
                if (this.data < number) {
                    if (this.right) {
                        return this.right.contains(number);
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (this.left) {
                        return this.left.contains(number);
                    }
                    else {
                        return false;
                    }
                }
            }
        };
        return Node;
    }());
    return Node;
})();
var root = new TreeNode();
root.insert(new TreeNode(2)).insert(new TreeNode(4)).insert(new TreeNode(-2));
root.insert(new TreeNode(-0.5)).insert(new TreeNode(-9));
root.inOrderPrint();
console.log(root.findMax());
console.log(root.findMin());
console.log(root.contains(2), root.contains(1));
"";
//# sourceMappingURL=binarySearchTree.js.map