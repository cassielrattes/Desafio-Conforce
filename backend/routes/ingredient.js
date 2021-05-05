const Ingredientes = require("../models/food");

const router = require("express").Router();

const ingredient = [];

router.get("/", (req, res) => {
  res.json(ingredient);
});

router.post("/", (req, res) => {
  const body = req.body;
  const food = new Ingredientes(body);
  ingredient.push(food);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(ingredient.find((r) => id === r.id));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const food = new Ingredientes(body);

  ingredient.filter((e) => {
    if (id === e.id) {
      const index = ingredient.indexOf(e);
      ingredient[index] = food;
    }
  });
  res.json(ingredient);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  ingredient.filter((e) => {
    if (id === e.id) {
      const index = ingredient.indexOf(e);
      ingredient.splice(index, 1);
    }
  });
  res.json(ingredient);
});

module.exports = router;
