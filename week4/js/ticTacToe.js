//add event listener
document.querySelectorAll('.interactive').forEach(item => {
    item.addEventListener('click', event => {
        //handle click
        if (item.innerHTML != '') {console.log("NO GO!")}
        else {
            let turn = document.getElementById("turn").innerHTML.match(/(\d+)/)[0];
            let newImage = document.createElement("img");
            if (turn == 1) {
                newImage.src = "x.png";
                document.getElementById("turn").innerText = "PLAYER 2 TURN";
            }
            if (turn == 2) {
                newImage.src = "o.png";
                document.getElementById("turn").innerText = "PLAYER 1 TURN";
            }
            item.appendChild(newImage);
        }
    })
  })

document.querySelectorAll('.interactive').forEach(item => {
    item.addEventListener('touchend', event => {
        //handle click
        if (item.innerHTML != '') {console.log("NO GO!")}
        else {
            let turn = document.getElementById("turn").innerHTML.match(/(\d+)/)[0];
            let newImage = document.createElement("img");
            if (turn == 1) {
                newImage.src = "x.png";
                document.getElementById("turn").innerText = "PLAYER 2 TURN";
            }
            if (turn == 2) {
                newImage.src = "o.png";
                document.getElementById("turn").innerText = "PLAYER 1 TURN";
            }
            item.appendChild(newImage);
        }
    })
  })

function callTouch(item) {
    console.log(item);
    let newImage = document.createElement("img");
    newImage.src = "x.png"
    item.appendchild(newImage);
}

function resetGame() {
    document.querySelectorAll('.interactive').forEach(item => {
            //handle click
            item.innerHTML = '';
      })
    document.getElementById("turn").innerText = "PLAYER 1 TURN";
}