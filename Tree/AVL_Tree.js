/**
 * Created by Administrator on 2017/3/13 0013.
 */
var AvlTree = (function () {
    var _AvlNode = (function () {
        function _AvlNode(value, left, right, parent) {
            if (value === void 0) { value = 0; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            if (parent === void 0) { parent = null; }
            this.data = value;
            this.left = left;
            this.right = right;
            this.parent = parent;
            var dep = 1;
            this.getDep = function () {
                return dep;
            };
            this.setDep = function (value) {
                dep = value;
            };
        }
        Object.defineProperty(_AvlNode.prototype, "depthRecursion", {
            get: function () {
                if (!this.left && !this.right) {
                    return 1;
                }
                if (this.left && this.right) {
                    return Math.max(this.left.depthRecursion, this.right.depthRecursion) + 1;
                }
                if (this.left) {
                    return this.left.depthRecursion + 1;
                }
                if (this.right) {
                    return this.right.depthRecursion + 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_AvlNode.prototype, "BalanceFactor", {
            get: function () {
                return (this.left ? this.left.getDep() : 0) - (this.right ? this.right.getDep() : 0);
            },
            enumerable: true,
            configurable: true
        });
        _AvlNode.prototype.getRoot = function () {
            if (this.parent) {
                return this.parent.getRoot();
            }
            else {
                return this;
            }
        };
        _AvlNode.updateDepthAfterRotation = function (sourceNodeA, sourceNodeB) {
            if (sourceNodeB === void 0) { sourceNodeB = null; }
            sourceNodeA.setDep(Math.max(_AvlNode.getDepth(sourceNodeA.left), _AvlNode.getDepth(sourceNodeA.right)) + 1);
            if (sourceNodeB) {
                //A,B平级,有着相同的父亲都需要重新设置深度
                sourceNodeB.setDep(Math.max(_AvlNode.getDepth(sourceNodeB.left), _AvlNode.getDepth(sourceNodeB.right)) + 1);
            }
            if (sourceNodeA.parent) {
                _AvlNode.updateDepthAfterRotation(sourceNodeA.parent);
            }
        };
        _AvlNode.getDepth = function (node) {
            if (node) {
                return node.getDep();
            }
            else {
                return 0;
            }
        };
        _AvlNode.prototype.addDepthFromChild = function (child) {
            if (!child) {
                return; //do nothing
            }
            if (this.right == child) {
                if (this.left && this.left.getDep() > child.getDep()) {
                    //do nothing
                }
                else {
                    this.setDep(child.getDep() + 1);
                    if (this.parent) {
                        this.parent.addDepthFromChild(this);
                    }
                }
            }
            else {
                if (this.right && this.right.getDep() > child.getDep()) {
                    //do nothing
                }
                else {
                    this.setDep(child.getDep() + 1);
                    if (this.parent) {
                        this.parent.addDepthFromChild(this);
                    }
                }
            }
        };
        /**
         *
         * @param node {_AvlNode} the new node going to be inserted
         * @returns {_AvlNode} the tree's root after inserting
         */
        _AvlNode.prototype.insert = function (node) {
            if (!node) {
                return this.getRoot();
            }
            if (node.data == this.data) {
                return this.getRoot();
            }
            //新数据大于本节点数据
            if (node.data > this.data) {
                if (this.right) {
                    return this.right.insert(node);
                }
                else {
                    this.right = node;
                    node.parent = this;
                    //从下到上,由于node的加入传导修改dep度
                    this.addDepthFromChild(node);
                    //旋转???
                    node.balance();
                }
            }
            else {
                if (this.left) {
                    return this.left.insert(node);
                }
                else {
                    this.left = node;
                    node.parent = this;
                    this.addDepthFromChild(node);
                    //??旋转??
                    node.balance();
                }
            }
        };
        /**
         * @description this is the new node in the tree,so I will go up to find if this tree need rotation
         * @returns {_AvlNode}  the tree's root after balancing
         */
        _AvlNode.prototype.balance = function () {
            //find the A,whose Factor = -2or2
            var AB = (function (self) {
                var p = self.parent;
                while (p.parent) {
                    if (Math.abs(p.parent.BalanceFactor) == 2) {
                        return [p.parent, p]; //[A,B]
                    }
                }
                return null;
            })(this);
            if (AB) {
                var A = AB[0];
                var B = AB[1];
                switch (A.BalanceFactor + B.BalanceFactor) {
                    case 3:
                        return (function LL(A, B) {
                            var Br = B.right;
                            var Ap = A.parent;
                            A.left = Br;
                            if (Br) {
                                Br.parent = A;
                            }
                            B.right = A;
                            A.parent = B;
                            B.parent = Ap;
                            if (Ap) {
                                Ap.data > B.data ? Ap.left = B : Ap.right = B;
                            }
                            _AvlNode.updateDepthAfterRotation(A);
                            return B.getRoot();
                        })(A, B);
                    case 1:
                    case -3:
                    case -1:
                }
            }
            else {
                return this.getRoot();
            }
        };
        return _AvlNode;
    }());
    var AVL_Tree = (function () {
        function AVL_Tree(node) {
            this.root = node;
        }
        return AVL_Tree;
    }());
    AVL_Tree.node = _AvlNode;
    return AVL_Tree;
})();
{
    var Node_1 = AvlTree.node;
    var root = new Node_1(3);
    root.insert(new Node_1(1));
    root.insert(new Node_1(0));
    '';
}
//# sourceMappingURL=AVL_Tree.js.map