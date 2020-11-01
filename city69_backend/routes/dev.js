const express = require('express');
const router = express.Router();
const stat_gibdd = require('../integrations/stat_gibdd');
const IndicatorRepository = require('../database/models/Indicator/IndicatorRepository');
const ProviderRepository = require('../database/models/Indicator/IndicatorProviderRepository');
const records = [];


router.get('/gibdd', ((req, res) => {
  stat_gibdd(["1"], "MONTHS:9.2020", ["71140"], ["71171"], 
    (result) => res.send(result)
  );
}))

router.get('/report/:provider/:city', async (req, res, next) => {
  const providerId = req.params.provider;
  const cityId =  req.params.city;
  const provider = await ProviderRepository.getOne(providerId);

  const headers = ['дата'].concat(provider.parameters).join(';');
  const indicators = await IndicatorRepository.getByCityAndProvider(cityId, providerId)
  const joined = indicators.map(item => dateToString(item.date) + ';' + item.values.join(';')).join('\r\n');

  res.set('Content-Type', 'text/csv;charset=utf-8');
  res.send(headers + '\r\n' + joined);
});


const dateToString = function(date) {
  return `${date.getDate() - 1}.${date.getMonth() + 1}.${date.getFullYear()}`
};

module.exports = router;