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
