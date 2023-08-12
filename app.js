require("dotenv").config();
var AWS = require("aws-sdk");

const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_SECRET_KEY,
  accessSecretKey: process.env.AWS_SECRET_KEY,
  region: "sa-east-1",
};

AWS.config.update(SESConfig);

var params = {
  Destination: {
    ToAddresses: ["batistaalvesg@gmail.com"],
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "HTML_FORMAT_BODY",
      },
      Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "batistaalvesg@gmail.com",
};

var sendPromise = new AWS.SES().sendEmail(params).promise();

sendPromise
  .then(function (data) {
    console.log(data.MessageId);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
