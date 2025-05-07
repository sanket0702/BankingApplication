const mongoose = require('mongoose');

exports.DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("CONNECTED TO DATABASE");
    } catch (error) {
        console.log("ERROR IN CONNECTIVITY", error);
    }
};
