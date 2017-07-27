describe("App", function () {

  beforeEach(function () {
    browser.get("/");
  });

  it("should have a title", function () {
    expect(browser.getTitle()).toEqual("App");
  });

  it("should have <header>", function () {
    expect(element(by.css("app header")).isPresent()).toEqual(true);
  });

  it("should have <main>", function () {
    expect(element(by.css("app main")).isPresent()).toEqual(true);
  });

  it("should have a main title", function () {
    expect(element(by.css("main h1")).getText()).toEqual("Weather App");
  });

  it("should have <footer>", function () {
    expect(element(by.css("app footer")).isPresent()).toEqual(true);
  });

  it("should have <temp-details>", function () {
    expect(element(by.css("app temp-details")).isPresent()).toEqual(true);
  });

  it("should have <temp-records>", function () {
    expect(element(by.css("app temp-records")).isPresent()).toEqual(true);
  });

});
