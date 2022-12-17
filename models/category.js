const { Schema, model } = require('mongoose');
const Joi = require('joi');

module.exports.Category = model('Category', Schema({
    name: {
        type: String,
        unique: true
    }
}, { timestamps: true }));

module.exports.validate = category => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50).messages({
            "string.base": `Category name must be a string`,
            "string.empty": `Category name is not allowed to be empty`,
            "string.min": `Category name length must be at least 3 characters long`,
            "string.max": `Category name length must be less than or equal to 50 characters long`,
            "any.required": `Category name is a required field`
        })
    });
    return schema.validate(category);
}
