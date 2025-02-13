const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;


//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));


app.listen(port, () => {
  try {
    console.log(`Server is running ${port}`);
    mongoose.connect(
      "mongodb+srv://aj123:aj123@shoppify.fsyemvp.mongodb.net/db_sample"
    );
    console.log("db connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});






const districtSchemaStructure = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
  },

});
const District = mongoose.model("districtCollection", districtSchemaStructure);

//AdminPost

app.post("/District", async (req, res) => {
  try {
    const { districtName } = req.body;

    let district = await District.findOne({ districtName });

    if (district) {
      return res.json({ message: "District already exists" });
    }

    district = new District({
      districtName,
    });

    await district.save();

    res.json({ message: "District inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/District", async (req, res) => {
  try {
    const district = await District.find();
    if (district.length === 0) {
      return res.send({ message: "District not found", district: [] });
    } else {
      res.send({ district }).status(200);
    }
  } catch (err) {
    console.error("Error Finding District:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.get("/DistrictById/:id", async (req, res) => {
  try {
    const districtId = req.params.id;
    const district = await District.findById(districtId);
    if (!district) {
      return res.send({ message: "District not found", district: {} });
    } else {
      res.send({ district }).status(200);
    }
  } catch (err) {
    console.error("Error Finding District:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.delete("/District/:id", async (req, res) => {
  try {
    const districtId = req.params.id;
    const deletedDistrict = await District.findByIdAndDelete(districtId);

    if (!deletedDistrict) {
      return res.json({ message: "District not found" });
    } else {
      res.json({ message: "District deleted successfully", deletedDistrict });
    }
  } catch (err) {
    console.error("Error deleting District:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.put("/District/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { districtName } = req.body;
   
    let district = await District.findByIdAndUpdate(id, { districtName }, { new: true });

    res.json({ message: "District updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
