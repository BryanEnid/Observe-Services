const { S3Client, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('config');

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.get('fileStorage.awsAccessKeyId'),
    secretAccessKey: config.get('fileStorage.awsSecretAccessKey'),
  },
  region: config.get('fileStorage.s3Region'),
});

const getFileNameFromUrl = (url) => url.split('/').at(-1);

const putObject = (file, fileName) => {
  const s3Bucket = config.get('fileStorage.s3Bucket');
  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: fileName,
    Body: file,
  });

  return s3.send(command);
};

const deleteObject = (fileName) => {
  const s3Bucket = config.get('fileStorage.s3Bucket');
  const command = new DeleteObjectCommand({
    Bucket: s3Bucket,
    Key: fileName,
  });

  return s3.send(command);
};

module.exports = { s3, getFileNameFromUrl, deleteObject, putObject };
