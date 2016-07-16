// 抽象的数据结构
// bst = ()
//       (number bst bst)

// 在JS中的表示
// bst = []
//       [number bst bst]

function isEmptyBst(bst) {
    if (bst.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
function left(bst) {
    return bst[1];
}
function right(bst) {
    return bst[2];
}
function data(bst) {
    return bst[0];
}
//将一个数与两个bst拼接成一个新的bst
// 即(number bst bst) 中的 "()"操作
function con(n, left, right) {
    return [n, left, right]
}

//insert ： number -> bst
function insert(bst, n) {
    if (isEmptyBst(bst)) {
        return con(
            n,
            [],
            []
        );
    }
    else {
        if (n < data(bst)) {
            return con(
                data(bst),
                insert(left(bst), n),
                right(bst)
            );
        }
        else {
            return con(
                data(bst),
                left(bst),
                insert(right(bst), n)
            );
        }
    }
}

//快速创建一个BST
//createBst : array(number) -> bst
function createBst(list) {
    var bst = [];
    if (arguments.length === 0) {
        return bst;
    }
    else {
        list.forEach(function (item) {
            bst = insert(bst, item);
        })
        return bst;
    }
}

//find ： bst number -> boolean
function find(bst, n) {
    if (isEmptyBst(bst)) {
        return false;
    }
    else {
        if (n < data(bst)) {
            return find(left(bst), n);
        }
        else if (n > data(bst)) {
            return find(right(bst), n)
        }
        else {
            return true;
        }
    }
}


function inOrderTraverse(bst,callback,result) {
    if (isEmptyBst(bst)) {
        return result;
    }
    else {
        if (isEmptyBst(left(bst)) && isEmptyBst(right(bst))) {
            callback(result,data(bst));
            return result;
        }
        else if (isEmptyBst(left(bst))) {
            callback(result,data(bst));
            inOrderTraverse(right(bst),callback,result);
            return result;
        }
        else if (isEmptyBst(right(bst))){
            inOrderTraverse(left(bst),callback,result);
            callback(result,data(bst));
            return result;
        }
        else {
            inOrderTraverse(left(bst),callback,result);
            callback(result,data(bst));
            inOrderTraverse(right(bst),callback,result);
            return result;
        }
    }
}
function collectBst(bst,callback,order) {
    var result = [];
    order(bst,callback,result);
    return result;
}
function collect(arr,n) {
    arr.push(n);
}

// test
var b = createBst([23, 45, 16, 37, 3, 99, 22]);
console.log(
    collectBst(b,collect,inOrderTraverse)
);

// preOrderTraverse ： bst  -> array
function preOrderTraverse(bst) {
    if (isEmptyBst(bst)) {
        return [];
    }
    else {
        return [data(bst)].concat(
            preOrderTraverse(left(bst)),
            preOrderTraverse(right(bst))
        );
    }
}
// postOrderTraverse ： bst  -> array
function postOrderTraverse(bst) {
    if (isEmptyBst(bst)) {
        return [];
    }
    else {
        return (postOrderTraverse(left(bst))).concat(
            postOrderTraverse(right(bst)),
            [data(bst)]
        );
    }
}

//findMin : bst -> number or []
function findMin(bst) {
    if (isEmptyBst(bst)) {
        return [];
    }
    else {
        if (
            isEmptyBst(
                left(bst)
            )
        ) {
            return data(bst);
        }
        else {
            return findMin(
                left(bst)
            );
        }
    }
}
//findMax : bst -> number or []
function findMax(bst) {
    if (isEmptyBst(bst)) {
        return [];
    }
    else {
        if (
            isEmptyBst(
                right(bst)
            )
        ) {
            return data(bst);
        }
        else {
            return findMax(
                right(bst)
            );
        }
    }
}
//delData : bst , number -> bst
function delData(bst, n) {
    if (isEmptyBst(bst)) {
        return bst;
    }
    else {
        if (n === data(bst)) {
            //叶子节点
            if (
                isEmptyBst(left(bst) && isEmptyBst(right(bst)))
            ) {
                bst = [];
                return bst;
            }
            //只有右子树
            else if (isEmptyBst(left(bst))) {
                bst = right(bst);
                return bst;
            }
            //只有左子树
            else if (isEmptyBst(right(bst))) {
                bst = left(bst);
                return bst
            }
            //左右子树都有
            else {
                var right_min = findMin(right(bst));
                return con(
                    right_min,
                    left(bst),
                    delData(right(bst), right_min)
                );
            }
        }
        else if (n > data(bst)) {
            return con(
                data(bst),
                left(bst),
                delData(right(bst), n)
            )
        }
        else {
            return con(
                data(bst),
                delData(left(bst), n),
                right(bst)
            )
        }
    }
}


// //some test
//
// var b = createBst([23, 45, 16, 37, 3, 99, 22]);
//
// console.log(inOrderTraverse(b));
// console.log(inOrderTraverse(insert(b, 15)));
//
// console.log(find(b, 37) === true);
// console.log(find(b, 39) === false);
//
// console.log(findMin(b) === 3);
// console.log(findMax(b) === 99);
//
// console.log(inOrderTraverse(
//     delData(b, 100)
// ));
// console.log(inOrderTraverse(
//     delData(b, 37)
// ));
// console.log(inOrderTraverse(
//     delData(b, 45)
// ));