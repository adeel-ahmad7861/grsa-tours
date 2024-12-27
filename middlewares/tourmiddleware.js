
const validation = require('../validations/tourvalidation');
//submit
const Toursubmit = (req, res, next) => {
    const { error } = validation.toursubmit.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

//delete
const Tourdelete = (req, res, next) => {
    const { error } = validation.tourdelete.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

//update
const Tourupdate = (req, res, next) => {
    const { error } = validation.tourupdate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

//search
const Toursearch = (req, res, next) => {
    const { error } = validation.toursearch.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports={Toursubmit,Tourdelete,Toursearch,Tourupdate};

