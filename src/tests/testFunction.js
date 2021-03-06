/* eslint-env mocha */
'use strict'

// tests for testFunction
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha')
const dirtyChai = require('dirty-chai')
mochaPlugin.chai.use(dirtyChai)
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('testFunction', '../../../src/functions/testFunction.js', 'handlerTestFunction')
let AWS = require('aws-sdk-mock')
let AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

describe('testFunction', () => {
  before((done) => {
    done()
  })

  it('implement tests here', () => {
    return wrapped.run({}).then((response) => {
      expect(response).to.not.be.empty()
    })
  })
})
