import supertest from "supertest";
import createServer from "../src/server";

const app = createServer();

describe("controller", () => {
  describe("get products for customer", () => {
    describe("given the user provide a customerId that does exist", () => {
      it("should return available products for this customer", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/getProductsForCustomer`)
          .set("Accept", "application/json")
          .send({ customerId: "000066220" });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          isExistingCustomer: true,
          customer: {
            customerId: "000066220",
            gender: "female",
            givenName: "Wilma",
            surName: "Wulmsdorf",
            birthDate: "1980-03-02",
            isBusinessCustomer: false,
          },
          products: [
            {
              productCode: "VAC-0005",
              productCateogryCode: "",
              productName: "Vacuum cleaner V300, Siemens",
              price: "142,44 €",
            },
            {
              productCode: "HAD-0064",
              productCateogryCode: "HAD",
              productName: "Hair dryer Grundig Z22 Sharp XION",
              price: "56,05 €",
            },
            {
              productCode: "VAC-0085",
              productCateogryCode: "VAC",
              productName: "Vacuum cleaner Braun AW800",
              price: "229,00 €",
            },
            {
              productCode: "HAD-0963",
              productCateogryCode: "HAD",
              productName: "Hair dryer Braun ComfortAirble",
              price: "56,05 €",
            },
          ],
        });
      });
    });

    describe("given the user provide a customerId that does not exist", () => {
      it("should return generally available products", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/getProductsForCustomer`)
          .set("Accept", "application/json")
          .send({ customerId: "000066221" });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          isExistingCustomer: false,
          customer: {
            customerId: "000066221",
          },
          products: [
            {
              productCode: "VAC-0005",
              productCateogryCode: "",
              productName: "Vacuum cleaner V300, Siemens",
              price: "149,00 €",
            },
            {
              productCode: "HAD-0064",
              productCateogryCode: "HAD",
              productName: "Hair dryer Grundig Z22 Sharp XION",
              price: "59,00 €",
            },
          ],
        });
      });
    });

    describe("given the user provides isBusinessCustomer=false", () => {
      it("should return the available products of a user with isBusinessCustomer=false", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/getProductsForCustomer`)
          .set("Accept", "application/json")
          .send({ customerId: null, isBusinessCustomer: false });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          isExistingCustomer: true,
          customer: {
            customerId: "000066220",
            gender: "female",
            givenName: "Wilma",
            surName: "Wulmsdorf",
            birthDate: "1980-03-02",
            isBusinessCustomer: false,
          },
          products: [
            {
              productCode: "VAC-0005",
              productCateogryCode: "",
              productName: "Vacuum cleaner V300, Siemens",
              price: "142,44 €",
            },
            {
              productCode: "HAD-0064",
              productCateogryCode: "HAD",
              productName: "Hair dryer Grundig Z22 Sharp XION",
              price: "56,05 €",
            },
            {
              productCode: "VAC-0085",
              productCateogryCode: "VAC",
              productName: "Vacuum cleaner Braun AW800",
              price: "229,00 €",
            },
            {
              productCode: "HAD-0963",
              productCateogryCode: "HAD",
              productName: "Hair dryer Braun ComfortAirble",
              price: "56,05 €",
            },
          ],
        });
      });
    });

    describe("given the user provides isBusinessCustomer=true", () => {
      it("should return the available products of a user with isBusinessCustomer=true", async () => {
        const { statusCode, body } = await supertest(app)
          .get(`/api/getProductsForCustomer`)
          .set("Accept", "application/json")
          .send({ isBusinessCustomer: true });

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          isExistingCustomer: true,
          customer: {
            customerId: "00000055",
            gender: "male",
            givenName: "Max",
            surName: "Muster",
            birthDate: "1974-01-06",
            isBusinessCustomer: true,
          },
          products: [
            {
              productCode: "VAC-0005",
              productCateogryCode: "",
              productName: "Vacuum cleaner V300, Siemens",
              price: "142,44 €",
            },
            {
              productCode: "HAD-0064",
              productCateogryCode: "HAD",
              productName: "Hair dryer Grundig Z22 Sharp XION",
              price: "56,05 €",
            },
          ],
        });
      });
    });
  });
});
