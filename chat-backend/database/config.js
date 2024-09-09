const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_STRING, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
    });

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la db - ver logs");
  }
};

module.exports = { dbConnection };

// useNewUrlParser , useUnifiedTopology , useFindAndModify , and
// useCreateIndex are no longer supported options. Mongoose 6 always
// behaves as if useNewUrlParser , useUnifiedTopology , and
//  useCreateIndex are true , and useFindAndModify is false .
