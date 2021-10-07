const { Given, When, Then, setDefaultTimeout } = require("cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
require("chromedriver");
// setDefaultTimeout(90 * 1000);

Given("I am on the {string} page", async function (string) {
  this.driver = new Builder()
  .forBrowser("chrome")
  .build();
  await this.driver.get(`https://the-internet.herokuapp.com/${string}`); // alt + 96
});

When("I login with {string} and {string}", function (string, string2) {
  this.driver.findElement(By.id("username")).sendkeys(string);
  this.driver.findElement(By.id("password")).sendkeys(string2);
  this.driver.findElement(By.className("radius")).click();
});

Then("I should see a message saying {string}", async function (string) {
  await this.driver.wait(until.elementLocated(By.id("flash")));
  let message = await this.driver.findElement(By.id("flash")).getText();
  assert.equal(string, message.substring(0, message.indexOf("!") + 1));
});
