import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  nam: { type: String, required: true, uinque: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
