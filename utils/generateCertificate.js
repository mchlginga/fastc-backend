const fs = require("fs/promises");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");

const PATHS = require("./paths");
const { ensureDirExist } = require("./ensureDirExist");

const generateCertificate = async (data) => {
    ensureDirExist(PATHS.certHbsFile);

    const templatePath = PATHS.certHbsFile;
    const templateHtml = await fs.readFile(templatePath, "utf-8");

    const template = Handlebars.compile(templateHtml);
    const html = template(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({ format: "A4", landscape: true });

    await browser.close();
    return pdfBuffer;

};

module.exports = generateCertificate;