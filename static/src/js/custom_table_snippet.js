$(document).ready(function () {
    'use strict';

    // Check if the user has the 'website.group_website_designer' group
    var isDesigner = $('body').hasClass('editor_enable');

    if (isDesigner) {
        // Make table cells editable
        $(document).on('click', '.table-editable tbody td', function () {
            $(this).attr('contenteditable', 'true');
            $(this).addClass('editing');
            $(this).focus();
        });

        // Save changes when the cell loses focus
        $(document).on('blur', '.table-editable tbody td', function () {
            $(this).attr('contenteditable', 'false');
            $(this).removeClass('editing');
            saveTableData();
        });

        // Add new row to the table
        $(document).on('click', '.add-row', function () {
            var $table = $(this).closest('.s_table_custom').find('.table-editable');
            var columnCount = $table.find('tr:first-child > td').length;
            var newRow = '<tr>';
            for (var i = 0; i < columnCount; i++) {
                newRow += '<td>New Cell</td>';
            }
            newRow += '</tr>';
            $table.append(newRow);
            saveTableData();
        });

        // Add new column to the table
        $(document).on('click', '.add-column', function () {
            var $table = $(this).closest('.s_table_custom').find('.table-editable');
            $table.find('tr').each(function () {
                $(this).append('<td>New Cell</td>');
            });
            saveTableData();
        });
    }

    // Save table data to the server
    function saveTableData() {
        var tableData = $('.table-editable').html();
        $.ajax({
            url: '/custom_table_snippet/save_data',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({table_data: tableData}),
        });
    }

    // Load table data from the server
    function loadTableData() {
        if (isDesigner) {
            $.ajax({
                url: '/custom_table_snippet/load_data',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.table_data) {
                        $('.table-editable').html(response.table_data);
                    }
                },
                error: function () {
                    console.error('Failed to load table data from the server.');
                },
            });
        }
    }

    // Load the saved table data
    loadTableData();
});
