var express                 = require('express');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');
var paypal                  = require('paypal-rest-sdk');



////Paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AXe5nVWQQurXjn5Ueyz0T7ucsQm8GnLlJWEw84bxOshmOh7CJRO85_lrg6tcGylfPHC33jONxY0IenAZ',
  'client_secret': 'EDpoxBdt6O1KB5-7_NvYmXLE3iAz6FEmUns2EdkOnCEAodReY15Bjl6CH_kFqj60ats1ispAWHMgHz8j'
});

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice.toFixed(2)
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice.toFixed(2), bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice.toFixed(2);


    // Build PayPal payment request
  var payReq = JSON.stringify({
    intent:'sale',
    payer:{
      payment_method:'paypal'
    },
    redirect_urls:{
      return_url:'http://localhost:3000/checkout/checkout-success',
      cancel_url:'http://localhost:3000/checkout/checkout-cancel'
    },
    transactions:[{
      amount:{
        total:totalPrice,
        currency:'USD'
      },
      description:'Test Payments'
    }]
  });

  paypal.payment.create(payReq, function(error, payment){
  var links = {};

  if(error){
    console.error(JSON.stringify(error));
  } else {
  for (let i = 0; i < payment.links.length; i++){
    if(payment.links[i].rel === 'approval_url'){
      res.redirect(payment.links[i].href);
    }
  }
}
});


/*var didPaymentSucceed = Math.random()
    //FOR NOW
    if (didPaymentSucceed >= 0.5){
       //either of these two could work
       //res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-success')
     }
    else {
       //either of these two could work
       //res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-cancel')
    } */
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice.toFixed(2);

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": totalPrice
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment){
      if(error){
        console.log(error.response);
        throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        let orderAddress = payment.payer.payer_info.shipping_address.line1 + ' '
        + payment.payer.payer_info.shipping_address.city + ' ' + payment.payer.payer_info.shipping_address.city
        + ' ' + payment.payer.payer_info.shipping_address.state + ' ' + payment.payer.payer_info.shipping_address.postal_code
        let date = payment.create_time

        var order = new Order({
          orderID   : payerId,
          username  : 'admin@admin.com',
          address   : orderAddress,
          orderDate : date,
          shipping  : true
        });

        order.save();
        console.log(order);
      }
    });

    // POST insert new product


    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;
