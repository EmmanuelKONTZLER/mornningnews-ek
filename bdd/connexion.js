var mongoose = require("mongoose");

var connexion = process.env.MONGO_CONNEXION

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
mongoose.connect(connexion,
    options,
    function(err) {
        if (err == null) {
            console.log("MongoDB connecté")
        }else {
            console.log(err);
        }
    }
);