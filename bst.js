// bst = null
//     = [number, bst, bst]
var b = null;

function insert(b, n) {
	if (b === null) {
		return [n, null, null];
	} else {
		if (n < b[0]) {
			b[1] = insert(b[1], n);
			return b;
		} else {
			b[2] = insert(b[2], n);
			return b;
		}
	}
}

var b = insert(b, 10);
insert(b, 20);
insert(b, 2);
insert(b, 13);
insert(b, 8);
insert(b, 37);
// console.log(b);

function find(b, n) {
	if (b === null) {
		return false;
	} else {
		if (n < b[0]) {
			return find(b[1], n);
		} else if (n > b[0]) {
			return find(b[2], n);
		} else {
			return true;
		}
	}
}

// console.log(find(b,10));
// console.log(find(b,20));
// console.log(find(b,2));
// console.log(find(b,13));
// console.log(find(b,8));
// console.log(find(b,37));
// console.log(find(b,18));

function min(b) {
	if (b === null) {
		return null;
	} else {
		if (b[1] === null) {
			return b[0];
		} else {
			return min(b[1]);
		}
	}
}

function max(b) {
	if (b === null) {
		return null;
	} else {
		if (b[2] === null) {
			return b[0];
		} else {
			return max(b[2]);
		}
	}
}


function deleteData(b, n) {
	if (b === null) {
		return null;
	} else {
		if (n < b[0]) {
			b[1] = deleteData(b[1], n);
			return b;
		} else if (n > b[0]) {
			b[2] = deleteData(b[2], n);
			return b;
		} else {
			if (b[1] === null && b[2] === null) {
				b = null;
				return b;
			} else if (b[1] === null) {
				b = b[2]
				return b;
			} else if (b[2] === null) {
				b = b[1];
				return b;
			} else {
				var right_min = min(b[2]);
				b[2] = deleteData(b[2], right_min);
				b[0] = right_min;
				return b;
			}

		}
	}
}


function inOrderTraversal(b, callback) {
	if (b === null) {} else {
		if (b[1] === null && b[2] === null) {
			callback(b[0]);
		} else if (b[1] === null) {
			callback(b[0]);
			inOrderTraversal(b[2], callback);
		} else if (b[2] === null) {
			inOrderTraversal(b[1], callback);
			callback(b[0]);
		} else {
			inOrderTraversal(b[1], callback);
			callback(b[0]);
			inOrderTraversal(b[2], callback);
		}
	}
}

function collectOrderTraversal(b, order) {
	function collectOrder(n) {
		result.push(n);
	}
	var result = [];
	inOrderTraversal(b, collectOrder);
	return result;
}
console.log(collectOrderTraversal(b, inOrderTraversal));
deleteData(b,8);
console.log(collectOrderTraversal(b, inOrderTraversal));