


var showContainer = false;

var cats = [ { class: '#ronnie',
               count: 0,
               isVisible: false},
             { class: '#jennifer',
                      count: 0,
                      isVisible: false},
             { class: '#ginger',
                      count: 0,
                      isVisible: false},
             { class: '#bella',
                     count: 0,
                     isVisible: false},
             { class: '#manny',
                      count: 0,
                      isVisible: false}
];


var countClicks = function (cat) {

    return function () {
        cat.count += 1;
        $(this).nextAll('h3').text(cat.count);

    }

}


var modify = function (index, cat) {
    return function () {
        var cat_name = $(cat.class).text();
        if(cat.isVisible === false) {
            cat.isVisible = true;
            var image_url = 'img/cat' + index.toString() + '.jpg';
            $('.cat-list').append('<li> <h4>' + cat_name + ' </h4> <img class= "cat_style " src="' + image_url + '"> <p>Count</p> <h3>'+cat.count+'</h3></li>');

            $(".cat_style").click(countClicks(cat));
        }

        if(showContainer === false){
            $('.cat-container').toggleClass('show-cats');
            showContainer= true;
        }

    }

};

for(var i = 0; i<cats.length; i++){

    $(cats[i].class).click(modify(i, cats[i]));

}




console.log("jajaja");



