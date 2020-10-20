let fs = require('fs');
let semver = require('semver');

const dDPackageJson = './projects/ngx-device-detector/package.json'
const packageVersionRegex = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/

if (fs.existsSync(dDPackageJson)) {
    var package = require(dDPackageJson);
    let currentVersion = package.version;
    let targetVersion = process.argv[2];
    const isNotBump = !['major', 'minor', 'patch'].includes(targetVersion)
    const isNotVersion = !packageVersionRegex.test(targetVersion)
    if (isNotBump && isNotVersion) {
      console.error('Invalid version/patch type provided')
      return;
    }

    let newVersion = semver.inc(package.version, targetVersion);
    package.version = newVersion;
    fs.writeFileSync(dDPackageJson, JSON.stringify(package, null, 2));

    console.log('Version updated', currentVersion, '=>', newVersion);
}
