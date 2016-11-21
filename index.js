'use strict';

const ImagesClient = require('google-images');
const request = require('request-promise');
const nconf = require('nconf').argv().env().file({ file: './config.json' });

module.exports = {
    handler: handler
};

const client = new ImagesClient(nconf.get('GOOGLE_CUSTOM_SEARCH_ENGINE_ID'), nconf.get('GOOGLE_API_KEY'));
const slackWebHook = nconf.get('SLACK_WEB_HOOK');

function handler(event, context) {
    getImgUrlFromSearch(nconf.get('QUERY_STRING'))
    .then(postImageToSlack)
    .then(() => context.succeed())
    .catch(err => {
        console.error(err);
        context.fail(err);
    });
}

function postImageToSlack(imgUrl) {
    // console.log('Posting to Slack', imgUrl);

    var options = {
        method: 'POST',
        uri: slackWebHook,
        body: { text: imgUrl },
        json: true
    };

    return request(options);
}

function getImgUrlFromSearch(searchString) {
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const pagesPromises = pages.map(pageNum => client.search(searchString, {page: pageNum}));

    return Promise.all(pagesPromises).then(function (pageResult) {
        let allImages = [];

        pageResult.forEach(images => {
            allImages = allImages.concat(images);
        });

        const rnd = Math.floor(Math.random() * 100);

        // console.log('Finding image %s out of %s', rnd, allImages.length);

        const url = allImages[rnd].url;
        return url;
    });
}
