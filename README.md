# IPFS NFT Collection Downloader
IPFS Collection Downloader


## Installation 🛠️

Basic setup prior to use, you'll need: 

Code Editor:
[💻Visual Studio Code](https://code.visualstudio.com/download)

Install Prerequisites: 
NVM (optional, but smart) | Node.js | NPM | Yarn | Homebrew (mac)

The easiest way to install these is to [Google](https://google.com)
.ie 'Install node mac' | 'Install yarn windows'

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/cojacnft/collection-scraper.git
```

Go to the root of your folder and run this command if you have yarn installed.

```sh
yarn install
```

# IPFS Setup

Find the collection smart contract on https://Etherscan.io, this can usually be found with tools like https://icy.tools and searching for the specific collection.

On Etherscan under "Read Contract" look for 'tokenURI' (or similar), enter an NFT # that has already been minted.
==============================================================
NOTE: THIS IS ALL ONLY AVAILABLE IF THE COLLECTION IS REVEALED
==============================================================

The response should be something like this:

```js
[ tokenURI(uint256) method Response ]
string :  ipfs://QmZcLyNszQrURgmaQowgu43cVsa8K8CfGKxjpFmW2VoLaf/3
```

The end of the URI will either have a suffix or not (ie. in the above example it's '3' where others would say '3.json')

Occassionally there will be some discrepancies, i.e. the '/imgs/' at the end of the CID in this example:

```js
[ tokenURI(uint256) method Response ]
string :  ipfs://QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/3
```
Update the tokenUri in the index.js file with the CID from the tokenURI

EXAMPLE A:
const tokenUri = ipfsURI + "QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/";

EXAMPLE B:
const tokenUri = ipfsURI + "QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/";


If the tokenURI did not contain a suffix (ie. 'json') check index.js 'line 41'

```js
const imageAddress = imgIpfsUrl.replace('ipfs://', '');
```

Take the info after 'ipfs://' and copy it into a new browser tab following the url 'https://ipfs.io/ipfs/'

EXAMPLE A:
https://ipfs.io/ipfs/QmZcLyNszQrURgmaQowgu43cVsa8K8CfGKxjpFmW2VoLaf/3

EXAMPLBE B:
https://ipfs.io/ipfs/QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/3

The link should take you to the metadata of the image. From there look for the:

image: "ipfs://[CID]/[image].png

EXAMPLE: image:	"ipfs://QmVP82xERk94q5BYkzvmkQQpxomy2AfJj2Ld3x6zHhTiPv/3.png"

The '.png' suffix isn't always what to expect. "png", "jpg", "webp", "gif", "webm" and more can be expected

There are also occassions where it can be displayed with no suffix

EXAMPLE: image:	"ipfs://bafybeia3bl4fzlzlpzzaa6ubecodgmyrvipgvqzlaunq7adtcs5oa42rbe"

:: THIS IS IMPORTANT TO NOTE, IT'S RARE BUT HAPPENS ::

Check the 'download_image' in the 'async function' to edit the suffix as needed:

EXAMPLE A (SUFFIX '3.png')
await download_image(imgUrl, startImg + ".png");

EXAMPLE B (NO SUFFIX)
await download_image(imgUrl, startImg + "");


# BASIC SETUP

1. Make sure there is a folder structure in the main directory (where index.js is located) that is laid out like this:

            generated
                |
                |_images
                |
                |_json

:: MAKE SURE THE FOLDERS ARE EMPTY::
:: A NEW RUN WILL DELETE ANYTHING IN THOSE DIRECTORIES::

        :: RENAME THE 'generated' FOLDER TO THE PROJECT CONTAINED IN IT::

If there is no folder, or you just renamed one containing files, copy and paste the 'generated' folder from '.copyfolder2main' and make sure that the 'images' and 'json' folders are in side.

::NOTE::

The project will not run and will continually error out unless the folders are setup and labeled correctly.


2. Edit the tokenCount and startImg

## Running a single instance:

1. Set tokenCount to +1 over the total collection amount (safest, but slow)

::The script stops 1 before the entered number so you won't get the entire collection::
            
::If collection is 5,000 and tokenCount is set to 5,000 the download will end at 4,999::
::Setting tokenCount to 5,001 will give 5,000 downloads::

2. Set the `startImg` according to the blockchain the IPFS collection is coming from.

::ETH = startImg = 1
::SOL = startImg = 0
            
This is located in the async function of index.js

LOOK FOR:
```js                       
for (startImg = 1; startImg < tokenCount; startImg++)
```

## Running multiple instances (faster but requires more attention to detail)

1. Set up the startIMG of thefirst instance just like you would running a single instance.

::ETH = startImg = 1
::SOL = startImg = 0
        
2. Decide how many instances you would like to run and divide the `tokenCount` accordingly

EXAMPLE:
            
10,000 Collection
Run 10 Instances
Set `tokenCount` of the first instance 1000 then set the others according to the division:
                
2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10001
::10,001 still necessary or will only get 9999::

While running the first instance will download 1-999, instance 2 will start off downloading 2000, etc.

3. The `startImg` will be set in the beginning to the previous instances `tokenCount`
                
If the first instance had a `tokenCount` of:

tokenCount = 1000

Then the second instance's `startImg` would be set to:

startImg = 1000

## IMPORTANT: 

If the instance fails while running (which it will)
Look to see what the last image or json file downloaded was
Go to the `startImg` of the instance and replace it's value
with a value 2-3 digits lower than the last image or json
then in the terminal continue the run


To Run the instance and start downloading the IPFS collection run:

```sh
node index.js
```

If it's working correctly you should see something similar to this in your terminal

https://ipfs.filebase.io/ipfs/QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/1
Token: 1 | Status: 200
1 https://ipfs.filebase.io/ipfs/bafybeick6bs37x3chpnakfnu3xloervm4gv4hw47txcipk6p5nyingwaoy
https://ipfs.filebase.io/ipfs/QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/2
Token: 2 | Status: 200
2 https://ipfs.filebase.io/ipfs/bafybeicrby57ficmje3oew4wfbwayuycqiesxi37o4wgtwu2hazmc3z7ku
https://ipfs.filebase.io/ipfs/QmUyKHwBDj5e8ntvGhKKzx3myaz6JGxnVB5tgaFzfaq3aj/imgs/3
Token: 3 | Status: 200
3 https://ipfs.filebase.io/ipfs/bafybeia3bl4fzlzlpzzaa6ubecodgmyrvipgvqzlaunq7adtcs5oa42rbe
PS J:\.IPFS Downloader 10k Setup\3000>

