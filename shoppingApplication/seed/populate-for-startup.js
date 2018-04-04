var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

Product.remove({}, function(err){
  //remove existing cat documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
  //ALL CAT DOCUMENTS REMOVED
});


var products = [
    new Product({
        imagePath   : '/images/underwear-green.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 29.99
    }),
    new Product({
        imagePath   : '/images/underwear-blue.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 79.99
    }),
    new Product({
        imagePath   : '/images/underwear-black.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-01.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-02.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-03.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-04.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-05.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-06.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-09.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-08.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-07.png',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    })
];

var newUser = new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Elizabeth Letourneau',
    admin       : true
});
User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);
});

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result) {
        if (i === products.length - 1){
          console.log("running");
            mongoose.disconnect();
        }
    });
}



function exit() {

}
