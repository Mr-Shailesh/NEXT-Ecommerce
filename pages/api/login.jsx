import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (
        req.body.email === user.email &&
        req.body.password === decryptedData
      ) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "10s",
          }
        );
        console.log({ token });
        res.status(200).json({ token, success: true });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
