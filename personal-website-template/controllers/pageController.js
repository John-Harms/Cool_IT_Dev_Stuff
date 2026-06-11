const fs = require("node:fs");
const projectsData = JSON.parse(
  fs.readFileSync(
    "/Users/johnharms/Desktop/Development/Cool_IT_Dev_Stuff/personal-website-template/data/projects.json",
  ),
);

exports.displayBasePage = (req, res) => {
  res.render("base", { currentView: "home.ejs", projects: projectsData });
};

//Handlers to fetch the html chunks to update base page
exports.displayHomePage = (req, res) => {
  if (req.query.ajax) {
    res.render("home", { projects: projectsData }); // Send only the fragment
    console.log("AJAX Served");
  } else {
    res.render("base", { currentView: "home.ejs", projects: projectsData }); // Send the full layout
  }
};

exports.displayResumePage = (req, res) => {
  if (req.query.ajax) {
    res.render("resume"); // Send only the fragment
    console.log("AJAX served");
  } else {
    res.render("base", { currentView: "resume.ejs" }); // Send the full layout
  }
};
