const util = require('util')
const database = require('../database')

module.exports = {
    asyncQuery : util.promisify(database.query).bind(database)
}