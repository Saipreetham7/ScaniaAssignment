# ScaniaAssignment



### Assignemt Description:
- Open www.skyscanner.net
- Give origin as "Stockholm" and destination as "Everywhere" (Överallt in Swedish)
- Choose travel dates 22 Dec 2023 and return date 06 Jan 2024 and 1 adult as passenger.
- Search for flights
- Click on the first entry and see the lowest price shown there is same as the lowest price shown when clicked on the link.
- For ex : if it shows 500 SEK for Gothenburg as cheapest as first link, when clicked on the link it should show same 500 SEK as cheapest. If it shows different price, then the test case should be failed. Otherwise it should show as passed.

You can choose any open source testing tool of your choice. For Ex : selenium, playwright, webdriverIO etc

<p>Tool used for testing: <b>Playwright Automation Tool</b></p>

# Playwright

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


<h1>Results</h1>
<p>The test case we executed, will tests for the intial flight amount before clicking the link to the flight amount after clicking the link.</p>
<p>Here is the logic for comparison:</p>

```JavaScript
if (price1_extract === f_price) {
    console.log('Testcase Passed: Prices are same');
  } else {
    console.log('Testcase Failed: Prices are different, berfore and after');
}
```

<p>Here, 
  <li>if both the prices are same then we print "Testcase Passed"</li>
  <li>If they are different, we print "Testcase Failed"</li>
</p>

<p><b>Here are few screenshots of the results</b></p>
<img width="1136" alt="Screenshot 2023-12-20 at 11 53 23 AM" src="https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/e83431f6-68a1-4c0f-900e-683c070e8617">

<img width="709" alt="Screenshot 2023-12-20 at 11 53 46 AM" src="https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/24ed0026-4374-4bf0-a712-60ea9452c9e7">

<h3>Testcase Report</h3>
<img width="1350" alt="Screenshot 2023-12-20 at 11 55 04 AM" src="https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/b81bd34c-f301-425b-a954-6daf30de7425">


<h1>Challenges faced during Assignment</h1>
<p>Intially I stated, by using Selenium tool for automation but while executing the test script in Selenium, the browser is opening a Captcha and I try to slove Catcha but it appears again and again. Then I tried some methods to bypass the Captcha, but it doesn't works.</p>
<img width="500" alt="Screenshot 2023-12-18 at 6 25 48 PM" src="https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/84821cd8-fdcf-466b-b969-9c00b20c0311">
<br><br>

<p>So then I used Playwright tool, and I only used Firefox browser for testing since I found that other web browser are producing Captcha while executig test scripts. Wherein I successfully executed testcase in Firefox browser and I got Test reports where I attached a screenshot in the above section</p>

<img width="1399" alt="Screenshot 2023-12-20 at 2 28 00 PM" src="https://github.com/Saipreetham7/ScaniaAssignment/assets/70648426/31db9609-549f-4afa-9f7f-0beb9eef22fe">


