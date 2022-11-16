import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let cover = {};
  for (let item of products) {
    if (item.title in cover) {
      if (
        !cover[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        cover[item.title].color.push(item.color);
      }
      if (
        !cover[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        cover[item.title].size.push(item.size);
      }
    } else {
      cover[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        cover[item.title].color = [item.color];
        cover[item.title].size = [item.size];
      }
    }
  }

  res.status(200).json({ cover });
};

export default connectDb(handler);
