/**
 * Controller file to handle all the business logis
 */
const { Logger } = require('../helpers/index');
const { cards } = require('../api/index');

const GetWatchers = async (opts) => {
    try {
        const watchersList = await cards.GetWatchersList(opts);
        return watchersList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetStargazers = async (opts) => {
    try {
        const stargazersList = await cards.GetStargazersList(opts);
        return stargazersList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetIssues = async (opts) => {
    try {
        const issuesList = await cards.GetIssuesList(opts);
        return issuesList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetCommits = async (opts) => {
    try {
        const commitsList = await cards.GetCommitsList(opts);
        return commitsList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetClones = async (opts) => {
    try {
        const clonesList = await cards.GetClonesList(opts);
        return clonesList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetContributors = async (opts) => {
    try {
        const contriList = await cards.GetContributorsList(opts);
        return contriList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetReleases = async (opts) => {
    try {
        const releaseList = await cards.GetReleasesList(opts);
        return releaseList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetPullRequests = async (opts) => {
    try {
        const prList = await cards.GetPRList(opts);
        return prList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetViewDetails = async (opts) => {
    try {
        const viewList = await cards.GetViewList(opts);
        return viewList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

const GetEvents = async (opts) => {
    try {
        const eventList = await cards.GetEventsList(opts);
        return eventList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

module.exports = {
    GetWatchers,
    GetStargazers,
    GetIssues,
    GetCommits,
    GetClones,
    GetContributors,
    GetReleases,
    GetPullRequests,
    GetViewDetails,
    GetEvents
}
