/* eslint-disable no-console */
const fse = require('fs-extra')
const POSTCONFIG = require('../post.config')
const customFetcher = require('./dataFetcher')

const getData = async () => {
  const dataToWrite = {
    content: [],
  } // creates an empty array of content to stringify
  for (const doc of POSTCONFIG.docs) {
    const data = await customFetcher(doc.id)
    // We fetch our Google Doc id, hence why we await for the dataFetcher to finish gathering and converting everything to sanitized objects ready to be used
    dataToWrite.content.push(data)
  }
  console.log('DATTT___-->', dataToWrite)

  if (dataToWrite) {
    fse.outputFile(POSTCONFIG.dataPath, JSON.stringify(dataToWrite))
  }
}

getData()
// Writes our newly fetched information to a data.json in 'data/'