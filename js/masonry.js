$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: 12,
    horizontalOrder: true,
    percentPosition: true
  });

  // set the clickable button of shortname
  function widgetButtonResize(){
    $('.widget_sized_btn').each(function(){
      $(this).height($(this).siblings('.sn_info').outerHeight() + $(this).siblings('.sn_dom').outerHeight())
    })
  }
  widgetButtonResize();

  $( window ).on( "resize", function() {
    widgetButtonResize();
  });

  // Slider
  var scrollDuration = 500;
  var leftPaddle = $('.left-paddle');
  var rightPaddle = $('.right-paddle');
  // dimensions
  var itemsLength = $('.slider .sn_box').length;
  var itemSize = $('.sn_box').outerWidth(true) + 13;
  // get some relevant size for the paddle triggering point
  var paddleMargin = 20;

  // get wrapper width
  var getMenuWrapperSize = function() {
    return $('.slider_container').outerWidth();
  }
  var menuWrapperSize = getMenuWrapperSize();

  // the wrapper is responsive
  $(window).on('resize', function() {
    menuWrapperSize = getMenuWrapperSize();
  });
  // size of the visible part of the menu is equal as the wrapper size 
  var menuVisibleSize = menuWrapperSize;

  // get total width of all menu items
  var getMenuSize = function() {
    return itemsLength * itemSize;
  };
  var menuSize = getMenuSize();
  // get how much of menu is invisible
  var menuInvisibleSize = menuSize - menuWrapperSize;

  // get how much have we scrolled to the left
  var getMenuPosition = function() {
    return $('.slider').scrollLeft();
  };

  // what happens when we are actually scrolling the menu
  $('.slider').on('scroll', function() {

    // get how much of menu is invisible
    menuInvisibleSize = menuSize - menuWrapperSize;
    // get how much have we scrolled so far
    var menuPosition = getMenuPosition();

    var menuEndOffset = menuInvisibleSize - paddleMargin;

    // show & hide the paddles 
    // depending on scroll position
    if (menuPosition <= paddleMargin) {
      $(leftPaddle).addClass('hidden');
      $(rightPaddle).removeClass('hidden');
    } else if (menuPosition < menuEndOffset) {
      // show both paddles in the middle
      $(leftPaddle).removeClass('hidden');
      $(rightPaddle).removeClass('hidden');
    } else if (menuPosition >= menuEndOffset) {
      $(leftPaddle).removeClass('hidden');
      $(rightPaddle).addClass('hidden');
    }

  });

  // scroll to right
  $(rightPaddle).on('click', function() {
    var leftPos = $('.slider').scrollLeft();
    $('.slider').animate( { scrollLeft: leftPos + 254}, scrollDuration);
  });

  // scroll to left
  $(leftPaddle).on('click', function() {
    var leftPos = $('.slider').scrollLeft();
    $('.slider').animate( { scrollLeft: leftPos - 254 }, scrollDuration);
  });

  // function isScrollable(){
  //   if ($('.slider').offsetWidth < $('.slider').scrollWidth) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
});
