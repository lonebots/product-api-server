import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title required",
    }),
    description: string({
      required_error: " Description required",
    }).min(120, "Description should be minimum of 120 characters"),
    price: number({
      required_error: "Price required",
    }),
    image: string({
      required_error: "Image required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "ProductID is required",
    }),
  }),
};

// export schemas
export const createProductSchema = object({
  ...payload,
  ...params,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

// export types
export type createProductInput = TypeOf<typeof createProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type getProductInput = TypeOf<typeof getProductSchema>;
export type deletProductInput = TypeOf<typeof deleteProductSchema>;
