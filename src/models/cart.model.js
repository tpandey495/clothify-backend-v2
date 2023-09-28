const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const cartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

// Add soft delete functionality
cartSchema.plugin(mongooseDelete, { overrideMethods: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
