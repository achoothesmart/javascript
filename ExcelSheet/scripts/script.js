$(document).ready(function () {

    var headCellTemplate = function(headText){
        return "<span class=\"head\" id=\"" + headText + "\">" + headText + "</span>";
    }
    var cellTemplate = function(id){
        return "<span class=\"cell\" id=\"" + id + "\"> test </span>";
    }
    var rowHeaderTemplate = function(headText){
        return "<span class=\"row_head\">" + headText + "</span>";
    }
    var nRows = 10;
    var nCols = 10;
    var row_alpha_arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var html = "";
    
    html += rowHeaderTemplate("");
    for (var j = 1; j <= nCols; j++) {
        // PRINTING HEADERS
        html += headCellTemplate(row_alpha_arr[j - 1])
    }
    
    for (var i = 1; i <= nRows; i++) {
        html += "<div>";
        html += rowHeaderTemplate(i);        
        for (var j = 1; j <= nCols; j++) {
            html += cellTemplate("cell_" + row_alpha_arr[j - 1] + i)
        }
        html += "</div>"
    }

    $("#sheet1").html(html);


    $('.cell').keypress(function (e) {
        if (e.which == 13) {
            var id = $(this).attr("id");
            var value = $(this).val();
            var col_row = id.split('_')[1];
            var col = col_row.substring(0, 1);
            var row = col_row.substring(1);
            var next_row = parseInt(row) + 1;

            $("#cell_" + col + next_row).focus();
            $('#info').html("Row: " + row + " - Col: " + col);
        }
    });

    $(".cell").on("click", function(){
        alert(this.id);
    });
});


$(function () {
    //$("#btnLogin").click(try_login);



});