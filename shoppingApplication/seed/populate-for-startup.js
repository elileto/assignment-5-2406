var Product     = require('../models/product');
var User        = require('../models/user');
var Order        = require('../models/order');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

Product.remove({}, function(err){
  //remove existing products documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
});

User.remove({}, function(err){
  //remove existing products documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
});

Order.remove({}, function(err){
  //remove existing products documents
  if(err) {
    console.log('ERROR: Remove failed')
    return
  }
});



var products = [
    new Product({
        imagePath   : '/images/underwear-green.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 29.99
    }),
    new Product({
        imagePath   : '/images/underwear-blue.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 79.99
    }),
    new Product({
        imagePath   : '/images/underwear-black.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-01.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-02.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-03.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-04.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-05.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-06.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-09.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-08.jpg',
        title       : 'Aqua Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-07.jpg',
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
        //  console.log("running");
        //    exit();
        }
    });
}



function exit() {
mongoose.disconnect();
}
