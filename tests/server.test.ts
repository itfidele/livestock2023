import request from "supertest";
import { app } from "../src/app";
import { expect } from "chai";


describe("Server", () => {
    it("Homepage is returning 200 status", (done) => {
        request(app.callback()).get("/")
        .expect(200)
        .end(done);
    });
});