function Node(data) {
  let left = null;
  let right = null;

  return { data, left, right };
}

function buildTree(array) {
  array = array.filter((value, index) => {
    return array.indexOf(value) === index;
  });
  array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

array = [1, 2, 10, 4, 5, 1, 4, 7];
console.log(buildTree(array));
