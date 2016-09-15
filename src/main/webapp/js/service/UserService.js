/**
 * This file contains methods for control page
 *
 * Created by Kulinenko Roman
 */
app.factory('userService', function ($http, $q) {

    function isInteger(x) {
        return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
    }

    return {
        pageControls: function (defaultPage, showPage, currentPage, pagesCount) {
            var pages = [];
            var i = defaultPage;
            var middleOfPages = showPage / 2;
            if (currentPage > Math.ceil(middleOfPages)) {
                var countRemovePage = Math.floor(middleOfPages);
                if (isInteger(middleOfPages))
                    countRemovePage = countRemovePage - 1;
                i = currentPage - countRemovePage;
            }
            var stop = i + showPage;
            for (i; i < stop; i++) {
                var style = 'btn-default';
                var isDisable = false;
                if (currentPage == i)
                    style = 'btn-info';
                else if (i > pagesCount)
                    isDisable = true;

                pages.push({
                    value: i,
                    style: style,
                    isDisable: isDisable
                });
            }
            return pages;
        },
        getStartCount: function (currentPage, itemPerPage) {
            return (currentPage * itemPerPage) - itemPerPage;
        }
    }
});