// NOTE: MAKE SURE 'generated' does not have needed content.
// New run WILL overwrite previous contents
// If needed Rename 'generated' from main directory
// Copy/paste 'generated' from '.copyfolder2main' into main directory

const fs = require('fs');
const axios = require('axios');

//Some public IPFS gateways can
const ipfsURI = "https://ipfs.filebase.io/ipfs/" // For live list check https://ipfs.github.io/public-gateway-checker/

const tokenUri = ipfsURI + "QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/"; // CID of metadata file, not image file

const tokenCount = 10000; // tokenCount ends '-1' of entered count // multiple instances, set startImg = previous tokenCount

const download_image = async (url, image_path) => {
  const response = await axios({
    url,
    responseType: 'stream',
  })

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream("./generated/images/" + image_path))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  });

}

async function go() {
  // When run fails, check downloaded img/json files and replace startImg = [highest_# - 2]
  // i.e. if 3333 was last download, set startImg = 3331
  // save file and re-run $ node index.js
  for (startImg = 0; startImg < tokenCount; startImg++) {
    console.log(tokenUri + startImg);
    const response = await axios.get(tokenUri + startImg);
    console.log(`Token: ${startImg} | Status: ${response.status}`);
    const data = response.data;
    const imgIpfsUrl = data.image;
    const imageAddress = imgIpfsUrl.replace('ipfs://', ''); // Edit according to IPFS URI layout in browser "json", ""
    const imgUrl = ipfsURI + imageAddress;
    console.log(startImg, imgUrl);
    let jsonData = JSON.stringify(data);
    fs.writeFileSync('./generated/json/' + startImg + '.json', jsonData); // Edit according to IPFS URI layout in browser "png", "jpg", "webp", "gif", "webm", ""
    await download_image(imgUrl, startImg + "");
  }
}

(async function () {
  await go();
})()



