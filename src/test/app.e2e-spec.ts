import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import AppModule from "../app.module";

describe("AppUserController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("deve fazer login e retornar um jwt token (access) e um refresh", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "andre.luis@pormade", password: "andre123" })
      .expect(201);

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });
});
