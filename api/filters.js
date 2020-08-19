/**
 * API file to handle all the Jira API calls
 */
const request = require('request-promise');
const dotenv = require('dotenv');
const { Logger } = require('../helpers/index');
const github = require('octonode');
dotenv.config();

const client = github.client({
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD
  });

const Authorization = `Basic ${new Buffer.from(process.env.GITHUB_USERNAME + ':' + process.env.GITHUB_PASSWORD).toString('base64')}`;

/* Response changes */
listResponse = (res) => {
    const resObj = [];
    res.forEach(element => {
        resObj.push({
            'id': element.id,
            'name': element.name
        })
    });
    return resObj;
};
/* Response changes */


const GetReposList = async () => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/orgs/Seagate/repos`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
            }
        };
        const repoResponse = await request(options);
        const resConstruct = listResponse(repoResponse);
        return resConstruct;
        // client.get('/orgs/Seagate/repos', {}, function (err, status, body, headers) {
        //     console.log('data', body); //json object
        //   });
        //   console.log(repoVal);
        // return repoVal;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetTeamsList = async (opts) => {
    let geturl;
    if (opts.repoName) {
        geturl = `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/teams`;
    } else {
        geturl = `https://${process.env.GITHUB_HOST}/orgs/Seagate/teams`;
    }
    const options = {
        method: "GET",
        url: geturl,
        json: true,
        headers: {
            'User-Agent': process.env.GITHUB_USERNAME,
            'Authorization': Authorization
        }
    };
    const teamResponse = await request(options);
    const resConstruct = listResponse(teamResponse);
    return resConstruct;
};



module.exports = {
    GetReposList,
    GetTeamsList
}