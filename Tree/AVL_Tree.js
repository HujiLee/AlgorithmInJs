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
                //Type,B平级,有着相同的父亲都需要重新设置深度
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
                    return node.balance();
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
                    return node.balance();
                }
            }
        };
        /**
         * @description this is the new node in the tree,so I will go up to find if this tree need rotation
         * @returns {_AvlNode}  the tree's root after balancing
         */
        _AvlNode.prototype.balance = function () {
            //find the Type,whose Factor = -2or2
            var AB = (function (self) {
                var p = self.parent;
                while (p.parent) {
                    if (Math.abs(p.parent.BalanceFactor) == 2) {
                        return [p.parent, p]; //[Type,B]
                    }
                    p = p.parent;
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
                        return (function LR(A, B) {
                            var C = B.right;
                            var Cl = C.left;
                            var Cr = C.right;
                            var Ap = A.parent;
                            C.left = B;
                            B.parent = C;
                            C.right = A;
                            A.parent = C;
                            C.parent = Ap;
                            if (Ap) {
                                Ap.data > C.data ? Ap.left = C : Ap.right = C;
                            }
                            B.right = Cl;
                            if (Cl)
                                Cl.parent = B;
                            A.left = Cr;
                            if (Cr)
                                Cr.parent = A;
                            return C.getRoot();
                        })(A, B);
                    case -3:
                        return (function (A, B) {
                            var Bl = B.left;
                            var Ap = A.parent;
                            A.right = Bl;
                            if (Bl)
                                Bl.parent = A;
                            B.left = A;
                            A.parent = B;
                            B.parent = Ap;
                            if (Ap) {
                                Ap.data > B.data ? Ap.left = B : Ap.right = B;
                            }
                            return B.getRoot();
                        })(A, B);
                    case -1:
                        return (function (A, B) {
                            var C = B.left;
                            var Cl = C.left;
                            var Cr = C.right;
                            var Ap = A.parent;
                            C.left = A;
                            A.parent = C;
                            C.right = B;
                            B.parent = C;
                            A.right = Cl;
                            if (Cl)
                                Cl.parent = A;
                            B.left = Cr;
                            if (Cr)
                                Cr.parent = B;
                            C.parent = Ap;
                            if (Ap) {
                                Ap.data > C.data ? Ap.left = C : Ap.right = C;
                            }
                            return C.getRoot();
                        })(A, B);
                }
            }
            else {
                return this.getRoot();
            }
        };
        return _AvlNode;
    }());
    var AVL_Tree = (function () {
        function AVL_Tree(x) {
            if (x instanceof _AvlNode) {
                this.root = x;
            }
            else if (typeof x === "number") {
                this.root = new _AvlNode(x);
            }
        }
        AVL_Tree.prototype.insert = function (nodeOrValue) {
            if (nodeOrValue instanceof _AvlNode) {
                this.root = this.root.insert(nodeOrValue);
            }
            else if (typeof nodeOrValue === "number") {
                this.root = this.root.insert(new _AvlNode(nodeOrValue));
            }
            return this;
        };
        Object.defineProperty(AVL_Tree, "node", {
            get: function () {
                return _AvlNode;
            },
            enumerable: true,
            configurable: true
        });
        return AVL_Tree;
    }());
    return AVL_Tree;
})();
{
    var Node_1 = AvlTree.node;
    var root = new Node_1(3);
    root.insert(new Node_1(1));
    root.insert(new Node_1(0));
    '';
}
{
    var Node_2 = AvlTree.node;
    var root = new Node_2(1);
    root.insert(new Node_2(-9));
    var nRoot = root.insert(new Node_2(0));
    '';
}
{
    var Node_3 = AvlTree.node;
    var root = new Node_3(1);
    root.insert(new Node_3(2));
    var nRoot = root.insert(new Node_3(3));
    '';
}
{
    var Node_4 = AvlTree.node;
    var root = new Node_4(1);
    root.insert(new Node_4(9));
    var nRoot = root.insert(new Node_4(3));
    '';
}
{
    var tree = new AvlTree(5);
    tree.insert(6).insert(1);
    tree.insert(-8).insert(2);
    tree.insert(3);
    '';
}
//# sourceMappingURL=AVL_Tree.js.map