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

    insert(val, rootNode = this.root) {
        if (rootNode === null) {
            return new Node(val);
        }
        if (val < rootNode.data) {
            rootNode.left = this.insert(val, rootNode.left)
        } else if (val > rootNode.data) {
            rootNode.right = this.insert(val, rootNode.right)
        }
        console.log(rootNode);
        return rootNode;
    }

    delete(val, rootNode = this.root) {
        if (rootNode === null) {
            return rootNode;
        }

        if (val < rootNode.data) {
            rootNode.left = this.delete(val, rootNode.left);
        } else if (val > rootNode.data) {
            rootNode.right = this.delete(val, rootNode.right);
        } else {
            console.log(rootNode);
            if (rootNode.left === null) {
                return rootNode.right;
            } else if (rootNode.right === null) {
                return rootNode.left;
            }
            rootNode.data = this.minValue(rootNode.right);
            rootNode.right = this.delete(rootNode.data, rootNode.right)
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

    inOrder() {

    }

    preOrder() {}

    postOrder() {};
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

let example = [1, 7, 4, 23, 8, 12, 13, 3, 5, 11, 9, 67, 6345, 324];

let bst = new BinarySearchTree(example);
// prettyPrint(bst.root);
// bst.insert(24);
// prettyPrint(bst.root);
// bst.delete(4);
// prettyPrint(bst.root);
// prettyPrint(bst.find(67));
// console.log(bst.levelOrder())
// bst.levelOrder(node => {
//     console.log(node.data);
// })