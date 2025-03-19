import { test, expect } from '@playwright/test';
import { snapshot } from 'node:test';

test.describe.configure({mode: 'parallel'}); // run in parallel for each test suite. If project level mention in config file workers:2

test('@demo Login to practise page', async ({page}) =>
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
test('@demo Child window handle', async ({browser})=>
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

const newPage2 = Promise.all([

    context.waitForEvent('page'),
    documentLink.click(),

])

    console.log(await newPage.locator(".red").textContent());
});


    test('@spl Playwright special locatrors', async({page}) =>
    {
        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        await page.getByLabel("Check me out if you Love IceCreams!").check();
        await page.getByLabel("Gender").selectOption("Female");
        await page.getByLabel("Employed").click();
        await page.getByPlaceholder("Password").fill("Password");
        await page.getByRole("button", {name: 'Submit'}).click();

        await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
        await page.getByRole("link",{name : "Shop"}).click();

        await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
       
        //handdle alert pop ups

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.goBack();
        await page.goForward();

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await page.screenshot({path: 'Clickedimage.png'});
        expect (await page.screenshot()).toMatchSnapshot
        await page.pause();
        page.on('dialog', dialog => dialog.dismiss());
        await page.locator("#confirmbtn").click();

        page.close();

    }); 

    test('Visual regression case',async ({page})=>
    {

        await page.goto("https://www.flightaware.com");
        expect (await page.screenshot()).toMatchSnapshot('flightpage.png');


    })