/**
 * API file to handle all the Jira API calls
 */
const request = require('request-promise');
const dotenv = require('dotenv');
const { Logger } = require('../helpers/index');
dotenv.config();

const Authorization = `Basic ${new Buffer.from(process.env.GITHUB_USERNAME + ':' + process.env.GITHUB_PASSWORD).toString('base64')}`;

/* Response changes */
listResponseCards = (res) => {
    const resObj = {
        count: res.length
    };
    return resObj;
};

listContributors = (res) => {
    const anonym = res.filter(el => el.type === 'Anonymous');
    const contributors = {
        total: res.length,
        external: anonym.length,
        internal: res.length - anonym.length
    }
    return contributors;
};

listIssues = (res) => {
    const open = res.filter(el => el.state === 'open');
    const issues = {
        total: res.length,
        open: open.length,
        close: res.length - open.length
    }
    return issues;
};

listPRresponse = (res) => {
    const open = res.filter(el => el.state === 'open');
    const merged = res.filter(el => el.merged_at !== null);
    const prs = {
        totalpr: res.length,
        openpr: open.length,
        closepr: res.length - open.length,
        mergedpr: merged.length
    }
    return prs;
};

listViewsresponse = (res) => {
    const views = {
        visits: res.count,
        visitors: res.uniques
    }
    return views;
};

listActions = (res) => {
    let payloads = [];
    res.forEach(element => {
        payloads.push(element.payload)
    });
    return payloads;
};
/* Response changes */

const GetWatchersList = async (opts) => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/subscribers`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
            }
        };
        const watchersResponse = await request(options);
        const resConstruct = listResponseCards(watchersResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetStargazersList = async (opts) => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/stargazers`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const starResponse = await request(options);
        const resConstruct = listResponseCards(starResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetIssuesList = async (opts) => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/issues`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const issueResponse = await request(options);
        const resConstruct = listIssues(issueResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetCommitsList = async (opts) => {
    let geturl = `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/commits`;
    if (opts.since) {
        geturl += `?since=${opts.since}`;
    }
    try {
        const options = {
            method: "GET",
            url: geturl,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const commitResponse = await request(options);
        const resConstruct = listResponseCards(commitResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetClonesList = async (opts) => {
    const options = {
        method: "GET",
        url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/traffic/clones`,
        json: true,
        headers: {
            'User-Agent': process.env.GITHUB_USERNAME,
            'Authorization': Authorization
            // 'Accept': 'application/vnd.github.v3.star+json'
        }
    };
    const cloneList = await request(options);
    const resConstruct = {
        uniques: cloneList.uniques
    };
    return resConstruct;
};

const GetContributorsList = async (opts) => {
    let geturl = `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/contributors?anon=true`;
    try {
        const options = {
            method: "GET",
            url: geturl,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const contriResponse = await request(options);
        const resConstruct = listContributors(contriResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetReleasesList = async (opts) => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/releases`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const releaseResponse = await request(options);
        const resConstruct = listResponseCards(releaseResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetPRList = async (opts) => {
    try {
        const options = {
            method: "GET",
            url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/pulls`,
            json: true,
            headers: {
                'User-Agent': process.env.GITHUB_USERNAME,
                'Authorization': Authorization
                // 'Accept': 'application/vnd.github.v3.star+json'
            }
        };
        const releaseResponse = await request(options);
        const resConstruct = listPRresponse(releaseResponse);
        return resConstruct;
    } catch(exc) {
        Logger.log('error', exc);
        throw new Error(exc);
    }
};

const GetViewList = async (opts) => {
    const options = {
        method: "GET",
        url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/traffic/views`,
        json: true,
        headers: {
            'User-Agent': process.env.GITHUB_USERNAME,
            'Authorization': Authorization
            // 'Accept': 'application/vnd.github.v3.star+json'
        }
    };
    const viewsResponse = await request(options);
    const resConstruct = listViewsresponse(viewsResponse);
    return resConstruct;
};

const GetEventsList = async (opts) => {
    const options = {
        method: "GET",
        url: `https://${process.env.GITHUB_HOST}/repos/Seagate/${opts.repoName}/events?per_page=1000`,
        json: true,
        headers: {
            'User-Agent': process.env.GITHUB_USERNAME,
            'Authorization': Authorization
            // 'Accept': 'application/vnd.github.v3.star+json'
        }
    };
    const eventsResponse = await request(options);
    // const resConstruct = listActions(eventsResponse);
    return eventsResponse;
};

module.exports = {
    GetWatchersList,
    GetStargazersList,
    GetIssuesList,
    GetCommitsList,
    GetClonesList,
    GetContributorsList,
    GetReleasesList,
    GetPRList,
    GetViewList,
    GetEventsList
}