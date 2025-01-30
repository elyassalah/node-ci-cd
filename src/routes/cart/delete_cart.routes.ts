import { Router, Request, Response } from "express";
import { deleteData, filterRequest, getData } from "../../functions";

const deleteCart = Router();

deleteCart.delete("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    const cartId: number = req.body.cart_id;
    var allData: { status: string } = {
      status: "failure",
    };
    const isCartExist = await getData(
      "cart",
      "cart_id = ? AND user_id = ?",
      [cartId, userId],
      false,
    );
    if (isCartExist !== "failure") {
      const isDeletedCart = await deleteData(
        "cart",
        "cart_id = ? AND user_id =?",
        [cartId, userId],
        false,
      );
      if (isDeletedCart > 0) {
        allData.status = "success";
      }
    }
    res.send(allData);
  } catch (error) {
    res.send(error);
  }
});

export default deleteCart;
