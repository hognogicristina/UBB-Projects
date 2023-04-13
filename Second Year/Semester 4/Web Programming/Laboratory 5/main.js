function moveRight() {
    var left = document.getElementById("leftList")
    var selectedItem = left.selectedIndex;

    var right = document.getElementById("rightList")
    var opt = left[selectedItem].cloneNode(true)
    left.removeChild(left[selectedItem])
    right.appendChild(opt)
}

function moveLeft() {
    var right = document.getElementById("rightList")
    var selectedItem = right.selectedIndex

    var left = document.getElementById("leftList")
    var opt = right[selectedItem].cloneNode(true)
    right.removeChild(right[selectedItem])
    left.appendChild(opt)
}

function moveAllLeftToRight() {
    var leftList = document.getElementById("leftList")
    var rightList = document.getElementById("rightList")

    while (leftList.options.length > 0) {
        rightList.add(leftList.options[0])
    }
}

function moveAllRightToLeft() {
    var leftList = document.getElementById("leftList")
    var rightList = document.getElementById("rightList")

    while (rightList.options.length > 0) {
        leftList.add(rightList.options[0])
    }
}

document.getElementById("rightButton").addEventListener("click", moveAllLeftToRight)
document.getElementById("leftButton").addEventListener("click", moveAllRightToLeft)

document.getElementById("leftList").addEventListener("dblclick", moveRight)
document.getElementById("rightList").addEventListener("dblclick", moveLeft)