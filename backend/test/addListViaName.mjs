import chai from "chai";
import request from "supertest";
import { app, server } from "../app.mjs";

const expect = chai.expect;

describe("addListViaName", () => {
  it("correctly returns not existing route", (done) => {
    request(app)
      .get("/1231312313")
      .then((res) => {
        expect(res.body).to.eql({
          status: 404,
        });
        done();
      });
  });
});
