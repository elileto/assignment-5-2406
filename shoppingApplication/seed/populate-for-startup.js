var Product     = require('../models/product');
var User        = require('../models/user');
var Order        = require('../models/order');
var mongoose    = require('mongoose');


// Store number of tasks to be completed before disconnect.
let completedTasks = 0;
const NUM_TASKS = 5;

mongoose.connect('mongodb://localhost/shoppingApp', function (err) {
    if (err) throw err;

    // Remove products
    Product.remove({}, (err) => {
        if (err) throw err;
        // When products remove, add new products
        populateProducts();
        console.log("done  removing products");
        completedTasks++;
        exit();
    });

    // Remove users
    User.remove({}, (err) => {
        if (err) throw err;
        // When users removed, add new users
        populateUsers();
        console.log("done  removing users");
        completedTasks++;
        exit();
    });

    // Remove orders
    Order.remove({}, (err) => {
        if (err) throw err;

        completedTasks++;
        console.log("done  removing orders");
        exit();
    });

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
        title       : 'Black Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 29.99
    }),
    new Product({
        imagePath   : '/images/underwear-black.jpg',
        title       : 'Blue Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 29.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-01.jpg',
        title       : 'Red Cube Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-02.jpg',
        title       : 'Alligator Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-03.jpg',
        title       : 'Aqua Cube Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-04.jpg',
        title       : 'Blue Cheetah Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-05.jpg',
        title       : 'Purple Cube Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-06.jpg',
        title       : 'Internet Print Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-09.jpg',
        title       : 'Space Invaders Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-08.jpg',
        title       : 'Zebra Print Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    }),
    new Product({
        imagePath   : '/images/underwearprint-07.jpg',
        title       : ' Yellow Zebra Print Close Fit Brief',
        description : 'Ultra cotton tight fit andgrogynous briefs in aqua marine that hug your hips.',
        price       : 19.99
    })
];


function populateProducts() {

    // Save each product
    for (let i = 0; i < products.length; i++) {
        products[i].save(function (err, result) {
            if (i === products.length - 1) {
                completedTasks++;
                console.log("done adding products");
                exit();
            }
        });
    }
}

function populateUsers() {
    var newUser = new User({
        username: 'admin@admin.com',
        password: 'admin',
        fullname: 'Elizabth Letourneau',
        admin: true
    });

    // Add the new user
    User.createUser(newUser, function (err, user) {
        if (err) throw err;

        completedTasks++;
        console.log("done adding users");
        exit();
    });
}


function exit() {
    // If the number of completed tasks equals the number of tasks, disconnect.
    if (completedTasks === NUM_TASKS){
      console.log("Quitting..");
      mongoose.disconnect();

    }
}
