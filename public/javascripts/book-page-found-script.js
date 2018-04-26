$(document).ready(function(){

    // console.log("found script loaded");
    var foundBt = false;
    $('.found-btn').click(function(){
        if(foundBt == false) {
            foundBt = true;
            // $('.found-btn-wrapper').animate({"height":"340px"}, 200);
            $('.found-wrapper').stop().css({"display":"block"});
            $('.found-wrapper').animate({"height":"200px"}, 200);
        }
        else if(foundBt == true) {
            foundBt = false;
            // $('.found-btn-wrapper').animate({"height":"40px"}, 200);
            $('.found-wrapper').stop().animate({"height":"0px"}, 200, function(){
                $('.found-wrapper').css({"display":"none"});
            });
        }
    });

    var verified = false;

    $("#found-book-form").submit(function(){

        if(verified == true) {
            return true;
        }

        var trackingValue = $('#tracking').val();
        var bookId = $('#bookId').val();

        if(trackingValue == ""){
            return false;
        }

        axios.get(`/checkFound/${bookId}/${trackingValue}`)
        .then((response) => {
            if(response.data) {
                console.log(response.data);
                $('.found-error').text("");
                verified = true;
                $("#found-book-form").trigger('submit');
            }
            else {
                $('.found-error').text("Sorry, the tracking code is not valid");
            }
        })
        .catch((err) => {
            console.log(err);
        });
        return false;
    });
















});

