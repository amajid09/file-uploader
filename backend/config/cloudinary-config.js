import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'
// Configuration
export default cloudinary.config({
  cloud_name: "dpjqeqxys",
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, 
});
