class LoginPage {

    constructor(page){
       
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("#login");
    }

    async validLogin(email,pwd){
        await this.username.fill(email);
        await this.password.fill(pwd);
        await this.signInbutton.click();
    }

}

module.exports = {LoginPage};