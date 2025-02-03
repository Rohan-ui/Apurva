const Footer = require('../model/footer');

// Get the footer data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAddressAndLocation = async (req, res) => {
  try {
    const footer = await Footer.findOne({}, 'address addresslink location');

    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }

    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update the footer data
exports.updateFooter = async (req, res) => {
  const {address,addresslink, phoneNo, email,location,description,email2 } = req.body;
  
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer({
        address,
        addresslink,
        phoneNo,
        email,
        email2,
        location,
        description
      });

      const newFooter = await footer.save();
      return res.status(201).json(newFooter);
    }

    footer.address = address;
    footer.addresslink = addresslink;
    footer.phoneNo = phoneNo;
    footer.email = email;
    footer.email2=email2;
    footer.location = location;
    footer.description = description;
   
    const updatedFooter = await footer.save();
    res.json(updatedFooter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


