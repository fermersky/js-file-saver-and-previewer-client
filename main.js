// get blob from server which sends data as stream with Contnet-Type: octet/stream

// Server may look like this

// app.get('/file/:filename', (req, res) => {
//   const { filename } = req.params;
//   const readStream = fs.createReadStream(path.join(__dirname, 'client', filename));
//   res.writeHead(200, { 'Content-Type': 'octet/stream' }); // set this header to browser start downloading a file
//   readStream.pipe(res);
// });

async function getBlob() {
  const response = await fetch('http://localhost:3000/file/img.jpg');
  const blob = await response.blob();

  return Promise.resolve(blob);
}

const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', async (e) => {
  const blob = await getBlob();

  saveByteArray(blob, 'img.jpg');
});

var saveByteArray = function (data, name) {
  // create dummy anchor element
  const a = document.createElement('a');
  document.body.appendChild(a);

  // hide anchor
  a.style = 'display: none';

  // create object element in memory
  const blob = new Blob([data], { type: 'octet/stream' });
  const url = window.URL.createObjectURL(blob);

  // if you want to preview an image
  document.getElementById('img').src = url;

  // console.log(url);

  // start downloading by simulate clicking
  a.href = url;
  a.download = name;
  a.click();

  // revoke if file is unnesessary after downloading
  // do not revoke if file uses in dom as src of something else
  // window.URL.revokeObjectURL(url);
};

const inputFile = document.getElementById('inputFile');

inputFile.addEventListener('change', (e) => {
  // get selected file from input[type='file']
  const file = e.target.files[0];

  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);

  // preview this file
  document.getElementById('img1').src = url;
});
