var mongoose = require("mongoose");

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
mongoose.connect('mongodb+srv://Emmanuel:Tournevis@cluster0.ji2sm.mongodb.net/morningnews?retryWrites=true&w=majority',
    options,
    function(err) {
        if (err == null) {
            console.log("MongoDB connecté")
        }else {
            console.log(err);
        }
    }
);