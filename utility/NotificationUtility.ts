const nodemailer = require('nodemailer');

// notification

// generate 6 digit otp with expires duration of 30 mineutes
export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    const expires = Date.now() + 30 * 60 * 1000
    return { otp, expires }

}


export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
  const accountSid = 'AC0f76312479346b415d8b6337634241e3';
  const authToken = '979c658dbb6c832dece00ef48616b65f';
  const client = require('twilio')(accountSid, authToken);
  
  const response = await client.messages
      .create({
          body: 'Your otp is ' + otp,
          from: '+16672448543',
          to: toPhoneNumber
      })
    
      return response

  }
    // send otp to the user


// payment notification or emails