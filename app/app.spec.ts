import { ADDITIONAL_TEST_BROWSER_PROVIDERS, TEST_BROWSER_STATIC_PLATFORM_PROVIDERS } from "@angular/platform-browser/testing/browser_static";
import { BROWSER_APP_DYNAMIC_PROVIDERS } from "@angular/platform-browser-dynamic";
import { resetBaseTestProviders, setBaseTestProviders } from "@angular/core/testing";
import { NotedApp } from "./app";

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    BROWSER_APP_DYNAMIC_PROVIDERS,
    ADDITIONAL_TEST_BROWSER_PROVIDERS,
  ]
);

let notedApp: NotedApp = null;

class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public close(): any {
    return true;
  }

  public setRoot(): any {
    return true;
  }
}

describe("NotedApp", () => {

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    notedApp = new NotedApp(mockClass);
  });


  it("initialises with a root page", () => {
    expect(notedApp["rootPage"]).not.toBe(null);
  });

  it("initialises with a db", () => {
    expect(notedApp["db"]).not.toBe(null);
  });

});
