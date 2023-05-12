import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";
const handler = nc();

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const promises = req.body.product.map(async (p) => {
      let dbProduct = await Product.findById(p._id).lean();
      let originalPrice = dbProduct.subProduct[p.style].sizes.find(
        (x) => x.size == p.size
      ).price;
      let quantity = dbProduct.subProduct[p.style].sizes.find(
        (x) => x.size == p.size
      ).qty;
      let discount = dbProduct.subProduct[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });
    const data = Promise.all(promises);
    db.disconnectDb();
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
