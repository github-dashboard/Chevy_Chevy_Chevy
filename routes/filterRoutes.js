const express = require('express');
const router = express.Router();
const { filtersController } = require('../controllers/index');
const { Logger, Utility } = require('../helpers/index');

router.get('/rest/filters/getRepos', async (req, res) => {
    Logger.log('info', 'Initializing repos');
    let repoList = await filtersController.GetRepos();
    res.send(repoList);
});

router.get('/rest/filters/getTeams', async (req, res) => {
    Logger.log('info', 'Initializing repos');
    const opts = req.query;
    let teamList = await filtersController.GetTeams(opts);
    res.send(teamList);
});



module.exports = router;