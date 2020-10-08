//list_get, list_post, list_delete
const list = require("../models/list");
const { v4: uuidv4 } = require("uuid");
const new_list = require("../models/url");
const jwt = require("jsonwebtoken");

const duration = 3 * 24 * 60 * 60;

const handle_error = (err) => {
  errors = { input: "" };

  if (err.message.includes("List validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const createToken = (n) => {
  return jwt.sign({ n }, "toodoo auth", {
    expiresIn: duration,
  });
};

const list_get = (req, res) => {
  const id = req.params.id;

  list
    .find({ uuid: id })
    .then(async (result) => {
      const infos = await new_list.find({ uuid: id });
      infos.forEach((info) => {
        const token = createToken(id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: duration * 1000 });

        res.render("list", {
          title: "My list",
          items: result,
          x: id,
          nm: info,
        });
      });
    })

    .catch((error) => {
      console.log(error);
    });
};

const list_post = (req, res) => {
  const id = req.params.id;
  const data_list = {
    name: req.body.td,
    uuid: id,
  };
  list.create(data_list, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/" + data_list.uuid);
    }
  });
};

const list_delete = (req, res) => {
  const item = req.params.item;
  const id = req.params.id;

  list
    .findByIdAndDelete(item)
    .then((response) => {
      res.json({ redirect: "/" + id });
    })
    .catch((err) => {
      console.log(err);
    });
};

const list_put = (req, res) => {
  const item = req.params.item;
  const id = req.params.id;
  const update = {
    data: item,
  };
  new_list
    .findOneAndUpdate({ uuid: id }, update)
    .then((response) => {
      res.json({ redirect: "/" + id });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  list_get,
  list_post,
  list_delete,
  list_put,
};
