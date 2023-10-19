class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class BinarySearchTree {
    constructor (array) {
        array = array.sort((a, b) => (a - b));
        console.log(array)
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    buildTree(arr, start, end) {

        if (start > end) return null;
        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

    insertNode(val, rootNode = this.root) {
        if (rootNode === null) {
            return new Node(val);
        }
        if (val < rootNode.data) {
            rootNode.left = this.insertNode(val, rootNode.left)
        } else if (val > rootNode.data) {
            rootNode.right = this.insertNode(val, rootNode.right)
        }
        console.log(rootNode);
        return rootNode;
    }

    deleteNode(val, rootNode = this.root) {
        if (rootNode === null) {
            return rootNode;
        }

        if (val < rootNode.data) {
            rootNode.left = this.deleteNode(val, rootNode.left);
        } else if (val > rootNode.data) {
            rootNode.right = this.deleteNode(val, rootNode.right);
        } else {
            if (rootNode.left === null) {
                return rootNode.right;
            } else if (rootNode.right === null) {
                return rootNode.left;
            }
            rootNode.data = this.minValue(rootNode.right);
            rootNode.right = this.deleteNode(rootNode.data, rootNode.right)
        }
        return rootNode;
    }

    minValue(node) {
        let minV = node.data;
        while (node.left !== null) {
            node = node.left;
            minV = node.data;
        }
        return minV
    }

    find(val, rootNode = this.root) {
        if (rootNode.data == val) {
            return rootNode;
        }
        if (rootNode === null) {
            return;
        }
        if (val < rootNode.data) {
            return this.find(val, rootNode.left);
        } else if (val > rootNode.data) {
            return this.find(val, rootNode.right);
        }
    }

    levelOrder(fun) {
        let queue = [ this.root ];
        let answer = [];
        while (queue.length > 0) {
            let current = queue.shift();
            answer.push(current.data);
            if (fun) fun(current);
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        return answer;
    }

    inOrder(fnc) {
        function traverse(rootNode, result = []) {
            if (rootNode === null) return;

            traverse(rootNode.left, result);
            
            if (fnc) {
                fnc(rootNode);
            } else {
                result.push(rootNode.data);
            }

            traverse(rootNode.right, result);

            return result;
        }

        return traverse(this.root);
    }

    preOrder(fnc) {
        function traverse(rootNode, result = []) {
            if (rootNode === null) return;

            if (fnc) {
                fnc(rootNode);
            } else {
                result.push(rootNode.data);
            }

            traverse(rootNode.left, result);
            traverse(rootNode.right, result);

            return result;
        }

        return traverse(this.root);
    }


    postOrder(fnc) {
        function traverse(rootNode, result = []) {
            if (rootNode === null) return;

            traverse(rootNode.left, result);

            traverse(rootNode.right, result);

            if (fnc) {
                fnc(rootNode);
            } else {
                result.push(rootNode.data);
            }
            return result;
        }

        return traverse(this.root);
    };

    height(rootNode = this.root) {
        if (rootNode === null) return -1;
        const leftHeight = this.height(rootNode.left);
        const rightHeight = this.height(rootNode.right);

        return Math.max(leftHeight, rightHeight) + 1;
    };
    
    depth() {};

    isBalanced() {};

    rebalance() {};
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let example = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];

let bst = new BinarySearchTree(example);
prettyPrint(bst.root);
// bst.insert(24);
// prettyPrint(bst.root);
// bst.delete(4);
// prettyPrint(bst.root);
// prettyPrint(bst.find(67));
// console.log(bst.levelOrder())
// bst.levelOrder(node => {
//     console.log(node.data);
// })
console.log( bst.inOrder() )
console.log( bst.postOrder() )
console.log( bst.preOrder() )
console.log( bst.height() );