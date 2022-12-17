const { Profile } = require('../models/profile');
const _ = require('lodash');

module.exports.getProfiile = async (req, res) => {
    const userId = req.user._id;
    const profile = await Profile.findOne({user: userId});
    return res.status(200).send(profile);
}

module.exports.setProfile = async (req, res) => {
    const userId = req.user._id;
    const userProfile = _.pick(req.body, ["phone", "address1", "address2", "city", "state", "postcode", "country"]);
    userProfile.user = userId;
    let profile = await Profile.findOne({user: userId});

    if (profile) {
        await Profile.updateOne({user: userId}, userProfile);
        return res.status(200).send({message: "Your profile updated successfully!"});
    } else {
        profile = new Profile(userProfile);
        await profile.save({message: "Your profile info saved successfully!   "});
    }
}