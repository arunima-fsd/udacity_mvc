

$(function () {

    var model = {
        init:function(){
            if(!localStorage.cats){
                localStorage.cats = JSON.stringify([]);
            }
        },
        getAllCats: function () {
            var data = JSON.parse(localStorage.cats);
            return data;
        },
        getCatObject:function (id) {
            var data = JSON.parse(localStorage.cats);
            var index;
            for(var i = 0; i < data.length; i++){
                if(data[i].cat_id === id){
                    index = i;
                    break;

                }
            }
            return data[i];
        },
        addCatObject:function(obj){
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        modifyCatCount: function (id, count) {
            var data = JSON.parse(localStorage.cats);
            for(var i = 0; i < data.length; i++){
                if(data[i].cat_id === id){
                    data[i].count = count;
                    break;
                }
            }
            localStorage.cats = JSON.stringify(data);
        }
    };


    
    var octopus = {
        addNewCat:function (catName) {
            var catId = Math.floor(Math.random() * 100);
            var image_num = Math.floor(Math.random()*5);
            var image_url = 'img/cat'+image_num.toString()+'.jpg';
            var newCat = {cat_name: catName,
                          cat_id: catId,
                          image_url: image_url,
                           count: 0};
            model.addCatObject(newCat);
        },
        getAllCats:function () {
            return model.getAllCats();

        },
        getCat: function(id){
            return model.getCatObject(id);
        },
        modifyCount: function (id, count) {
            model.modifyCatCount(id, count);

        },
        init:function () {
            model.init();
            view1.init();
            view2.init();

        }
    };

    var view1 = {
        init:function () {
            this.cat_list = $('.all-cats');
            var newCat = $('#cat-form');
            newCat.submit(function(){
                var catName = $('#cat-name').val();
                console.log(catName);
                octopus.addNewCat(catName);
                $('#cat-name').val("");
            });
            view1.render();
        },
        render:function () {
            var htmlStr = '';
            octopus.getAllCats().forEach(function (cat) {
                htmlStr += '<li class="cat-items" id="cat'+cat.cat_id.toString() +'">'+
                    cat.cat_name + '</li>';
            });

            this.cat_list.html(htmlStr);
            view2.init();
        }
        
    };

    var view2 = {
        init:function () {
            var cat_items = $('.cat-items');
            cat_items.click(function () {
                var id = parseInt((this.id.slice(3)));
                var cat = octopus.getCat(id);
                view2.render(cat);
            });
        },
        render: function (cat) {
            var displayArea = $('.cat');
            displayArea.html('<h3> '+ cat.cat_name +'</h3> ' +
                    '<img class="cat_img_style" src="'+ cat.image_url +'"> <h4>Count:'+ cat.count +'</h4>');
            var cat_img = $('.cat_img_style');
            cat_img.click(function () {
                cat.count += 1;
                octopus.modifyCount(cat.cat_id, cat.count);
                $('.cat').find('h4').text('Count: '+ cat.count);
            });

        }
    };


    octopus.init();
});