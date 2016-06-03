import {beforeEach,
  beforeEachProviders,
  describe,
  expect,
  injectAsync,
  it,
}                               from "@angular/core/testing";
import {
  ComponentFixture,
  TestComponentBuilder,
}                               from "@angular/compiler/testing";
import { provide }              from "@angular/core";
import {
  Config,
  Form,
  IonicApp,
  NavController,
  NavParams,
  Platform,
  Events
}                               from "ionic-angular";
import { Notes }                from "./notes";
import { Utils }                from "../../services/utils";
import { NoteService }          from "../../services/note-service/note-service";

class MockClass {
  public get(): any {
    return "";
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 42;
  }

  public findAll(): any {
    return new Promise((resolve: Function) => {
      resolve([{id: 1, title: "hey", content: "test message"}]);
    });
  }

  public subscribe(topic: any, ...handlers: any[]): void {}
}

let notes: Notes = null;
let notesFixture: ComponentFixture<Notes> = null;

describe("Notes", () => {

  beforeEachProviders(() => [
    Form,
    provide(NavController, {useClass: MockClass}),
    provide(NavParams, {useClass: MockClass}),
    provide(Config, {useClass: MockClass}),
    provide(IonicApp, {useClass: MockClass}),
    provide(Platform, {useClass: MockClass}),
    provide(NoteService, {useClass: MockClass}),
    provide(Events, {useClass: MockClass})
  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(Notes)
      .then((componentFixture: ComponentFixture<Notes>) => {
        notesFixture = componentFixture;
        notes = componentFixture.componentInstance;
        notesFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it("initialises notes page", () => {
    expect(notes).not.toBeNull();
    expect(notesFixture).not.toBeNull();
  });
});
