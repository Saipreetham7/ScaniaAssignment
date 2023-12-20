# ScaniaAssignment

<p>Tool used for testing: <b>Playwright Automation Tool</b></p>

<p>Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.</p>

## Installation

Playwright has its own test runner for end-to-end tests, we call it Playwright Test.

### Using init command

The easiest way to get started with Playwright Test is to run the init command.

```Shell
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

This will create a configuration file, optionally add examples, a GitHub Action workflow and a first test example.spec.ts. You can now jump directly to writing assertions section.

### Manually

Add dependency and install browsers.

```Shell
npm i -D @playwright/test
# install supported browsers
npx playwright install
```
##Process

<p>Step1 : Go to > <b>tests</b> folder and create a new test file with <b>.spec.js</b> extension to add test script.</p>
<p>Step 2: Add the following script and save the file</p>

```Javascript
const { test, expect } = require('@playwright/test');

test('My first test', async ({ page }) => {
  await page.goto('https://www.skyscanner.se/');
  await page.pause();

  console.log('Hello World Welcome to skyscanner');
  await page.getByText('Ok', { exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Ange den stad du flyger ifrån' })
    .click();
  await page
    .getByRole('combobox', { name: 'Ange den stad du flyger ifrån' })
    .fill('stoc');
  await page.getByText('Stockholm Arlanda (ARN)').click();
  await page
    .getByRole('combobox', { name: '. Ange din destination eller' })
    .click();
  await page.getByRole('button', { name: 'Utforska överallt' }).click();
  await page.getByLabel('fredag 22 december 2023. Välj').click();
  await page.getByLabel('lördag 6 januari 2024. Välj').click();
  await page.getByTestId('traveller-button').click();
  await page.getByLabel('VuxnaÖver 16 år').click();
  await page
    .getByTestId('desktop-travellerselector')
    .getByRole('button', { name: 'Sök' })
    .click();
  await page
    .getByRole('link', { name: 'Direktflyg till Sverige från' })
    .click();

  const page1Promise = page.waitForEvent('popup');

  await page
    .locator('.BpkBackgroundImage_bpk-background-image__img__NDhjM')
    .first()
    .click();

  const page1 = await page1Promise;

  const price1 = await page1
    .getByRole('button', {
      name: 'Flygalternativ 2: Total',
    })
    .textContent();
  const myArray = price1.split(' ');
  const price1_extract = myArray[4] + ' ' + myArray[5].substring(0, 3);
  console.log(`Price of Flight in first link : ${price1_extract}`);

  await page1
    .getByRole('button', { name: 'Flygalternativ 2: Total' })
    .getByRole('button')
    .click();

  const first_price = await page1
    .getByTestId('pricing-item-container')
    .getByText('SEK');
  const f_price = await first_price.textContent();
  console.log(`Price of Flight after clicking the first link: ${f_price}`);

  if (price1_extract === f_price) {
    console.log('Testcase Passed: Prices are same');
  } else {
    console.log('Testcase Failed: Prices are different, berfore and after');
  }
});
```

<p>Step 3: Now open the terminal and execute the following command to run the test case we created above.</p>

```Shell
npx playwright test ./tests/test1.spec.js --project firefox --headed
```
<p><b>Here is a recored video of execution of the test case</b></p>

https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/999c3662-56ac-452b-ba61-504bc7c4da71
