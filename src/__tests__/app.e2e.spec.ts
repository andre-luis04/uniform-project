import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from "supertest";

describe("AppUserController (e2e)", () => {
  let app: INestApplication;
  let accessToken: string;

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

    accessToken = response.body.accessToken;
  });

  it("deve retornar todos os produtos disponiveis", async () => {
    const response = await request(app.getHttpServer())
      .get("/product")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("productVariant");

    expect(Array.isArray(response.body[0].productVariant)).toBe(true);
    expect(response.body[0].productVariant[0]).toHaveProperty("price");
    expect(response.body[0].productVariant[0]).toHaveProperty("ids_media");
  });

  it("deve retornar o produto variante que o usuario selecionar", async () => {
    const produtoId = "e61c09b0-fbf0-4858-8107-27aedb56d2c9";

    const response = await request(app.getHttpServer())
      .get(`/product-variant/${produtoId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("ids_media");
    expect(Array.isArray(response.body[0].ids_media)).toBe(true);

    expect(response.body[0]).toHaveProperty("product");
    expect(Array.isArray(response.body[0].product)).toBe(false);
    expect(response.body[0].product).toHaveProperty("id");
    expect(response.body[0].product).toHaveProperty("name");

    expect(response.body[0]).toHaveProperty("size");
    expect(Array.isArray(response.body[0].product)).toBe(false);
    expect(response.body[0].size).toHaveProperty("id");
    expect(response.body[0].size).toHaveProperty("size");

    expect(response.body[0]).toHaveProperty("color");
    expect(Array.isArray(response.body[0].product)).toBe(false);
    expect(response.body[0].color).toHaveProperty("id");
    expect(response.body[0].color).toHaveProperty("color");
  });

  it("adiciona item no carrinho", async () => {
    const response = await request(app.getHttpServer())
      .post("/cart-item")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        quantity: "2",
        id_variant: "722ddc84-13a9-44d5-b268-9597cc873534",
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
