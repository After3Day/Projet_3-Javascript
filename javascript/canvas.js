var canvas = document.getElementById('myCanvas');

var ctx = canvas.getContext('2d');

var count = 0;
var appuye = false;

var pos = {
    x: 0,
    y: 0
};

var lastPos = pos;

canvas.addEventListener('mousedown', (e) => {
    appuye = true;
    lastPos = getPos(canvas, e);
});

canvas.addEventListener('mousemove', (e) => {
    pos = getPos(canvas, e);
    dessin(e);
})

canvas.addEventListener('mouseup', (e) => {
    appuye = false;
})


canvas.addEventListener('touchstart', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
    pos = getPosF(canvas, e);
    var touch = e.touches[0];
    var RemplaceS = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(RemplaceS);
})

canvas.addEventListener('touchmove', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
    var touch = e.touches[0];
    var RemplaceS = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(RemplaceS);
})

canvas.addEventListener('touchend', (e) => {
    var RemplaceS = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(RemplaceS);
})

function getPos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();

    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

function dessin(e) {
    if (appuye) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";

        ctx.moveTo(lastPos.x, lastPos.y);
        lastPos = pos;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        count++;
        sessionStorage.setItem("count", count);
        return count;
    }
}

function getPosF(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();

    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

function resetCtx() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sessionStorage.removeItem("count");
    let count = 0;
    sessionStorage.setItem("count", count);
}
