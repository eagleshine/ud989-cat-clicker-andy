$(function() {
  var model = {
    init: function() {
      this.data = {
        cats: [
          {
            name: "cat_picture1.jpg",
            count: 0
          }, {
            name: "cat_picture2.jpeg",
            count: 0
          }, {
            name: "cat_picture3.jpeg",
            count: 0
          }, {
            name: "cat_picture4.jpeg",
            count: 0
          }, {
            name: "cat_picture5.jpeg",
            count: 0
          }
        ],
        currentCat: 0
      };
    },
    getAllCats: function() {
      return this.data.cats;
    },
    setCurrentCat: function(index) {
      this.data.currentCat = index;
    },
    getCurrentCat: function() {
      return this.data.cats[this.data.currentCat];
    }
  };


  var octopus = {
    incrementCount: function() {
      model.getCurrentCat().count += 1;
    },
    getCatName: function() {
      return model.getCurrentCat().name;
    },
    getCatCount: function() {
      return model.getCurrentCat().count;
    },
    getCats: function() {
      return model.getAllCats();
    },
    getCatsNumber: function() {
      return model.getAllCats().length;
    },
    setCat: function(index) {
      model.setCurrentCat(index);
    },
    init: function() {
      model.init();
      listView.init();
      catView.init();
    },
    refreshCat: function() {
      catView.render();
    }
  };


  var listView = {
    init: function() {
      this.catlist = $('#catlist');
      listView.render();
    },
    render: function() {
      var htmlStr = '';
      var cats = octopus.getCats();
      for (var i=0; i < cats.length; i++) {
        var name = cats[i].name.split('.')[0]
        htmlStr += '<button id="button' + i +'">' + name + '</button>';
      }
      this.catlist.html(htmlStr);
      for (var i=0; i < octopus.getCatsNumber(); i++) {
        var button = "#button" + i;
        $(button).click((function(index) {
          return function() {
            console.log("clicked button " + index);
            octopus.setCat(index);
            octopus.refreshCat();
          }
        })(i));
      }
    }
  };


  var catView = {
    init: function() {
      this.cat = $('.cat');
      this.cat.click(function() {
        octopus.incrementCount();
        catView.render();
      })
      catView.render();
    },
    render: function() {
      var htmlStr = '';
      htmlStr += '<span class="counter">' + octopus.getCatCount() + '</span> clicks' +
        '<br>' +
        '<img class="clicker" src="' + octopus.getCatName() + '">'
        ;
      this.cat.html(htmlStr);
    }
  };

  octopus.init();
});

