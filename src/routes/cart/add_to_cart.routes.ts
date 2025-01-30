import { Router, Request, Response } from "express";
import { getAllData, getData, insertData } from "../../functions";

const addToCart = Router();
interface BoxAndChoices {
  boxId: number;
  choicesId: number[];
}
interface UserData {
  user_id: number;
  service_id: number;
  box_and_choices: BoxAndChoices[];
}
addToCart.post("/", async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;
    const { user_id, service_id, box_and_choices } = userData;
    let allData: any = {};
    const cart: any = await getAllData({
      _table: "cart",
      where: "user_id =?",
      values: [user_id],
      returnJson: false,
    });
    allData["status"] = "success";
    allData["data"] = {};
    if (cart !== "failure") {
      const isServiceInCart = await getAllData({
        _table: "services_incart",
        where: "cart_id =? AND service_id = ?",
        values: [cart[0]["cart_id"], service_id],
        returnJson: false,
      });
      let newService: boolean = true;
      let serviceInCartId: number;
      let numberOfThisServiceInCart: number = 0;
      for (let index = 0; index < isServiceInCart.length; index++) {
        if (service_id === isServiceInCart[index]["service_id"]) {
          newService = false;
          serviceInCartId = isServiceInCart[index]["services_incart_id"];
          numberOfThisServiceInCart++;
          //           console.log(serviceInCartId);
        }
      }
      //add new service and choices from different provider or same
      //just check if provider profile can take more than one service request from same user to complete
      if (newService === true) {
        const isServiceExist = await getData(
          "services",
          "services_id = ? ",
          [service_id],
          false,
        );
        if (
          isServiceExist !== "failure" &&
          isServiceExist[0]["services_count"] !== 0
        ) {
          const data = {
            service_id: service_id,
            cart_id: cart[0]["cart_id"],
          };

          const count = await insertData("services_incart", data, false);
          if (count > 0) {
            allData["data"]["services_incart_insert"] = "success";
            allData["data"]["cart_id"] = cart[0]["cart_id"];
          } else {
            allData["status"] = "failure";
            allData["message"]["services_incart_insert"] = "failure";
          }
          const newServiceInCart = await getAllData({
            _table: "services_incart",
            where: "service_id = ? AND cart_id = ?",
            values: [service_id, cart[0]["cart_id"]],
            returnJson: false,
          });
          for (let index = 0; index < box_and_choices.length; index++) {
            for (
              let subIndex = 0;
              subIndex < box_and_choices[index]["choicesId"].length;
              subIndex++
            ) {
              const data = {
                user_id: user_id,
                cart_id: cart[0]["cart_id"],
                service_incart_id: newServiceInCart[0]["services_incart_id"],
                choice_id: box_and_choices[index]["choicesId"][subIndex],
                box_id: box_and_choices[index]["boxId"],
              };
              const count = await insertData(
                "user_selected_choices_request",
                data,
                false,
              );
              if (count > 0) {
                allData["data"]["user_choices_selected_service_insert"] =
                  "success";
                allData["data"]["service_incart_id"] =
                  newServiceInCart[0]["services_incart_id"];
              } else {
                allData["status"] = "failure";
                allData["message"]["user_choices_selected_service_insert"] =
                  "failure";
              }
            }
          }
        } else {
          allData["status"] = "failure";
          allData["message"] = "service does not exist";
        }
      } else {
        const serviceInfo = await getData(
          "services",
          "services_id = ?",
          [service_id],
          false,
        );
        if (
          numberOfThisServiceInCart <
            serviceInfo[0]["services_duplicate"] + 1 &&
          serviceInfo[0]["services_count"] !== 0
        ) {
          const data = {
            service_id: service_id,
            cart_id: cart[0]["cart_id"],
          };
          const count = await insertData("services_incart", data, false);
          if (count > 0) {
            allData["data"]["services_incart_insert"] = "success";
            allData["data"]["cart_id"] = cart[0]["cart_id"];
          } else {
            allData["status"] = "failure";
            allData["message"]["services_incart_insert"] = "failure";
          }
          const newServiceInCart = await getAllData({
            _table: "services_incart",
            where: "service_id = ? AND cart_id = ?",
            values: [service_id, cart[0]["cart_id"]],
            returnJson: false,
          });
          for (let index = 0; index < box_and_choices.length; index++) {
            for (
              let subIndex = 0;
              subIndex < box_and_choices[index]["choicesId"].length;
              subIndex++
            ) {
              const data = {
                user_id: user_id,
                cart_id: cart[0]["cart_id"],
                service_incart_id:
                  newServiceInCart[numberOfThisServiceInCart][
                    "services_incart_id"
                  ],
                choice_id: box_and_choices[index]["choicesId"][subIndex],
                box_id: box_and_choices[index]["boxId"],
              };
              const count = await insertData(
                "user_selected_choices_request",
                data,
                false,
              );
              if (count > 0) {
                allData["data"]["user_choices_selected_service_insert"] =
                  "success";
                allData["data"]["service_incart_id"] =
                  newServiceInCart[numberOfThisServiceInCart][
                    "services_incart_id"
                  ];
              } else {
                allData["status"] = "failure";
                allData["message"]["user_choices_selected_service_insert"] =
                  "failure";
              }
            }
          }
        } else {
          allData["status"] = "failure";
          allData["message"] = "this service can not duplicate";
        }
      }
      res.send(allData);
    } else {
      const isUserExist = await getData(
        "users",
        "users_id =?",
        [user_id],
        false,
      );

      if (isUserExist !== "failure") {
        const data = {
          user_id: user_id,
        };
        var count = await insertData("cart", data, false);

        if (count > 0) {
          allData["data"]["cart_insert"] = "success";
        } else {
          allData["status"] = "failure";
          allData["message"]["cart_insert"] = "failure";
        }

        const cart = await getAllData({
          _table: "cart",
          where: "user_id = ?",
          values: [user_id],
          returnJson: false,
        });

        const isServiceExist = await getData(
          "services",
          "services_id = ?",
          [service_id],
          false,
        );
        if (isServiceExist !== "failure") {
          const data = {
            service_id: service_id,
            cart_id: cart[0]["cart_id"],
          };
          const count = await insertData("services_incart", data, false);

          if (count > 0) {
            allData["data"]["services_incart_insert"] = "success";
            allData["data"]["cart_id"] = cart[0]["cart_id"];
          } else {
            allData["status"] = "failure";
            allData["message"]["services_incart_insert"] = "failure";
          }
          const serviceInCart = await getAllData({
            _table: "services_incart",
            where: "service_id = ? AND cart_id = ?",
            values: [service_id, cart[0]["cart_id"]],
            returnJson: false,
          });
          //TODO: check if boxes id and choices id is exist in db

          for (let index = 0; index < box_and_choices.length; index++) {
            for (
              let subindex = 0;
              subindex < box_and_choices[index]["choicesId"].length;
              subindex++
            ) {
              const data = {
                user_id: user_id,
                cart_id: cart[0]["cart_id"],
                service_incart_id: serviceInCart[0]["services_incart_id"],
                choice_id: box_and_choices[index]["choicesId"][subindex],
                box_id: box_and_choices[index]["boxId"],
              };
              const count = await insertData(
                "user_selected_choices_request",
                data,
                false,
              );

              if (count > 0) {
                allData["data"]["user_selected_service_insert"] = "success";
                allData["data"]["service_incart_id"] =
                  serviceInCart[0]["services_incart_id"];
              } else {
                allData["status"] = "failure";
                allData["message"]["user_selected_service_insert"] = "failure";
              }
            }
          }
        } else {
          allData["status"] = "failure";
          allData["message"] = "service does not exist";
        }
      } else {
        allData["status"] = "failure";
        allData["message"] = "user does not exist";
      }
      res.send(allData);
    }
  } catch (error) {
    res.send(error);
  }
});

export default addToCart;
