const { satisfies } = require("semver");
const { engines } = require("./package.json");

if (!satisfies(process.version, engines.node))
  throw new Error(`wrong Node version ${process.version}, must satisfy ${engines.node}`);
