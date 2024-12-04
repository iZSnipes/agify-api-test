"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
let apiUrl;
let response;
(0, cucumber_1.Given)('the API endpoint is {string}', function (url) {
    apiUrl = url;
});
(0, cucumber_1.When)('I query with the name {string}', async function (name) {
    try {
        response = await axios_1.default.get(`${apiUrl}?name=${name}`);
    }
    catch (error) {
        response = error.response;
    }
});
(0, cucumber_1.When)('I query with an empty name', async function () {
    try {
        response = await axios_1.default.get(`${apiUrl}?name=`);
    }
    catch (error) {
        response = error.response;
    }
});
(0, cucumber_1.When)('I query with the parameters:', async function (dataTable) {
    const params = {};
    dataTable.rawTable.forEach(([key, value]) => {
        params[key] = value.replace(/^"(.*)"$/, '$1'); // Remove quotes from the value
    });
    try {
        response = await axios_1.default.get(apiUrl, { params });
    }
    catch (error) {
        response = error.response;
    }
});
(0, cucumber_1.Then)('the response should include {string} as {string}', function (key, value) {
    (0, chai_1.expect)(response.data[key]).to.equal(value);
});
(0, cucumber_1.Then)('the response should include {string} as {string} when limit is reached', function (key, value) {
    (0, chai_1.expect)(response?.data?.[key]).to.equal(value, `Expected '${key}' to be '${value}', but got '${response?.data?.[key]}'`);
});
(0, cucumber_1.Then)('the response should include {string} as {int}', function (key, value) {
    (0, chai_1.expect)(response.data[key]).to.equal(value);
});
(0, cucumber_1.Then)('the response should include {string} as null', function (key) {
    (0, chai_1.expect)(response.data[key]).to.be.null;
});
(0, cucumber_1.Then)('the response should include {string} as a number', function (key) {
    (0, chai_1.expect)(response.data[key]).to.be.a('number');
});
(0, cucumber_1.Then)('the response status should be {int}', function (statusCode) {
    (0, chai_1.expect)(response.status).to.equal(statusCode);
});
(0, cucumber_1.Then)('the response should include the header {string} as {string}', function (headerKey, headerValue) {
    (0, chai_1.expect)(response.headers[headerKey.toLowerCase()]).to.equal(headerValue);
});
(0, cucumber_1.Then)('the response time should be less than {int} milliseconds', function (time) {
    (0, chai_1.expect)(response.duration).to.be.lessThan(time);
});
