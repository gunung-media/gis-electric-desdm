(function($) {
    'use strict';
    $(function() {
        if (!$.fn.dataTable.isDataTable('#data-table-simple'))
            $('#data-table-simple').DataTable().destroy();
        $('#data-table-simple').DataTable({ responsive: true });
    });
})(jQuery);
