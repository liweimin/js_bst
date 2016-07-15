// Node := (number null null)
//      := (number Node Node)
//
// Bst :=  空BST(没有根节点)
//     :=  非空BST（有跟节点Node）


function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

function Bst() {
    this.root = null;
    this.insert = insert;
    this.find = find;
    this.min = min;
    this.max = max;
    this.inOrderTravel = inOrderTravel;
    this.preOrderTravel = preOrderTravel;
    this.lastOrderTravel = lastOrderTravel;
    this.remove = remove;
}

// number -> no return just side effect
function insert(n) {
    var newNode = new Node(n);
    if (this.root === null) {
        this.root = newNode;
    }
    else {
        insertNode(this.root, newNode);
    }
}
function insertNode(node, newNode) {
    if (newNode.data < node.data) {
        if (node.left === null) {
            node.left = newNode;
        }
        else {
            insertNode(node.left, newNode);
        }
    }
    else {
        if (node.right === null) {
            node.right = newNode;
        }
        else {
            insertNode(node.right, newNode);
        }
    }
}

// number -> boolean
function find(n) {
    if (this.root === null) {
        return false;
    }
    else {
        return findNode(this.root,n);
    }
}
// findNode : Node , number -> boolean
function findNode(node,n) {
    if (n < node.data){
        if (node.left === null) {
            return false;
        }
        else {
            return findNode(node.left,n);
        }
    }
    else if (n>node.data){
        if (node.right === null) {
            return false;
        }
        else {
            return findNode(node.right,n);
        }
    }
    else {
        return true;
    }
}
//test
// console.assert(b0.find(10) === true);
// console.log(b0.find(5) === true);
// console.log(b0.find(20) === true);
// console.log(b0.find(3) === true);
// console.log(b0.find(13) === true);
// console.log(b0.find(17) === false);

// min :  no argument  -> number or null
function min() {
    if (this.root === null) {
        return null;
    }
    else {
        return minNode(this.root);
    }
}
// findMinNode : Node -> number
function minNode(node) {
    if (node.left === null){
        return node.data; 
    }
    else {
        return minNode(node.left);
    }
}

// max :  no argument  -> number or null
function max() {
    if (this.root === null) {
        return null;
    }
    else {
        return maxNode(this.root);
    }
}
// maxNode : Node -> number
function maxNode(node) {
    if (node.right === null){
        return node.data;
    }
    else {
        return maxNode(node.right);
    }
}


//inOrderTravel : callback  ->  callback(eachData)
function inOrderTravel(callback) {
    if (this.root === null){
        return null;
    }
    else {
        inOrderTravelNode(this.root,callback);
    }
}
//inOrderTravelNode : Node , Function -> Function(eachData)
function inOrderTravelNode(node,callback) {
    if (node.left === null && node.right === null) {
         callback(node.data);
    }
    else if (node.left === null) {
        callback(node.data);
        inOrderTravelNode(node.right,callback);
    }
    else if (node.right === null) {
        inOrderTravelNode(node.left,callback);
        callback(node.data);
    }
    else {
        inOrderTravelNode(node.left,callback);
        callback(node.data);
        inOrderTravelNode(node.right,callback);
    }
}

function preOrderTravel(callback) {
    if (this.root === null){
        return null;
    }
    else {
        preOrderTravelNode(this.root,callback);
    }
}
function preOrderTravelNode(node,callback) {
    if (node.left === null && node.right === null) {
        callback(node.data);
    }
    else if (node.left === null) {
        callback(node.data);
        preOrderTravelNode(node.right,callback);
    }
    else if (node.right === null) {
        callback(node.data);
        preOrderTravelNode(node.left,callback);
    }
    else {
        callback(node.data);
        preOrderTravelNode(node.left,callback);
        preOrderTravelNode(node.right,callback);
    }
}

function lastOrderTravel(callback) {
    if (this.root === null){
        return null;
    }
    else {
        lastOrderTravelNode(this.root,callback);
    }
}
function lastOrderTravelNode(node,callback) {
    if (node.left === null && node.right === null) {
        callback(node.data);
    }
    else if (node.left === null) {
        lastOrderTravelNode(node.right,callback);
        callback(node.data);
    }
    else if (node.right === null) {
        lastOrderTravelNode(node.left,callback);
        callback(node.data);
    }
    else {
        lastOrderTravelNode(node.left,callback);
        lastOrderTravelNode(node.right,callback);
        callback(node.data);
    }
}

function print(data) {
    console.log(data);
}

function remove(n) {
    if (this.root === null){
        return null;
    }
    else {
        this.root = removeNode(this.root,n);
    }
}
function removeNode(node,n) {
    if (node.left === null && node.right === null) {
        if (n === node.data) {
            node = null;
            return node;
        }
    }
    else if (node.left === null) {
        if (n === node.data) {
            node = node.right;
            return node;
        }
        else if (n > node.data) {
            node.right = removeNode(node.right, n);
            return node;
        }
    }
    else if (node.right === null) {
        if (n === node.data) {
            node = node.left;
            return node;
        }
        else if (n < node.data) {
            node.left = removeNode(node.left, n);
            return node;
        }
    }
    else {
        var rightMin = minNode(node.right);
        if (n === node.data) {
            node.data = rightMin;
            node.right = removeNode(node.right, rightMin);
            return node;
        }
        else if (n > node.data) {
            node.right = removeNode(node.right, n);
            return node;
        }
        else {
            node.left=removeNode(node.left, n);
            return node;
        }
    }
}


//test

b0 = new Bst();
b0.insert(10);
b0.insert(5);
b0.insert(20);
b0.insert(3);
b0.insert(13);

b0.inOrderTravel(print);
b0.remove(13);

console.log("after delete -------------");

b0.inOrderTravel(print);

