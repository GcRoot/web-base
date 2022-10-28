const AliOSS = require("ali-oss");
const rd = require("rd");
const co = require("co");


const distPath =  process.env["OUT_DIR"]

function getAllFiles(dir) {
  return new Promise((resolve, reject) => {
    rd.readFile(dir, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

function uploadOss() {

  const defaultConfig = {
    auth: {
      accessKeyId: process.env["OSS_ACCESS_KEY"],
      accessKeySecret: process.env["OSS_ACCESS_KEY_SECRET"],
      bucket: process.env["OSS_BUCKET"],
      endpoint: process.env["OSS_ENDPOINT"],
    },
  };

  const client = new AliOSS(defaultConfig.auth);

  co(function* () {
    let files = yield getAllFiles(distPath);
    console.log("[info] - find %s files", files);

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let key = file.replace(distPath, process.env["OSS_BASEPATH"]);
      let result = yield client.put(key, file);
      console.log("[info] upload %s <- %s", key, file);
    }
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = uploadOss;
