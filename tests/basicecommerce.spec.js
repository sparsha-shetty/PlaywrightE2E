import {test, expect} from '@playwright/test'

test.only('Add order to cart' , async({page}) =>
{
    const email = "anshika@gmail.com";
    const pwd = "Iamking@000";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.fill('#userEmail', email);
    await page.fill('#userPassword',pwd );
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    // when you are trying get list of items from page
    //  and if there are multiple API calls invoked we 
    // wait till all the network calls are invoked so that it doesn't return empty list

    const titles = await page.locator(".card-body b").allTextContents();
    console.log('Titles of the product ',titles);

    const count = await products.count();

    for(let i = 0; i<count ; ++i)
    {
        if(await products.nth(i).locator("b").textContent() == productName)
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
 
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 


}
)