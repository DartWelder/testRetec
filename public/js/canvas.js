$(document).ready(function() {
    var canvas = $("#tableCanvas")[0];
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(255,255,255,1)';
    context.strokeWidth = 5;
    context.fillStyle = 'rgba(255,255,255,0.1)';

    var rowHeight;
    var columnWidth;

    var rowCount = $("#rows").val(),
        columnCount = $("#columns").val();



    drawTable();
    toggleMenu();


    $(".inputs").change(() => {

        rowCount = $("#rows").val();
        columnCount = $("#columns").val();
        drawTable();
    });


    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }




    function drawTable(callback) {
        clearCanvas();
        rowHeight = canvas.height / rowCount;
        columnWidth = canvas.width / columnCount;
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        drawRowLines();
        drawColumnsLines(columnCount);
        drawText();





        function drawText() {
            context.textAlign = 'center';
            context.font = "10pt Arial";
            for (let a = 1; a <= columnCount; a++) {
                context.fillStyle = 'rgba(255,255,255,1)';
                context.fillText(
                    a, //text
                    context.lineWidth + columnWidth * a - 2 - columnWidth / 2, //position on X
                    rowHeight / 2 + 2 //position on y
                );
            }

        }


        function drawRowLines() {
            for (let i = 1; i <= rowCount; i++) {
                let linePosition = i * rowHeight
                context.beginPath();
                context.strokeStyle = '#fff';
                context.moveTo(0, linePosition);
                context.lineTo(canvas.width, linePosition);
                context.stroke();
            }

        }

        function drawColumnsLines() {
            for (let i = 1; i < columnCount; i++) {
                let linePosition = i * columnWidth
                context.beginPath();
                context.strokeStyle = '#fff';
                context.moveTo(linePosition, 0);
                context.lineTo(linePosition, canvas.height);
                context.stroke();
            }
        }

        /*callback();*/
    }

    function toggleMenu() {
        $("#tableCanvas").click(e => {
            var clickPos = { x: e.offsetX, y: e.offsetY }
            if (clickPos.y <= rowHeight) {
                menuItem = Math.ceil(clickPos.x / columnWidth);
                console.log(menuItem);
            }
        });
    }




    $("#tableCanvas").mousemove(e => {
        drawTable();
        var cursorPos = { x: e.offsetX, y: e.offsetY }
        var cell = {};
        cell.xIndex = Math.ceil(cursorPos.x / columnWidth);
        cell.yIndex = Math.ceil(cursorPos.y / rowHeight);


        context.fillStyle = 'rgba(255,255,255,0.1)';
        context.fillRect(
            (cell.xIndex - 1) * columnWidth + 1,
            (cell.yIndex - 1) * rowHeight + 1,
            columnWidth - 2,
            rowHeight - context.lineWidth);


    });


});