$('svg.graph .points circle.plain').each(function (index) {
    // For each plain circle...
    $(this).on('mouseenter', function (event) {
        // Move the indicator line
        moveIndicator(index);
        // Show the tooltip for this data point
        showTooltip(this);

        // Grow shadow point when mouse enters the point
        $(this).prev().stop(true, false).animate({
            svgR: 12,
            svgStrokeOpacity: 0,
            svgStrokeWidth: 0,
        }, 200);
    }).on('mouseleave', function (event) {
        // Hide the tooltip
        hideTooltip();

        // Shrink shadow point when mouse leaves the point
        $(this).prev().stop(true, false).animate({
            svgR: 5,
            svgStrokeOpacity: 1,
            svgStrokeWidth: 4
        }, 200);
    });
});

// Add mouse event handlers to move indicator line when triggerLines have mouse
$('g.triggerLines line').each(function (index) {
    $(this).on('mouseenter', function () {
        moveIndicator(index);
    });
});

// Move the indicator line to a trigger line
function moveIndicator(index) {

    triggerLine = $($('svg.graph .triggerLines line').get(index));
    indicator = $('svg .indicator');

    // If the indicator is already visible, then animate movement. Otherwise just appear
    animateMoveTime = 0;
    if (indicator.css('display') != 'none') animateMoveTime = 250;

    // Get the y-coordinate of the first (and thus highest) data point
    y = $($('g.points:first').children('.plain').get(index)).attr('cy');

    indicator.stop(true, false).show().animate({
        svgX: parseInt(triggerLine.attr('x1')) - (parseInt(indicator.attr('width')) / 2),
        svgY: y,
        svgHeight: 385 - y
    }, animateMoveTime);
}

// Show the tooltip near a specific dataPoint
function showTooltip(dataPoint) {
    tooltip = $('#tooltip');
    dataPoint = $(dataPoint);

    // Set the data-set title, using the group element
    tooltip.find('#tooltip-title').text(dataPoint.parent().data('setname'));

    // Set the value for this data point
    tooltip.find('.value-part').text(dataPoint.data('value'));

    // Determine whether to switch tooltip to the left, because of small screen
    tooltipX = dataPoint.offset().left + 10;
    tooltipY = dataPoint.offset().top + 40;

    // Check if tooltip fits, with a extra border of 10 px
    if (tooltipX + tooltip.outerWidth(true) + 10 > $(window).width()) {
        tooltipX = dataPoint.offset().left - tooltip.outerWidth(true);

        tooltip.addClass('right');

        // Adjust SVG pointer
        $('#tooltip-triangle').attr('transform', 'scale(-1,1) translate(-11,0)');
    } else {
        tooltip.removeClass('right');
        $('#tooltip-triangle').attr('transform', '');
    }

    tooltip.stop(true, true).delay(100).animate({
        top: tooltipY,
        left: tooltipX
    }, 0).fadeIn('fast');
}

// Hide the tooltip
function hideTooltip() {
    // Hide popover and stop animating the bar
    $('#tooltip').stop(true, true).delay(200).fadeOut('fast');
}