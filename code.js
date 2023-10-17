

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
};

class BinarySearchTree {
    constructor(arr) {
        arr.sort((a, b) => a - b);
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    buildTree(arr, start, end) {

        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        let node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    };
    insert(data) {

    };

    delete(data) {

    }

    find(data) {

    }

    levelOrder(fnc) {

    }

    inOrder() {

    }

    preOrder() {

    };

    postOrder() {

    }

    height(node) {

    }

    depth(node) {

    }

    isBalanced() {

    }

    rebalance() {
        
    }
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new BinarySearchTree(test);
prettyPrint(bst.root);
