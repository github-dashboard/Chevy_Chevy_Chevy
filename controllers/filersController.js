/**
 * Controller file to handle all the business logis
 */
const { Logger } = require('../helpers/index');
const { filters } = require('../api/index');

const GetTeams = async (opts) => {
    try {
        const teamsList = await filters.GetTeamsList(opts);
        return teamsList;
    } catch(exc) {
        Logger.log('error', exc);
        return exc;
    }
};

const GetRepos = async () => {
    try {
        const repoList = await filters.GetReposList();
        return repoList;
    } catch(exc) {
        Logger.log('error', exc)
        return exc;
    }
};

module.exports = {
    GetRepos,
    GetTeams
}
