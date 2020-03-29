const express = require('express');
const twitterClient = require('./twitter.js');
const request = require('request');
const moment = require('moment');
const CronJob = require('cron').CronJob;



const ApiUrl = 'https://coronavirus-19-api.herokuapp.com'
const port = process.env.YOUR_PORT || process.env.PORT || 3000;
const host = process.env.YOUR_HOST || '0.0.0.0';

const app = express();

app.listen(port, host, function () {
    console.log(`Aplicação online. Porta: ${port}, Host: ${host}`);
    console.log('\n\n\n');
});

tweetDataWorld = () => {
    request.get(`${ApiUrl}/all`, {json: true} ,(error, res, body) => {
        tweet = `${moment().format('DD/MM/YY').toString()}, COVID-19 no mundo. \n\nCasos confirmados: ${body.cases} \n\nRecuperados: ${body.recovered} \n\nMortes: ${body.deaths}`
        console.log(tweet, '\n\n ---------------------- \n\n')
        twitterClient.tweet(tweet)
    })
}

tweetDataBr = () => {
    request.get(`${ApiUrl}/countries/brazil`, {json: true} ,(error, res, body) => {
        tweet = `${moment().format('DD/MM/YY').toString()}, COVID-19 no Brasil. \n\nCasos confirmados: ${body.cases} \n\nRecuperados: ${body.recovered} \n\nMortes: ${body.deaths}`
        console.log(tweet, '\n\n ---------------------- \n\n')
        twitterClient.tweet(tweet)
    })
}

jobStopped = () => {
    console.log("Cron job stopped!")
}

//Roda todo dia às 13:40:00
// var job = new CronJob('00 */2 * * * *', tweetDataBr, jobStopped, true, 'America/Sao_Paulo');
// job.start();

var jobBrazil = new CronJob('00 9,14,19 * * * *', tweetDataWorld, jobStopped, true, 'America/Sao_Paulo');
jobBrazil.start();

var jobWorld = new CronJob('00 8,15,20 * * * *', tweetDataBr, jobStopped, true, 'America/Sao_Paulo');
jobWorld.start();


