const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const config = require('config');

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.get('fileStorage.awsAccessKeyId'),
    secretAccessKey: config.get('fileStorage.awsSecretAccessKey'),
  },
  region: config.get('fileStorage.s3Region'),
});

const getFileNameFromUrl = (url) => url?.split('/').at(-1);

const getFileUrl = (fileName) => `https://${config.get('fileStorage.s3Bucket')}.s3.amazonaws.com/${fileName}`;

const putObject = (file, fileName, onProgress) => {
  const s3Bucket = config.get('fileStorage.s3Bucket');
  const params = {
    Bucket: s3Bucket,
    Key: fileName,
    Body: file,
  };
  const upload = new Upload({
    params,
    client: s3,
  });

  upload.on('httpUploadProgress', (progress) => {
    if (typeof onProgress === 'function') {
      onProgress(((progress.loaded * 100) / progress.total).toFixed(2));
    }
  });

  return upload.done();
};

const deleteObject = (fileName) => {
  const s3Bucket = config.get('fileStorage.s3Bucket');
  const command = new DeleteObjectCommand({
    Bucket: s3Bucket,
    Key: fileName,
  });

  return s3.send(command);
};

module.exports = {
  s3, getFileNameFromUrl, getFileUrl, deleteObject, putObject,
};
