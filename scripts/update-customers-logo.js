const Promise = require("bluebird");
const request = require("request-promise");
const customerDomains = require("../app/data/customers");
const p = require("path");
const fs = require("fs");

const getLogoURL = domain =>
  `https://logo.clearbit.com/${domain}?size=128&greyscale=true`;

const downloadImage = customerDomain =>
  Promise.resolve()
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
          fs.writeFileSync(
            p.resolve(
              __dirname,
              "..",
              `app/img/customers/${customerDomain}.png`
            ),
            buffer
          );
        })
    );

Promise.mapSeries(customerDomains, downloadImage).then(
  () => console.log("done"),
  err => {
    console.error(err);
    process.exit(1);
  }
);
