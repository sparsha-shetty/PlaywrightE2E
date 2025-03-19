import {test, expect} from '@playwright/test'
import { LoginPage } from '../pageobjects/loginpage';
import {customtest} from '../Utils/testbase';

const dataset = JSON.parse(JSON.stringify(require("../Utils/placeordertestdata.json")));


customtest(`Client add  order to cart`, async({browser,testDataForLogin}) =>
{
   // const email = "anshika@gmail.com";
   // const pwd = "Iamking@000";
   //  const productName = 'ZARA COAT 3';

    const context = await browser.newContext();
    const page = await context.newPage();
    const products = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    const loginpage = new LoginPage(page);

    loginpage.validLogin(testDataForLogin.username,testDataForLogin.password);
   //  await page.fill('#userEmail', email);
   //  await page.fill('#userPassword',pwd );
   //  await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    (await context).storageState({path: 'state.json'});
    // when you are trying get list of items from page
    //  and if there are multiple API calls invoked we 
    // wait till all the network calls are invoked so that it doesn't return empty list

    const titles = await page.locator(".card-body b").allTextContents();
    console.log('Titles of the product ',titles);

    const count = await products.count();

    for(let i = 0; i<count ; ++i)
    {
        if(await products.nth(i).locator("b").textContent() == testDataForLogin.productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(testDataForLogin.username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();// click view buutton of that order id
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

  //page.close();
 


}
)