import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for folder/module name
rl.question("Enter module name: ", (moduleName) => {
  if (!moduleName) {
    console.log("❌ Module name cannot be empty.");
    rl.close();
    return;
  }

  // Locate src folder (from project root)
  const srcPath = path.join(process.cwd(), "src/modules");

  if (!fs.existsSync(srcPath)) {
    console.log("❌ Error: 'src' folder not found in project root!");
    rl.close();
    return;
  }

  // Module folder path inside src
  const folderPath = path.join(srcPath, moduleName);

  // Check if module folder already exists
  if (fs.existsSync(folderPath)) {
    console.log(`❌ Error: Module '${moduleName}' already exists in src!`);
    rl.close();
    return;
  }

  // Create the module folder
  fs.mkdirSync(folderPath);
  console.log(`📁 Created module folder: '${folderPath}'`);

  // Define files to create
  const files = [
    `${moduleName}.model.js`,
    `${moduleName}.controller.js`,
    `${moduleName}.route.js`,
    `${moduleName}.service.js`,
    `${moduleName}.schema.js`,
  ];

  // Create each file with boilerplate comment
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const content = `// ${file} - ${moduleName} module\n\n`;
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${file}`);
  });

  console.log("🎉 Module setup completed inside src/");
  rl.close();
});
