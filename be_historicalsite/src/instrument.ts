// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"

Sentry.init({
  dsn: "https://470d44468c76b62c6a192144399ae70b@o4509390085292032.ingest.us.sentry.io/4509390087323649",
  sendDefaultPii: true,
});