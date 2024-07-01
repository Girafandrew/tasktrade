const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(
            "mongodb+srv://andrewalanizg:GVIgOA4TXV8AfMrv@cluster0.3pmt40c.mongodb.net/",
            connectionParams
        );
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
    }
};
