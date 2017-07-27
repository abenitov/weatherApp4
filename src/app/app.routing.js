"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const temp_details_component_1 = require("./components/tempDetails/temp-details.component");
const temp_records_component_1 = require("./components/tempRecods/temp-records.component");
const weather_dashboard_component_1 = require("./components/weatherDashboard/weather-dashboard.component");
const routes = [
    { path: "", component: weather_dashboard_component_1.WeatherDashboardComponent },
    { path: "currentTemp", component: temp_details_component_1.TempDetailsComponent },
    { path: "history", component: temp_records_component_1.TempRecordsComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map