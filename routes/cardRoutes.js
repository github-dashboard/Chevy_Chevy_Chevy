const express = require('express');
const router = express.Router();
const { cardsController } = require('../controllers/index');
const { Logger, Utility } = require('../helpers/index');

router.get('/rest/cards/getWatchers', async (req, res) => {
    Logger.log('info', 'get watchers');
    const opts = req.query;
    const repoList = await cardsController.GetWatchers(opts);
    res.send(repoList);
});

router.get('/rest/cards/getStargazers', async (req, res) => {
    Logger.log('info', 'get stargazers');
    const opts = req.query;
    const starList = await cardsController.GetStargazers(opts);
    res.send(starList);
});

router.get('/rest/cards/getIssues', async (req, res) => {
    Logger.log('info', 'get Issues');
    const opts = req.query;
    const issueList = await cardsController.GetIssues(opts);
    res.send(issueList);
});

router.get('/rest/cards/getCommits', async (req, res) => {
    Logger.log('info', 'get Commits');
    const opts = req.query;
    const commitList = await cardsController.GetCommits(opts);
    res.send(commitList);
});

router.get('/rest/cards/getClones', async (req, res) => {
    Logger.log('info', 'get clones');
    const opts = req.query;
    const cloneList = await cardsController.GetClones(opts);
    res.send(cloneList);
});

router.get('/rest/cards/getContributors', async (req, res) => {
    Logger.log('info', 'get contributors');
    const opts = req.query;
    const contriList = await cardsController.GetContributors(opts);
    res.send(contriList);
});

router.get('/rest/cards/getReleases', async (req, res) => {
    Logger.log('info', 'get releases');
    const opts = req.query;
    const releaseiList = await cardsController.GetReleases(opts);
    res.send(releaseiList);
});

router.get('/rest/cards/getPullRequests', async (req, res) => {
    Logger.log('info', 'get releases');
    const opts = req.query;
    const releaseiList = await cardsController.GetPullRequests(opts);
    res.send(releaseiList);
});

router.get('/rest/cards/getViewDetails', async (req, res) => {
    Logger.log('info', 'get releases');
    const opts = req.query;
    const releaseiList = await cardsController.GetViewDetails(opts);
    res.send(releaseiList);
});

router.get('/rest/cards/getEvents', async (req, res) => {
    Logger.log('info', 'get events');
    const opts = req.query;
    const releaseiList = await cardsController.GetEvents(opts);
    res.send(releaseiList);
});


module.exports = router;