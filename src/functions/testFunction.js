'use strict'

module.exports.handlerTestFunction = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!'
    })
  }
}
