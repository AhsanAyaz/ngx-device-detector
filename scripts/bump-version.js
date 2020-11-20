let fs = require('fs');
let semver = require('semver');

const bumpFileVersion = filePath => {
  if (!fs.existsSync(filePath)) {
    console.error(`Where is the package.json (${filePath})? You high bro??`);
    return;
  }
  let package = fs.readFileSync(filePath);
  package = JSON.parse(package);
  let currentVersion = package.version;
  let targetVersion = process.argv[2];
  const isNotBump = !['major', 'minor', 'patch'].includes(targetVersion);
  const isNotVersion = !packageVersionRegex.test(targetVersion);
  if (isNotBump && isNotVersion) {
    console.error('Invalid version/patch type provided');
    return;
  }
  const newVersion = isNotVersion ? semver.inc(package.version, targetVersion) : targetVersion;
  package.version = newVersion;
  fs.writeFileSync(filePath, JSON.stringify(package, null, 2));
  console.log('Version updated', currentVersion, '=>', newVersion);
};

const dDPackageJson = 'projects/ngx-device-detector/package.json';
const wsPackageJson = 'package.json';
const wsPackageLockJson = 'package-lock.json';
const packageVersionRegex = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/;

const filesToBump = [wsPackageJson, wsPackageLockJson, dDPackageJson];

filesToBump.map(filePath => bumpFileVersion(filePath));
