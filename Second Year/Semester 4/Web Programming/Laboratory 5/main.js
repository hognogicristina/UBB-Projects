function moveRight() {
    var left = document.getElementById("leftList");
    var selectedItem = left.selectedIndex;

    var right = document.getElementById("rightList");
    var opt = left[selectedItem].cloneNode(true);
    left.removeChild(left[selectedItem]);
    right.appendChild(opt);
}

function moveLeft() {
    var right = document.getElementById("rightList");
    var selectedItem = right.selectedIndex;

    var left = document.getElementById("leftList");
    var opt = right[selectedItem].cloneNode(true);
    right.removeChild(right[selectedItem]);
    left.appendChild(opt);
}

document.getElementById("leftList").addEventListener("dblclick", moveRight)
document.getElementById("rightList").addEventListener("dblclick", moveLeft)