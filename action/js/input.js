// sloppy input switches
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var jumpPressed = false;
var shootPressed = false;

document.onkeydown = function(e){
    switch (e.keyCode) {
        case 37:
            leftPressed = true;
            break;
        case 38:
            upPressed = true;
            break;
        case 39:
            rightPressed = true;
            break;
        case 40:
            downPressed = true;
            break;
        case 88:
            jumpPressed = true;
            break;
        case 90:
            shootPressed = true;
            break;
    }
};

document.onkeyup = function(e){
    switch (e.keyCode) {
        case 37:
            leftPressed = false;
            break;
        case 38:
            upPressed = false;
            break;
        case 39:
            rightPressed = false;
            break;
        case 40:
            downPressed = false;
            break;
        case 88:
            jumpPressed = false;
            break;
        case 90:
            shootPressed = false;
            break;
    }
};