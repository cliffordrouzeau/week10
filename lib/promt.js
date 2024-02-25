const inquirer = require("inquirer");
const { writeFile } = require("fs/promises");

inquirer
  .prompt([
    {
      name: "logoname",
      type: "input",
      message: "Name for the logo (maximum of 3 letters)",
      validate: (name) => name.length <= 3,
    },
    {
      name: "color",
      type: "input",
      message: "Enter color for the logo",
    },
    {
      name: "shape",
      type: "list",
      message: "What shape do you want your logo to be?",
      choices: ["square", "circle", "triangle"],
    },
    {
      name: "textcolor",
      type: "input",
      message: "Enter color of text",
    },
  ])
  .then(({ logoname, color, shape, textcolor }) => {
    let logo;

    // SVG shapes
    const circle = `circle cx="150" cy="100" r="80"`;
    const square = `rect x="90" y="40" width="120" height="120"`;
    const triangle = `polygon points="150, 18 244, 182 56, 182"`;

    switch (shape) {
      case "square":
        logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"> 
                    <${square} fill="${color}" />
                    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${logoname}</text>
                </svg>`;
        break;

      case "circle":
        logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"> 
                    <${circle} fill="${color}" />
                    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${logoname}</text>
                </svg>`;
        break;

      case "triangle":
        logo = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"> 
                    <${triangle} fill="${color}" />
                    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${logoname}</text>
                </svg>`;
        break;

      default:
        throw new Error("Invalid shape selected");
    }

    return writeFile("logo.svg", logo);
  })
  .then(() => {
    console.log("Generated logo.svg");
  })
  .catch((error) => {
    console.error("Error:", error.message);
    console.log("Oops!");
  });
