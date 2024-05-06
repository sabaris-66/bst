function Node(data) {
  let left = null;
  let right = null;

  return { data, left, right };
}

function uniqueSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  arr = arr.filter((value, index) => {
    return arr.indexOf(value) === index;
  });

  arr.sort(function (a, b) {
    return a - b;
  });
  return arr;
}

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  /* Get the middle element and make it root */
  let mid = parseInt((start + end) / 2);
  let node = Node(arr[mid]);
  /* Recursively construct the left subtree and make it 
     left child of root */
  node.left = buildTree(arr, start, mid - 1);
  /* Recursively construct the right subtree and make it 
     right child of root */
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

function Tree() {
  return {
    prettyPrint,
  };
  function prettyPrint(node, prefix = "", isLeft = true) {
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
  }
}

let array = [1, 2, 10, 4, 5, 1, 4, 7];
array = uniqueSort(array);
console.log(array);
let root = buildTree(array, 0, array.length - 1);
let test = Tree();
test.prettyPrint(root);
