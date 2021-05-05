const Lunchs = require("../models/lunch");

const router = require("express").Router();

const lunch = [];

router.get("/", (req, res) => {
  res.json(lunch);
});

router.post("/", (req, res) => {
  const body = req.body;
  const food = new Lunchs(body);
  lunch.push(food);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(lunch.find((r) => id === r.id));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const food = new Lunchs(body);

  lunch.filter((e) => {
    if (id === e.id) {
      const index = lunch.indexOf(e);
      lunch[index] = food;
    }
  });
  res.json(lunch);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  lunch.filter((e) => {
    if (id === e.id) {
      const index = lunch.indexOf(e);
      lunch.splice(index, 1);
    }
  });
  res.json(lunch);
});

module.exports = router;
