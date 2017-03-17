/**
 * Created by Administrator on 2017/3/13 0013.
 */

var AvlTree = (function () {
    class _AvlNode {
        private data: Number;
        left: _AvlNode;
        right: _AvlNode;
        parent: _AvlNode;
        getDep: Function;
        setDep: Function;

        constructor(value: Number = 0, left: _AvlNode = null, right: _AvlNode = null, parent: _AvlNode = null) {
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

        get depthRecursion() {
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
        }

        get BalanceFactor() {
            return (this.left ? this.left.getDep() : 0) - (this.right ? this.right.getDep() : 0)
        }

        getRoot(): _AvlNode {
            if (this.parent) {
                return this.parent.getRoot();
            } else {
                return this;
            }
        }

        private static updateDepthAfterRotation(sourceNodeA: _AvlNode, sourceNodeB: _AvlNode = null) {
            sourceNodeA.setDep(Math.max(_AvlNode.getDepth(sourceNodeA.left), _AvlNode.getDepth(sourceNodeA.right)) + 1);
            if (sourceNodeB) {
                //A,B平级,有着相同的父亲都需要重新设置深度
                sourceNodeB.setDep(Math.max(_AvlNode.getDepth(sourceNodeB.left), _AvlNode.getDepth(sourceNodeB.right)) + 1);
            }
            if (sourceNodeA.parent) {
                _AvlNode.updateDepthAfterRotation(sourceNodeA.parent);
            }
        }

        private static getDepth(node: _AvlNode) {
            if (node) {
                return node.getDep();
            } else {
                return 0;
            }
        }

        private addDepthFromChild(child: _AvlNode) {
            if (!child) {
                return;//do nothing
            }
            if (this.right == child) {
                if (this.left && this.left.getDep() > child.getDep()) {
                    //do nothing
                } else {
                    this.setDep(child.getDep() + 1);
                    if (this.parent) {
                        this.parent.addDepthFromChild(this);
                    }
                }
            } else {
                if (this.right && this.right.getDep() > child.getDep()) {
                    //do nothing
                } else {
                    this.setDep(child.getDep() + 1);
                    if (this.parent) {
                        this.parent.addDepthFromChild(this);
                    }
                }

            }
        }

        /**
         *
         * @param node {_AvlNode} the new node going to be inserted
         * @returns {_AvlNode} the tree's root after inserting
         */
        insert(node: _AvlNode): _AvlNode {
            if (!node) {
                return this.getRoot();
            }
            if (node.data == this.data) {
                return this.getRoot();
            }
            //新数据大于本节点数据
            if (node.data > this.data) {
                if (this.right) {
                    return this.right.insert(node)
                } else {
                    this.right = node;
                    node.parent = this;
                    //从下到上,由于node的加入传导修改dep度
                    this.addDepthFromChild(node);
                    //旋转???
                    return node.balance();
                }
            }
            //新数据小于本节点数据
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
        }

        /**
         * @description this is the new node in the tree,so I will go up to find if this tree need rotation
         * @returns {_AvlNode}  the tree's root after balancing
         */
        private balance(): _AvlNode {
            //find the A,whose Factor = -2or2
            let AB = (function (self:_AvlNode): Array<_AvlNode> {
                var p = self.parent;
                while (p.parent) {
                    if (Math.abs(p.parent.BalanceFactor) == 2) {
                        return [p.parent, p];//[A,B]
                    }
                    p = p.parent;
                }
                return null;
            })(this);
            if (AB) {
                let A = AB[0];
                let B = AB[1];
                switch (A.BalanceFactor + B.BalanceFactor) {
                    case 3:
                        return (function LL(A, B): _AvlNode {
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
                            if (Cl)Cl.parent = B;
                            A.left = Cr;
                            if (Cr) Cr.parent = A;
                            return C.getRoot();
                        })(A, B);
                    case -3:
                        return (function (A, B) {
                            var Bl = B.left;
                            var Ap = A.parent;
                            A.right = Bl;
                            if (Bl)Bl.parent = A;
                            B.left = A;
                            A.parent = B;
                            B.parent = Ap;
                            if (Ap) {
                                Ap.data > B.data ? Ap.left = B : Ap.right = B;
                            }
                            return B.getRoot();
                        })(A, B);
                    case -1:
                        return (function (A,B) {
                            var C = B.left;
                            var Cl = C.left;
                            var Cr = C.right;
                            var Ap = A.parent;
                            C.left = A;
                            A.parent = C;
                            C.right = B;
                            B.parent = C;
                            A.right = Cl;
                            if(Cl)Cl.parent = A;
                            B.left = Cr;
                            if(Cr)Cr.parent = B;
                            C.parent = Ap;
                            if(Ap){
                                Ap.data > C.data ? Ap.left = C : Ap.right = C;
                            }
                            return C.getRoot();
                        })(A,B);
                }

            } else {
                return this.getRoot();
            }


        }


    }
    class AVL_Tree {
        root: _AvlNode;

        constructor(value:Number);
        constructor(node:_AvlNode);
        constructor(x) {
            if(x instanceof _AvlNode){
                this.root = x;
            }else if(typeof x ==="number"){
                this.root = new _AvlNode(x);
            }
        }

        insert(value:Number);
        insert(node:_AvlNode);
        insert(nodeOrValue):AVL_Tree{
            if(nodeOrValue instanceof _AvlNode){
                this.root = this.root.insert(nodeOrValue);
            } else if(typeof nodeOrValue ==="number"){
                this.root = this.root.insert(new _AvlNode(nodeOrValue))
            }
            return this;
        }

        static get node() {
            return _AvlNode;
        }

    }


    return AVL_Tree;
})();

{
    let Node = AvlTree.node;
    let root = new Node(3);
    root.insert(new Node(1));
    root.insert(new Node(0));
    ''
}
{
    let Node = AvlTree.node;
    let root = new Node(1);
    root.insert(new Node(-9));
    let nRoot = root.insert(new Node(0));
    ''
}
{
    let Node = AvlTree.node;
    let root = new Node(1);
    root.insert(new Node(2));
    let nRoot = root.insert(new Node(3));
    ''

}
{
    let Node = AvlTree.node;
    let root = new Node(1);
    root.insert(new Node(9));
    let nRoot = root.insert(new Node(3));
    ''
}
{
    let tree = new AvlTree(5);
    tree.insert(6).insert(1);
    tree.insert(-8).insert(2);


    tree.insert(3);
    ''
}
