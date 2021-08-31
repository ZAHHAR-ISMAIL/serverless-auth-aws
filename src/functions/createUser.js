'use strict';
const AWS = require('aws-sdk')
const Responses = require('../services/response');
const Dynamo = require('../services/dynamo');
const bcrypt = require('bcryptjs')
const tableName = process.env.DYNAMODB_USER_TABLE

module.exports.createUser = async (event, context) => {
  const body = JSON.parse(event.body)
  if (!body.username || !body.password) {
    return Responses._400({ message: 'IT: missing parameters in in REQUEST' });
  }

  const Data = await Dynamo.insert({
    data: {
      pk: body.username,
      password: bcrypt.hashSync(body.password, 10) // if you want to crypt the psswd
      // password: body.password
    },
    tableName

  });

  return Responses._200(Data);


};