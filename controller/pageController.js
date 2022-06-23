exports.viewHomePage = (req, res) => {
  try {
    res.status(200).render("index", {
      page_name: "index",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.viewAboutPage = (req, res) => {
  try {
    res.status(200).render("about", {
      page_name: "about",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.viewContactPage = (req, res) => {
  try {
    res.status(200).render("contact", {
      page_name: "contact",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.viewBlogPage = (req, res) => {
  try {
    res.status(200).render("blog", {
      page_name: "blog",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
