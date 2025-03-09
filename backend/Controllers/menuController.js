const Menu = require("../models/menuModel");

// Add a new menu
addMenu = async (req, res) => {
  try {
    const { title, month } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Only JPG, JPEG, and PNG images are allowed!" });
    }

    const image = `/uploads/${req.file.filename}`;

    const newMenu = new Menu({ title, month, image });
    await newMenu.save();

    res
      .status(201)
      .json({ message: "Menu added successfully!", menu: newMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add menu" });
  }
};

// Get all menus
getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
};

module.exports = {
  addMenu,
  getMenus,
};
