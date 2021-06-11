const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  // res.status(200).json({ message: "cart" });
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    // find the cart for that user
    if (error) return res.status(400).json({ error });
    // if cart is already present for particular user then update the products
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product); //find the request product from the cart
      let condition, update;
      if (item) {
        // if same product is to be added to cart then update quantity
        condition = {
          user: req.user._id,
          "cartItems.product": product,
        };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        // if different product is to be added in cart the push whole product to cartItems array
        condition = {
          user: req.user._id,
        };
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) return res.status(200).json({ cart: _cart });
      });
    } else {
      console.log("1st cart created");
      // if no cart present for particular user then create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};
