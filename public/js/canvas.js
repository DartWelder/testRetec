$(document).ready(function() {
    var canvas = $("#tableCanvas")[0];
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(255,255,255,1)';
    context.strokeWidth = 5;
    context.fillStyle = 'rgba(255,255,255,0.1)';

    var rowHeight,
        columnWidth,
        isTitleClick = false,
        rowCount = $("#rows").val(),
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




    function drawTable() {
        clearCanvas();
        rowHeight = canvas.height / rowCount;
        columnWidth = canvas.width / columnCount;
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        drawRowLines();
        drawColumnsLines();
        drawText();





        function drawText() {
            context.textAlign = 'center';
            context.font = "bold 10pt Arial";
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


    }

    function toggleMenu() {
        $("#tableCanvas").click(e => {
            var clickPos = { x: e.offsetX, y: e.offsetY }
            if (!isTitleClick && clickPos.y <= rowHeight) {
                titleChoise = Math.ceil(clickPos.x / columnWidth);
                isTitleClick = true;
                console.log(titleChoise)
                context.beginPath();
                context.fillStyle = '#fff';

                let startX = (titleChoise - 1) * columnWidth + 1,
                    startY = rowHeight + 2,
                    width = columnWidth - 2,
                    height = rowHeight * 2 - 3
                context.fillStyle = 'rgba(255,255,255,0.1)';
                context.clearRect(startX, startY, width, height);
                context.fillRect(startX, startY, width, height);
                drawMenuItems()

                function drawMenuItems() {
                    var menuItemHeigth = rowHeight / 2;

                    for (i = 1; i <= 4; i++) {
                        context.beginPath();
                        context.fillStyle = "#fff";
                        context.fillText("Option" + i, startX + columnWidth / 2, startY + menuItemHeigth * i - 5);
                        context.moveTo(startX + 5, (startY + menuItemHeigth * i) - 2);
                        context.lineTo(startX - 7 + columnWidth, (startY + menuItemHeigth * i) - 2);
                        context.stroke();
                    }

                }




                context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

            } else {
                drawTable()
                isTitleClick = false;
            }

        });

        function itemSelect() {

        }


    }


    var preIndex = {};


    /*
        $("#tableCanvas").mousemove(e => {

            var cursorPos = { x: e.offsetX, y: e.offsetY };
            var cell = {};
            cell.xIndex = Math.ceil(cursorPos.x / columnWidth);
            cell.yIndex = Math.ceil(cursorPos.y / rowHeight);

            if (!isTitleClick && (cell.xIndex != preIndex.x || cell.yIndex != preIndex.y)) {

                drawTable();
                context.beginPath();
                context.fillStyle = 'rgba(255,255,255,0.1)';
                context.fillRect(
                    (cell.xIndex - 1) * columnWidth + 1,
                    (cell.yIndex - 1) * rowHeight + 1,
                    columnWidth - 2,
                    rowHeight - context.lineWidth);
                preIndex.x = cell.xIndex;
                preIndex.y = cell.yIndex;

            }

        });
    */

});