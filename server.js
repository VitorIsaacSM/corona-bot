const express = require('express');
const twitterClient = require('./twitter.js');
const request = require('request');
const moment = require('moment-timezone');
const CronJob = require('cron').CronJob;


const timezone = 'America/Sao_Paulo';
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
        tweet = `${moment().tz(timezone).format('DD/MM/YY HH:mm')}, COVID-19 no mundo. \n\nCasos confirmados: ${body.cases} \n\nRecuperados: ${body.recovered} \n\nMortes: ${body.deaths}`;
        twitterClient.tweet(tweet)
    })
}

tweetDataBr = () => {
    request.get(`${ApiUrl}/countries/brazil`, {json: true} ,(error, res, body) => {
        tweet = `${moment().tz(timezone).format('DD/MM/YY HH:mm')}, COVID-19 no Brasil. \n\nCasos confirmados: ${body.cases} \n\nRecuperados: ${body.recovered} \n\nMortes: ${body.deaths}`;
        console.log(tweet);
        twitterClient.tweet(tweet)
    })
}

jobStopped = () => {
    console.log("Cron job stopped!");
}

const jobWorld = new CronJob('00 00 9,16,21 * * *', tweetDataWorld, jobStopped, true, timezone);
jobWorld.start();

const jobBrazil = new CronJob('00 00 8,15,20 * * *', tweetDataBr, jobStopped, true, timezone);
jobBrazil.start();
