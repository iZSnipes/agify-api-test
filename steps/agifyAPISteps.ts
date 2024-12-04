import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';

let apiUrl: string;
let response: any;

Given('the API endpoint is {string}', function (url: string) {
  apiUrl = url;
});

When('I query with the name {string}', async function (name: string) {
  try {
    response = await axios.get(`${apiUrl}?name=${name}`);
  } catch (error: any) {
    response = error.response;
  }
});

When('I query with an empty name', async function () {
  try {
    response = await axios.get(`${apiUrl}?name=`);
  } catch (error: any) {
    response = error.response;
  }
});

When('I query with the parameters:', async function (dataTable) {
  const params: { [key: string]: string } = {};
  dataTable.rawTable.forEach(([key, value]: [string, string]) => {
    params[key] = value.replace(/^"(.*)"$/, '$1'); // Remove quotes from the value
  });

  try {
    response = await axios.get(apiUrl, { params });
  } catch (error: any) {
    response = error.response;
  }
});

Then('the response should include {string} as {string}', function (key: string, value: string) {
  expect(response.data[key]).to.equal(value);
});

Then('the response should include {string} as {string} when limit is reached', function (key: string, value: string) {
  expect(response?.data?.[key]).to.equal(value, `Expected '${key}' to be '${value}', but got '${response?.data?.[key]}'`);
});

Then('the response should include {string} as {int}', function (key: string, value: number) {
  expect(response.data[key]).to.equal(value);
});

Then('the response should include {string} as null', function (key: string) {
  expect(response.data[key]).to.be.null;
});

Then('the response should include {string} as a number', function (key: string) {
  expect(response.data[key]).to.be.a('number');
});

Then('the response status should be {int}', function (statusCode: number) {
  expect(response.status).to.equal(statusCode);
});

Then('the response should include the header {string} as {string}', function (headerKey: string, headerValue: string) {
  expect(response.headers[headerKey.toLowerCase()]).to.equal(headerValue);
});

Then('the response time should be less than {int} milliseconds', function (time: number) {
  expect(response.duration).to.be.lessThan(time);
});