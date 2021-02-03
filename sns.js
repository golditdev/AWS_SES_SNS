const aws = require('aws-sdk');
const REGION = 'REGION';

const supportEmail = 'xxxx@gmail.com';
const emailKey = 'email'
const smsKey = 'text'

const ses = new aws.SES({apiVersion: '2010-12-01'});
const sns = new aws.SNS({apiVersion: '2010-03-31'});

// Send emails to the [destinated address]
const publishEmail = async (toAddresses, title, message) => {
   var eParams = {
      Destination: {
         ToAddresses: toAddresses
      },
      Message: {
         Body: {
            Text: {
               Charset: 'UTF-8',
               Data: message
            }
         },
         Subject: {
            Charset: 'UTF-8',
            Data: title
         }
      },
      Source: supportEmail
   };
   console.log('===SENDING EMAIL===>' + toAddresses);

   // Create SES service object
   try {
        const data = await ses.sendEmail(eParams).promise();
        console.log('Email was sent')
    } catch(err) {
        console.log(err, err.stack);
    }
}

// Send sms to 'toPhone'
const publishSms = async (toPhone, title, message) => {
   var smsMsg = title + '\n' + message
   console.log("smsMsg.", smsMsg);
   
   var params = {
      Message: smsMsg,
      PhoneNumber: toPhone,
   };

   try {
      const data = await sns.publish(params).promise();
      console.log('SMS was sent to the ', toPhone)
   } catch(err) {
      console.log(err, err.stack);
   }
}

module.exports = {
  publishEmail,
  publishSms,
}
