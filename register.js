const { remote } = require('webdriverio');
const { USERNAME_FIELD, PASSWORD_FIELD, SUBMIT_BUTTON,
    SCHEDULE_BUTTON, WORKLIST, REGISTER_ALL_BUTTON } = require('./constants.js');

(async () => {
    const browser = await remote({
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome'
        },
    })

    await browser.url(process.env.SITE_URL)

    const userNameInputElem = await browser.$(USERNAME_FIELD)
    await userNameInputElem.setValue(process.env.SSC_USERNAME)

    const passwordInputElem = await browser.$(PASSWORD_FIELD)
    await passwordInputElem.setValue(process.env.SSC_PASSWORD)

    const submitBtn = await browser.$(SUBMIT_BUTTON)
    await submitBtn.click()

    const courseSchedule = await browser.$(SCHEDULE_BUTTON)
    await courseSchedule.click()

    await browser.switchWindow(process.env.SITE_WINDOW_TITLE)

    const worklist = await browser.$(WORKLIST)
    await worklist.click()

    const registerAll = await browser.$(REGISTER_ALL_BUTTON)
    await registerAll.click()

    await browser.pause(10000)
    await browser.deleteSession()
})().catch((e) => {
    console.error(e)
    browser.deleteSession()
})
