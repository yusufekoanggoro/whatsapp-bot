const logger = require('../../../../helpers/utils/logger');
const { dockStart } = require('@nlpjs/basic');

const nlp = async (message) => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./bin/helpers/dataset/corpus/id/corpus.json');
  await nlp.addCorpus('./bin/helpers/dataset/corpus/en/agent.json');
  await nlp.train()
  const response = await nlp.process('id', message);
  return response.answer;
}


module.exports = {
  nlp
};
