import { Router, Request, Response } from "express";
import { deleteData, getData } from "../../functions";
//delete the service and delete the cart if no service inside it to avoid conflict in add cart or service

const deleteServiceInCart = Router();

deleteServiceInCart.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    const serviceId: number = req.body.service_id;
    const serviceInCartId: number = req.body.service_incart_id;
    const cartId: number = req.body.cart_id;
    let allData: { status: string; message: string } = {
      status: "failure",
      message: "delete services",
    };
    const isServiceExist = await getData(
      "services_incart",
      "service_id =? AND cart_id = ? AND services_incart_id = ?",
      [serviceId, cartId, serviceInCartId],
      false,
    );
    if (isServiceExist !== "failure") {
      const isDeletedService = await deleteData(
        "services_incart",
        "service_id =? AND cart_id = ? AND services_incart_id = ?",
        [serviceId, cartId, serviceInCartId],
        false,
      );
      if (isDeletedService > 0) {
        allData.status = "success";
        const isServiceExist = await getData(
          "services_incart",
          "cart_id = ?",
          [cartId],
          false,
        );

        if (isServiceExist === "failure") {
          const isDeletedCart = await deleteData(
            "cart",
            "cart_id = ? AND user_id = ?",
            [cartId, userId],
            false,
          );
          if (isDeletedCart > 0) {
            allData.message = "Deleted Cart also";
          }
        }
      }
    }
    res.send(allData);
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default deleteServiceInCart;
