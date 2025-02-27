const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = 5000;


//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));



const PATH = "./public/images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

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




//AdminSchema

const adminSchemaStructure = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});
const Admin = mongoose.model("adminSchema", adminSchemaStructure);

//AdminPost

app.post("/Admin", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    let admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    }

    admin = new Admin({
      adminName,
      adminEmail,
      adminPassword,
    });

    await admin.save();

    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
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



app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    });


    if (admin) {
      res.send({
        id: admin._id,
        login: "Admin",
      });
    }
    if (!admin && !developer && !user) {
      res.send({
        login: "error",
      });
    }
  } catch (err) {
    console.error("Error", err);
  }
});




app.post('/userReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), (req, res) => {
  console.log('Received data:', req.body);
  console.log('Received files:', req.files);

  const { name, email, address, contact, district, place } = req.body;
  var fileValue = JSON.parse(JSON.stringify(req.files));
  var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
  var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;

  // Log the data for debugging
  console.log('Processed data:', { name, email, address, contact, district, place, profileimgsrc, proofimgsrc });

  res.status(201).send({ message: 'Registration successful', data: { name, email, address, contact, district, place, proofimgsrc, profileimgsrc } });
});