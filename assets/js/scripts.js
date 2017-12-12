/**
 * Created by ttuttle on 6/1/17.
 */

$(document).ready(function () {
    $("#sub-category-chosen").click(function () {
        cat = $("#sub-category-select").val();
        $(".clearable").empty();
        console.log("cat: " + cat + "request sent");
        $.post("getFilterData.php", {catid: cat}, function (data) {
            console.log("response retrieved");
            console.log(data);
            var labels = data['labels'];
            var status = data['status'];
            console.log(labels);
            console.log(status);
            $("#sub-filters-sect").removeClass("hidden");
            $("#sub-filters")
                .append("<div id='sub-label-filter' class='col-sm-6 filter-container'><h2>Label Filter</h2></div>")
                .append("<div id='sub-status-filter' class='col-sm-6 filter-container'><h2>Status Filter</h2></div>");
            $("#sub-label-filter").append("<div class='check-controls checkbox-group'><label class='label select-all' id='check-all-label-filter'>Select All</label> | <label class='label select-all' id='clear-all-label-filter'>Clear All</label></div></div>");
            $.each(status, function (key, value) {
                var valueLC = value.toLowerCase().replace(/\s+/g, '-');
                $("#sub-status-filter").append("<div></div>")
                    .find("div:last")
                    .attr({
                        "id": valueLC + "-filter-group",
                        "class": "checkbox-group"
                    })
                    .append("<label></label>")
                    .find("label:last")
                    .html("<input type='checkbox'>" + value)
                    .attr({
                        "for": valueLC + "-filter-checkbox",
                        "class": valueLC + "-label label",
                        "id": valueLC + "-filter-label"
                    })
                    .find("input:last")
                    .attr({
                        "id": valueLC + "-filter-checkbox",
                        "value": value,
                        "class": "status-filter-checkbox"
                    });
            });
            $.each(labels, function (key, value) {
                var valueLC = value.toLowerCase().replace(/\s+/g, '-');
                $("#sub-label-filter").append("<div></div>")
                    .find("div:last")
                    .attr({
                        "id": valueLC + "-filter-group",
                        "class": "checkbox-group filter"
                    })
                    .append("<label></label>")
                    .find("label:last")
                    .html("<input type='checkbox'>" + value)
                    .attr({
                        "for": valueLC + "-filter-checkbox",
                        "id": valueLC + "-filter-label"
                    })
                    .find("input:last")
                    .attr({
                        "id": valueLC + "-filter-checkbox",
                        "value": value,
                        "class": "label-filter-checkbox"
                    });
            });
            $('#check-all-label-filter').on('click', function () {
                $('.label-filter-checkbox').each(function () {
                    $(this).prop('checked', true);
                });
            });
            $('#clear-all-label-filter').on('click', function () {
                $('.label-filter-checkbox').each(function () {
                    $(this).prop('checked', false);
                });
            });
        });

        // $('.label-filter-checkbox').change(function () {
        //     if ($('.label-filter-checkbox:checked').length === $('.label-filter-checkbox').length) {
        //         $('#check-all-label-filter').prop('checked', true);
        //     } else {
        //         $('#check-all-label-filter').prop('checked', false);
        //     }
        // });

    });

    $("#sub-filters-chosen").click(function () {
        $(".clearable.step3, .clearable.step4").empty();
        var statusFilters = [];
        var labelFilters = [];
        $("input:checkbox:checked.label-filter-checkbox").each(function () {
            labelFilters.push($(this).val());
        });
        $("input:checkbox:checked.status-filter-checkbox").each(function () {
            statusFilters.push($(this).val());
        });
        var getData = $.ajax({
            url: "getdata.php",
            method: "POST",
            data: {statusFilters: statusFilters, labelFilters: labelFilters},
            dataType: "json"
        });

        getData.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

        getData.done(function (data) {
            $("#sub-labels-sect")
                .removeClass("hidden")
            $("#sub-fields-sect").removeClass("hidden");
            var labels = data['labels'];
            var fields = data['fields'];
            $("#sub-labels").append("<div class='check-controls checkbox-group'><label class='label select-all' id='check-all-labels'>Select All</label> | <label class='label select-all' id='clear-all-labels'>Clear All</label></div>");
            $.each(labels, function (key, value) {
                var valueLC = value.toLowerCase().replace(/\s+/g, '-');
                $("#sub-labels").append("<div></div>")
                    .find("div:last")
                    .attr({
                        "id": valueLC + "-label-group",
                        "class": "checkbox-group labels"
                    })
                    .append("<label></label>")
                    .find("label:last")
                    .html("<input type='checkbox'>")
                    .attr({
                        "for": valueLC,
                        "id": valueLC + "-label"
                    })
                    .find("input[type=checkbox]:last")
                    .attr({
                        "id": valueLC + "-label-checkbox",
                        "value": value,
                        "class": "sub-label-checkbox"

                    })
                    .after("<input value='" + value + "' class='sub-label-edit' name='" + value + "'>")
                    .find("input:last")
                    .attr({
                        "id": valueLC + "-label-textbox-edit",
                        "value": value,
                        "name": value + " edit",
                        "class": "sub-label-edit"
                    })
                ;
            });
            $.each(fields, function (key, value) {
                var valueLC = value.toLowerCase().replace(/\s+/g, '-');
                $("#sub-fields").append("<li></li>")
                    .find("li:last")
                    .attr({
                        "id": valueLC + "-sub-field",
                        "class": "sub-field",
                        "data-sub-field-id": key,
                        "data-sub-field-name": value
                    })
                    .html(value)
                    .draggable();
                $("#s-location-field").append("<option></option>")
                   .find("option:last")
                   .attr({
                       "value": key,
                       "id": valueLC + "-location-field-option",
                       "class": "location-field-select-option"
                   })
                   .html(value);
            });

            $('#check-all-labels').on('click', function () {
                $('.sub-label-checkbox').each(function () {
                    $(this).prop('checked', true);
                });
            });
            $('#clear-all-labels').on('click', function () {
                $('.sub-label-checkbox').each(function () {
                    $(this).prop('checked', false);
                });
            });

        });
    });
    $("#data-map-chosen").click(function () {
        $("#sm-gallery-create").removeClass("hidden");
        var labelMap = {};
        $("input:checkbox:checked.sub-label-checkbox").each(function () {
            var origLabel = $(this).val();
            var newLabel = $(this).next("input.sub-label-edit").val();
            console.log(origLabel);
            console.log(newLabel);
            labelMap[origLabel] = newLabel;
        });
        console.log(labelMap);
        var labelMapObj = {
            labelMap: labelMap,
            locField: $("#s-location-field").val()
        };
        saveData(labelMapObj);

    });
    $("#sm-gallery-create-request").click(function () {
        var title = $("#sm-new-album-title").val();
        var niceName = $("#sm-new-album-nicename").val();
        var description = $("#sm-new-album-description").val();

        var makeAlbum = $.ajax({
            url: "makeAlbum.php",
            method: "POST",
            data: {title: title, niceName: niceName, description: description},
            dataType: "html"

        });

        makeAlbum.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

        makeAlbum.done(function (data) {
            $("#sm-album-response").removeClass("hidden").html(data);
        });
    });


})
;

// console.log("Sending request, vars made");
// console.log("STATUS FILTERS!:" + statusFilters);
// console.log("LABEL FILTERS!:" + labelFilters);
// console.log(postData);
// $.post("getData.php", postData, function (data) {
//     console.log("response recieved from getData.php");
//var labels = data['labels'];
//var fields = data['fields'];
//console.log(fields);

$(document).ajaxComplete(function () {
    console.log("Ajax Complete Triggered");
    $("li.sub-fields").draggable({
        //containment: ".sub-field-bounds",
        helper: 'clone',
        snap: true,
        snapMode: 'inner'
    });
    $("#sm-caption").droppable({
        accept: 'li.sub-field',
        connectWith: '#sub-fields',
        drop: function (event, ui) {
            $(this).append(ui.draggable);
        }

    });
    $("#sm-caption").sortable();
    //  $("#sm-caption").disableSelection();


});

function saveData(dataToSave) {
    var saver = $.ajax({
        url: "saveSession.php",
        method: "POST",
        data: dataToSave,
        dataType: "json"
    });
    console.log(dataToSave);
    saver.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
    saver.done(function (data) {
        // $("#log").append("<p><pre>" + data + "</pre></p>");
        console.log(data);
    });
}

var checkControls = "<div class='check-controls'><input type='checkbox' id='check-all-label-filter'></div>";



