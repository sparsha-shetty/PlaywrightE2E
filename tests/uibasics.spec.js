import { test, expect } from '@playwright/test';

test('Login to practise page', async ({page}) =>
{
 await page.goto("https://rahulshettyacademy.com/client");
 console.log(await page.title());
 await page.locator("#userEmail").fill("sparsha.seetharam@gmail.com");
 await page.locator("#userPassword").fill("Shetty@89");
 await page.locator("#login").click();
 await page.locator(".card-body b").first().waitFor();
 const titles = await page.locator(".card-body b").allTextContents();
 console.log(titles); 
 
});



//handling child windows (multi tabs)
test('Child window handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("")
    // await page.locator(("#signInBtn").click();
    const documentLink = page.locator("[href*='documents-request']");
   
    const [newPage] = await Promise.all([
    
    context.waitForEvent('page'), //listen for new page with pending,rejected,fulfilled state
    documentLink.click(),
    ])

    console.log(await newPage.locator(".red").textContent());

    
    
})