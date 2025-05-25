const { Builder, By, until } = require('selenium-webdriver'); // Import necessary modules from selenium-webdriver

// Asynchronous function to perform login test
async function loginTestSKR() {
    // Create a new WebDriver instance for Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get("http://localhost:3000/loginSKR");

        // Fill in the username and password fields
        await driver.findElement(By.id('usernameSKR')).sendKeys('user');
        await driver.findElement(By.id('passwordSKR')).sendKeys('pass');

        // Click the login button
        await driver.findElement(By.id('login-button')).click();

        // Wait until the URL changes to the expected page after successful login
        await driver.wait(until.urlIs('http://localhost:3000/recipeSKR'), 5000);

        // Print a success message if the test passes
        console.log("Login test passed!!!");
    } catch (error) {
        // Print an error message if the test fails
        console.error("Login test failed", error);
    } finally {
        // Quit the WebDriver session regardless of the test result
        await driver.quit();
    }
}

// Call the loginTestSKR function to execute the test
loginTestSKR();
