const Promise = require("bluebird");
const request = require("request-promise");
const customerDomains = require("../app/data/customers");
const p = require("path");
const fs = require("fs");

const getLogoURL = domain =>
  `https://logo.clearbit.com/${domain}?size=128&greyscale=true`;

const getLogoPath = domain =>
  p.resolve(__dirname, "..", `app/img/customers/${domain}.png`);

const downloadImage = customerDomain =>
  fs.existsSync(getLogoPath(customerDomain))
    ? Promise.resolve().tap(() =>
        console.log("Already downloaded %s...", getLogoURL(customerDomain))
      )
    : Promise.resolve()
        .tap(() => console.log("Downloading %s...", getLogoURL(customerDomain)))
        .then(() =>
          Promise.resolve(
            request({
              method: "GET",
              uri: getLogoURL(customerDomain),
              encoding: null,
              headers: {
                "User-Agent": "https://www.image-charts.com"
              }
            })
          )
            .tap(() => console.log("Downloaded %s logo", customerDomain))
            .then(function(res) {
              const buffer = Buffer.from(res, "utf8");
              fs.writeFileSync(getLogoPath(customerDomain), buffer);
            })
        );

Promise.mapSeries(customerDomains, downloadImage).then(
  () => console.log("done"),
  err => {
    console.error(err);
    process.exit(1);
  }
);
