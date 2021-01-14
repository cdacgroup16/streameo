const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 25,
            unique: true,
            trim: true,
        },
        {
            timestamps : true
        }
    );

    module.exports = mongoose.model("Categories",categoriesSchema);