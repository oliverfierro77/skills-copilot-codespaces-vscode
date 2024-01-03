function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var memberContent = document.getElementById("memberContent");
    var skillsContent = document.getElementById("skillsContent");
    var projectsContent = document.getElementById("projectsContent");
    var memberButton = document.getElementById("memberButton");
    var skillsButton = document.getElementById("skillsButton");
    var projectsButton = document.getElementById("projectsButton");

    // Change the content of the page
    memberContent.style.display = "block";
    skillsContent.style.display = "none";
    projectsContent.style.display = "none";

    // Change the color of the buttons
    memberButton.style.backgroundColor = "#4CAF50";
    skillsButton.style.backgroundColor = "#2c2c2c";
    projectsButton.style.backgroundColor = "#2c2c2c";
}