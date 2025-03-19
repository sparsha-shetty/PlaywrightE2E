 const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataForLogin :
    {
        username : "anshika@gmail.com",
        password : "Iamking",
        productName : "Zara Coat 4"
    }
}

)