const sGmail=require('@sendgrid/mail')
//const sendGridApiKey='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'

sGmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail=(email,name)=>{
    
    sGmail.send({
        to:email,
        from:'tanu.muk2009@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to the app, ${name}.Let me know how you get along with the app`
    })
}

const sendCancellationEmail=(email,name)=>{
    sGmail.send({
        to:email,
        from:'tanu.muk2009@gmail.com',
        subject:'Sorry do see you go',
        text:`Goodbye, ${name}.I hope to see you back sometime soon`
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}