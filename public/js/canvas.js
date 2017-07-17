$(document).ready(function() {


    //Init canvas
    var canvas = $("#tableCanvas")[0];
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(255,255,255,1)';
    context.strokeWidth = 5;
    context.fillStyle = 'rgba(255,255,255,0.1)';

    var isTitleClick = false,
        isShowMessage = false,
        rowHeight,
        columnWidth;


    drawTable();
    toggleMenu();

    function drawTable() {
        clearCanvas();
        let rowCount = $("#rows").val(),
            columnCount = $("#columns").val();
        rowCount < 4 ? rowCount = 4 : rowCount;
        columnCount < 2 ? columnCount = 2 : columnCount;



        rowHeight = canvas.height / rowCount;
        columnWidth = canvas.width / columnCount;
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

        drawRowLines(rowHeight, rowCount);
        drawColumnsLines(columnCount, columnWidth);
        drawText(columnCount, columnWidth, rowHeight);
        /* toggleMenu(rowHeight, columnWidth);*/
    }

    function drawRowLines(rowHeight, rowCount) {
        for (let i = 1; i <= rowCount; i++) {
            let linePosition = i * rowHeight;
            context.beginPath();
            context.strokeStyle = '#fff';
            context.moveTo(0, linePosition);
            context.lineTo(canvas.width, linePosition);
            context.stroke();
        }

    }

    function drawColumnsLines(columnCount, columnWidth) {
        for (let i = 1; i < columnCount; i++) {
            let linePosition = i * columnWidth;
            context.beginPath();
            context.strokeStyle = '#fff';
            context.moveTo(linePosition, 0);
            context.lineTo(linePosition, canvas.height);
            context.stroke();
        }
    }

    function drawText(columnCount, columnWidth, rowHeight) {
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

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function toggleMenu() {

        var menuItemsCount = 4,
            menuItemHeigth;


        $("#tableCanvas").click(e => {
            var clickPos = { x: e.offsetX, y: e.offsetY };
            if (!isTitleClick && clickPos.y <= rowHeight) {
                titleChoise = Math.ceil(clickPos.x / columnWidth);
                isTitleClick = true;
                context.beginPath();
                context.fillStyle = '#fff';

                let startX = (titleChoise - 1) * columnWidth + 1,
                    startY = rowHeight + 2,
                    width = columnWidth - 2,
                    height = rowHeight * 3 - 3;

                context.fillStyle = 'rgba(255,255,255,0.1)';
                context.clearRect(startX, startY, width, height);
                context.fillRect(startX, startY, width, height);

                drawMenuItems(startX, startY);

                context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
            } else if (!isShowMessage &&
                isTitleClick &&
                clickPos.y > rowHeight * 2 + 2 &&
                clickPos.y < rowHeight * 2 + menuItemHeigth * menuItemsCount &&
                clickPos.x < titleChoise * columnWidth &&
                clickPos.x > (titleChoise - 1) * columnWidth) {
                itemSelect(clickPos);
            } else {
                drawTable()
                isTitleClick = false;
                isShowMessage = false;
            }
        });

        function drawMenuItems(startX, startY) {
            menuItemHeigth = rowHeight / 2;
            // Draw menu header
            context.beginPath();
            context.fillStyle = "#fff";
            context.fillText(titleChoise, startX + columnWidth / 2, startY + rowHeight / 2);
            context.moveTo(startX + 5, startY + rowHeight - 2);
            context.lineTo(startX - 7 + columnWidth, startY + rowHeight - 2);
            context.stroke();

            //Draw menu items
            for (i = 1; i <= menuItemsCount; i++) {
                context.beginPath();
                context.fillStyle = "#fff";
                context.fillText("Menu" + i, startX + columnWidth / 2, startY + menuItemHeigth * i + rowHeight - 6);
                context.moveTo(startX + 5, startY + menuItemHeigth * i + rowHeight - 2);
                context.lineTo(startX - 7 + columnWidth, startY + menuItemHeigth * i + rowHeight - 2);
                context.stroke();
            }

        }

        function itemSelect(clickPos) {
            let itemChoise = Math.ceil((clickPos.y - rowHeight * 2 + 2) / (rowHeight / 2));

            clearCanvas();
            context.beginPath();
            context.strokeRect(0, 0, canvas.width, canvas.height);
            context.font = "bold 15pt Arial";
            context.fillText("Menu " + itemChoise + " in " + " title " + titleChoise + " clicked", canvas.width / 2, canvas.height / 2);
            isShowMessage = true;





        }

    }

    //Table params watching
    $(".inputs").on('input', () => {
        drawTable();
    });

    //Cell backlight
    $("#tableCanvas").mousemove(e => {
        if (!isTitleClick) {
            drawTable();
            var cursorPos = { x: e.offsetX, y: e.offsetY }
            var cell = {};
            cell.xIndex = Math.ceil(cursorPos.x / columnWidth);
            cell.yIndex = Math.ceil(cursorPos.y / rowHeight);

            context.fillStyle = 'rgba(255,255,255,0.1)';
            context.fillRect(+(cell.xIndex - 1) * columnWidth + 1, +(cell.yIndex - 1) * rowHeight + 1, +columnWidth - 2, +rowHeight - context.lineWidth);

        }
    });



});