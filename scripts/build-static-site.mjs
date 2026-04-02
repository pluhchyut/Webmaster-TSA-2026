import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "public");

const staticFiles = [
  "index.html",
  "explore.html",
  "bulletin.html",
  "directory.html",
  "support.html",
  "education.html",
  "forum.html",
  "community.html",
  "funding.html",
  "reference.html",
  "styles.css",
  "app.js",
];

const staticDirectories = ["assets"];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const file of staticFiles) {
  await copyFile(path.join(rootDir, file), path.join(outputDir, file));
}

for (const directory of staticDirectories) {
  await cp(path.join(rootDir, directory), path.join(outputDir, directory), {
    recursive: true,
  });
}

console.log(`Static site synced to ${path.relative(rootDir, outputDir)}`);
