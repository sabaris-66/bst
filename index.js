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
    insert,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
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

  function insert(root, value) {
    // If the tree is empty, return a new node
    if (root == null) {
      root = Node(value);
      return root;
    }

    // Otherwise, recur down the tree
    if (value < root.data) root.left = insert(root.left, value);
    else if (value > root.data) root.right = insert(root.right, value);

    // Return the (unchanged) node pointer
    return root;
  }

  function find(root, value) {
    let findNode = null;
    if (root == null) return null;
    else if (root.data == value) findNode = root;
    else if (root.data < value) findNode = find(root.right, value);
    else find(root.left, value);
    return findNode;
  }

  function levelOrder(root) {
    const levels = [];

    if (!root) {
      return levels;
    }

    const queue = [root];
    while (queue.length) {
      const queueLength = queue.length;
      const level = [];

      for (let i = 0; i < queueLength; i++) {
        const node = queue.shift();

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }

        level.push(node.data);
      }
      levels.push(level);
    }
    return levels;
  }

  function preOrder(root, out = []) {
    if (root === null) return;

    out.push(root.data);
    root.left && preOrder(root.left, out);
    root.right && preOrder(root.right, out);

    return out;
  }

  function inOrder(root, out = []) {
    if (root === null) return;

    root.left && preOrder(root.left, out);
    out.push(root.data);
    root.right && preOrder(root.right, out);

    return out;
  }

  function postOrder(root, out = []) {
    if (root === null) return;

    root.left && preOrder(root.left, out);
    root.right && preOrder(root.right, out);
    out.push(root.data);

    return out;
  }

  function height(root, node, nodeHeight = 0) {
    if (root == null) return null;

    if (root.data == node) return nodeHeight;
    else if (root.data < node) {
      nodeHeight++;
      return height(root.right, node, nodeHeight);
    } else {
      nodeHeight++;
      return height(root.left, node, nodeHeight);
    }
  }
}

let array = [1, 2, 10, 4, 5, 1, 4, 7];
array = uniqueSort(array);
console.log(array);
let a = "abc";
let root = buildTree(array, 0, array.length - 1);
let test = Tree();
test.insert(root, 45);
test.prettyPrint(root);
console.log(test.find(root, 3));
console.log(test.levelOrder(root));
console.log(test.preOrder(root));
console.log(test.inOrder(root));
console.log(test.postOrder(root));
console.log(test.height(root, 45));
