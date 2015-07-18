$(function() {
  var model = {
    init: function() {
      this.data = {
        cats: [
          {
            name: "cat1",
            imgSrc: "cat_picture1.jpg",
            clickCount: 0
          },
          {
            name: "cat2",
            imgSrc: "cat_picture2.jpeg",
            clickCount: 0
          },
          {
            name: "cat3",
            imgSrc: "cat_picture3.jpeg",
            clickCount: 0
          },
          {
            name: "cat4",
            imgSrc: "cat_picture4.jpeg",
            clickCount: 0
          },
          {
            name: "cat5",
            imgSrc: "cat_picture5.jpeg",
            clickCount: 0
          }
        ],
        currentCat: null
      };
    },
    getAllCats: function() {
      return this.data.cats;
    },
    setCurrentCat: function(cat) {
      this.data.currentCat = cat;
    },
    getCurrentCat: function() {
      return this.data.currentCat;
    }
  };


  var octopus = {
    incrementCount: function() {
      model.getCurrentCat().clickCount += 1;
      catView.render();
    },

    getCat: function() {
      return model.getCurrentCat();
    },

    setCat: function(cat) {
      model.setCurrentCat(cat);
    },

    getCats: function() {
      return model.getAllCats();
    },


    init: function() {
      model.init();
      model.setCurrentCat(model.data.cats[0]);
      catListView.init();
      catView.init();
    }
  };


  var catListView = {
    init: function() {
      this.catListElem = document.getElementById('catlist');
      this.render();
    },
    render: function() {
      var cats = octopus.getCats();
      this.catListElem.innerHTML = '';
      for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        var elem = document.createElement('li');
        elem.textContent = cat.name;
        elem.addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setCat(catCopy);
            catView.render();
          };
        })(cat));
      this.catListElem.appendChild(elem);
      }
    }
  };


  var catView = {
    init: function() {
      this.catElem = document.getElementById('cat');
      this.catNameElem = document.getElementById('cat-name');
      this.catImageElem = document.getElementById('cat-img');
      this.countElem = document.getElementById('cat-count');

      this.catImageElem.addEventListener('click', function() {
        octopus.incrementCount();
      });

      this.render();
    },

    render: function() {
      var currentCat = octopus.getCat();

      this.countElem.textContent = currentCat.clickCount + " clicks";
      this.catNameElem.textContent = currentCat.name;
      this.catImageElem.src = currentCat.imgSrc;
    }
  };

  octopus.init();
});

