$(document).ready(function(){

    // Initializing materialize sidenav
    $('.sidenav').sidenav();

    // Animate Books from API search items
    $('.add-form-wrap').hover(function(){
        $(this).find('.book-item-inner-wrap').stop().animate({"top":"10px"}, 250);
        // console.log("ok");
    }, function(){
        $(this).find('.book-item-inner-wrap').stop().animate({"top":"200px"}, 250);
    });
















});

