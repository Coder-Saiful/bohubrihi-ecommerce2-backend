const { Category, validate } = require('../models/category');
const _ = require('lodash');

module.exports.createCategory = async (req, res) => {
    try {
        const { error } = validate(_.pick(req.body, ["name"]));
        if (error) return res.status(400).send({ message: error.details[0].message + "!" });

        let category = await Category.findOne({ name: req.body.name });
        if (category) return res.status(400).send({ message: "Category already taken!" });

        category = new Category(_.pick(req.body, ["name"]));

        const result = await category.save();

        return res.status(201).send({
            message: "Category created successfully!",
            data: _.pick(result, ["_id", "name"])
        });
    } catch (error) {
        return res.status(400).send({ message: "Category created failed!" });
    }
}

module.exports.getCategories = async (req, res) => {
    try {
        if (await Category.count() > 0) {
            const categories = await Category.find()
                .sort({ name: 1 });
            return res.status(200).send(categories);
        } else {
            return res.status(200).send({ noData: "No category available!" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Failed to fetch categories!" });
    }
}

module.exports.getSingleCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) return res.status(400).send({message: 'Failed to fetch category!'});
        return res.status(200).send(category);
    } catch (error) {
        return res.status(400).send({ message: "Failed to fetch category!" });
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = _.pick(req.body, ["name"]);
        const category = await Category.findByIdAndUpdate(categoryId, updatedCategory, { new: true });

        return res.status(200).send({
            message: 'Category updated successfully!',
            data: _.pick(category, ["_id", "name"])
        });
    } catch (error) {
        return res.status(400).send({ message: "Category updated failed!" });
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);

        return res.status(200).send({ message: 'Category deleted successfully!' });
    } catch (error) {
        return res.status(400).send({ message: "Category deleted failed!" });
    }
}