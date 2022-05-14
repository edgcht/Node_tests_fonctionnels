const assert = require('assert')
const { When, Then, Given } = require('@cucumber/cucumber')
const supertest = require('supertest')
const client = supertest(require('../../app'))
const { expect } = require("expect");


let token;

function transformJson(params) {
    let items = {};
    for (let item in params) {
        for (let value in params[item]) {
            items[params[item][value][0]] = params[item][value][1];
        }
    }
    const jsonString = JSON.stringify(Object.assign({}, items))
    return JSON.parse(jsonString);
}

Given('I have parameters', function (params) {
    this.json = transformJson(params)
});

When("I request {string} {string} with parameters", async function (method, path) {
    this.request = client[method.toLowerCase()](path).set(
        {
            "Content-Type": "application/json",
        }
    );
    this.response = await this.request.send(this.json);
});

Given('I am log as admin', async function () {
    this.request = client.post("/v1/users/login").set(
        "Content-Type",
        "application/json"
    );
    const response = await this.request.send({"email" : "antoine@gmail.com", "password" : "123456"});

    this.token = response.body.access_token;
    console.log(this.token)
});

Given('I am log as user', async function () {
    this.request = client.post("/v1/users/login").set(
        "Content-Type",
        "application/json"
    );
    const response = await this.request.send({"email" : "antoine@gmail.com", "password" : "123456"});

    this.token = response.body.access_token;
});

When("I request {string} {string}", async function (method, path) {
    this.request = client[method.toLowerCase()](path).set(
        {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.token
        }
    );
    this.response = await this.request.send();

});


Then("I should receive a {int} status code", function (int) {
    expect(this.response.status).toBe(int);
});