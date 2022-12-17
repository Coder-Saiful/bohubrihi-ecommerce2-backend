module.exports = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).send({message: "Forbidden!"});
    next();
}