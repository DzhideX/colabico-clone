import chai from "chai";
import request from "supertest";
import { app, server } from "../app.mjs";
import { Users, Todos, Lists } from "../config/models.mjs";

const expect = chai.expect;

describe("Backend routes tests", () => {
  let testData = {
    id: "432f892f-e0ac-48f5-9b52-4ad2a1fbe8ea", // both user id and list id
    listname: "TEST LISTNAME",
    todoValue: "TEST TODO",
  };

  before(() => {
    Lists.create({
      name: testData.listname,
      id: testData.id,
      user_id: testData.id,
    }).then((listsResponse) => {
      Todos.create({
        value: testData.todoValue,
        state: "pending",
        id: testData.id,
        list_id: testData.id,
      });
    });
  });

  after(() => {
    // FIND ALL LISTS
    Lists.findAll({
      where: {
        user_id: testData.id,
      },
    }).then((listsResponse) => {
      // GO THROUGH EACH LIST
      listsResponse.forEach((list) => {
        // FIND ALL TODOS OF A SINGLE LIST
        Todos.findAll({
          where: {
            list_id: list.dataValues.id,
          },
        }).then((todosResponse) => {
          // GO THROUGH ALL TODOS
          todosResponse.forEach((todo) => {
            // DESTROY SINGLE TODO
            Todos.destroy({
              where: {
                id: todo.dataValues.id,
              },
            });
          });
        });
        if (list.dataValues.id !== testData.id) {
          Lists.destroy({
            where: {
              id: list.dataValues.id,
            },
          });
        }
      });
    });
  });

  it("correctly returns route '*' , GET", (done) => {
    request(app)
      .get("/routethatdoesntexist")
      .then((res) => {
        expect(res.body).to.eql({
          status: 404,
        });
        done();
      });
  });

  it("correctly adds a list via name", (done) => {
    request(app)
      .post(`/user/${testData.id}`)
      .query({ listname: testData.listname })
      .then((res) => {
        expect(res.body.type).to.eql("name");
        expect(res.body.name).to.eql(testData.listname);
        expect(res.body).to.have.property("location");
        done();
      });
  });

  it("correctly adds a list via value", (done) => {
    request(app)
      .post(`/user/${testData.id}/listvalue/${testData.todoValue}`)
      .then((res) => {
        expect(res.body.type).to.eql("todo");
        expect(res.body.value).to.eql(testData.todoValue);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("location");
        done();
      });
  });

  it("correctly adds todo", (done) => {
    request(app)
      .post(
        `/user/${testData.id}/list/${testData.id}/todo/${testData.todoValue}`
      )
      .then((res) => {
        expect(res.body.state).to.eql("pending");
        expect(res.body.value).to.eql(testData.todoValue);
        expect(res.body).to.have.property("id");
        done();
      });
  });

  it("correctly changes list name", (done) => {
    request(app)
      .put(`/user/${testData.id}/list/${testData.id}`)
      .query({ name: testData.listname })
      .then((res) => {
        expect(res.body).to.eql(testData.listname);
        done();
      });
  });

  it("correctly deletes todo", (done) => {
    request(app)
      .delete(`/user/${testData.id}/list/${testData.id}/todo/${testData.id}`)
      .then((res) => {
        expect(res.body).to.eql(testData.id);
        done();
      });
  });

  it("correctly deletes list", (done) => {
    request(app)
      .delete(`/user/${testData.id}/list/${testData.id}`)
      .then((res) => {
        expect(res.body).to.eql(testData.id);
        done();
      });
  });
});
