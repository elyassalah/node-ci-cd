import { Router, Request, Response } from "express";
import { deleteData, getAllData, getData, insertData } from "../../functions";
//TODO: if he re enter the same values of all it will Response [] , so just make it Response anything , and put in allData status : "success"& "failure"
//TODO: marge table of radioChoices and checkedChoices you can both has column first is_checked second selected_radio both doing same thing , can hold 0,1
//we made new table contain both type of choices , integrate of it and handling it (test_marge_choices) the column same in both (is_checked)
//this is a shit code , please clean it in the near time
//TODO: check if id of box and choices is exist
//this route is useful in flutter when user edit on service in cart cause it can not this Route
//to add the same service twice just modification on the same service in cart
//so we need to create another route for service that provider allow user to  order it more than one time
//so do not use it when add service to cart in flutter cause every time user add this service to cart with new choices
//or edit choices it will affected to the previous same service in cart without crate new service in cart
///this is not useful request cause this route we use it it can insert service once just , and any another request
///it will just edit the data of previous same service in cart not add new service in cart, so we can make new route
///for add service to cart and allow user to add this service more than once if provider allow that then use this route in cart when user edit
///the service in cart depended on service_incart_id make the new route you will make it to return the service_incart_id
// and the edit
/// it will be depended on the service_incart_id no on service_id
//TODO: edit the response of this route to be {status:"succes or failure" , allData|message: any you want}
///DONE: fixed all above issues of adding service to cart in route add_to_cart.routes.ts
const manipulateServiceInCart = Router();
interface BoxAndChoices {
  boxId: number;
  choicesId: number[];
}
interface UserData {
  user_id: number;
  service_id: number;
  service_incart_id: number;
  box_and_choices: BoxAndChoices[];
}

manipulateServiceInCart.post("/", async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;
    const { user_id, service_id, service_incart_id, box_and_choices } =
      userData;
    let allData: any = {};
    allData["status"] = "success";
    allData["data"] = {};
    const cart: any = await getAllData({
      _table: "cart",
      where: "user_id =?",
      values: [user_id],
      returnJson: false,
    });

    if (cart !== "failure") {
      //add new choice from new CheckedBox or new RadioBox
      //add new choice from old CheckedBox

      //the below can be in edit choice file and remove choice file
      //edit old choice from RadioBox only change or remove if can disable box the choice or CheckedBox change the choice or add choice or remove choice if box can disable

      //edit service that edit the choices and boxes of it

      //add new service and choices from same provider
      // $cart = getAllData("cart", "user_id = ?", array($userId), false);
      const serviceInCart = await getAllData({
        _table: "services_incart",
        where: "cart_id =? AND services_incart_id = ?",
        values: [cart[0]["cart_id"], service_incart_id],
        returnJson: false,
      });
      let newService: boolean = true;
      let serviceInCartId: number;
      for (let index = 0; index < serviceInCart.length; index++) {
        if (service_id === serviceInCart[index]["service_id"]) {
          newService = false;
          serviceInCartId = serviceInCart[index]["services_incart_id"];
          // console.log(serviceInCartId);
          break;
        }
      }
      //add new service and choices from different provider or same
      //just check if provider profile can take more than one service request from same user to complete
        //if the box id coming is new so add the choices of it just on the same service in cart choices

        const allChoicesOfServiceInCart = await getAllData({
          _table: "user_selected_choices_request",
          where: "user_id = ? AND service_incart_id = ?",
          values: [user_id, service_incart_id],
          returnJson: false,
        });
        let isNewBox = true;
        let removeOldChoice = true;
        let isNewChoice = true;
        for (let index in box_and_choices) {
          isNewBox = true;
          for (let subIndex in allChoicesOfServiceInCart) {
            removeOldChoice = true;
            if (
              box_and_choices[index]["boxId"] ===
              allChoicesOfServiceInCart[subIndex]["box_id"]
            ) {
              //check choices from each box in db with coming

              for (let subIndex2 in box_and_choices[index]["choicesId"]) {
                //if the choice in db is in the coming box

                if (
                  box_and_choices[index]["choicesId"][subIndex2] ===
                  allChoicesOfServiceInCart[subIndex]["choice_id"]
                ) {
                  removeOldChoice = false;
                  break;
                }
              }
              isNewBox = false;
              if (removeOldChoice === true) {
                //remove the choice that is not inside the coming box

                const count = await deleteData(
                  "user_selected_choices_request",
                  "choice_id =? AND box_id = ? AND user_id = ? AND service_incart_id = ?",
                  [
                    allChoicesOfServiceInCart[subIndex]["choice_id"],
                    allChoicesOfServiceInCart[subIndex]["box_id"],
                    user_id,
                    service_incart_id,
                  ],
                  false,
                );
                if (count > 0) {
                  allData["data"]["user_delete_selected_choices"] = "success";
                } else {
                  allData["status"] = "failure";
                  allData["message"]["user_delete_selected_choices"] =
                    "failure";
                }
              }
            }
          }
          if (isNewBox === true) {
            //if box coming not inside the db

            for (let subIndex in box_and_choices[index]["choicesId"]) {
              const data = {
                user_id: user_id,
                cart_id: cart[0]["cart_id"],
                service_incart_id: service_incart_id,
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
              } else {
                allData["status"] = "failure";
                allData["message"]["user_choices_selected_service_insert"] =
                  "failure";
              }
            }
          } else {
            //for add all new choices of boxes that not in db but is coming as new choice of some box

            for (let subIndex3 in box_and_choices[index]["choicesId"]) {
              isNewChoice = true;
              for (let subIndex4 in allChoicesOfServiceInCart) {
                if (
                  box_and_choices[index]["choicesId"][subIndex3] ===
                    allChoicesOfServiceInCart[subIndex4]["choice_id"] &&
                  box_and_choices[index]["boxId"] ===
                    allChoicesOfServiceInCart[subIndex4]["box_id"]
                ) {
                  isNewChoice = false;
                }
              }
              if (isNewChoice === true) {
                const data = {
                  user_id: user_id,
                  cart_id: cart[0]["cart_id"],
                  service_incart_id: service_incart_id,
                  choice_id: box_and_choices[index]["choicesId"][subIndex3],
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
                } else {
                  allData["status"] = "failure";
                  allData["message"]["user_choices_selected_service_insert"] =
                    "success";
                }
              }
            }
          }
        }
        let removeChoice = true;
        //remove choices of box not in the coming boxes if in the flutter this box can disable

        for (let index in allChoicesOfServiceInCart) {
          removeChoice = true;
          for (let subIndex in box_and_choices) {
            if (
              allChoicesOfServiceInCart[index]["box_id"] ==
              box_and_choices[subIndex]["boxId"]
            ) {
              removeChoice = false;
            }
          }
          if (removeChoice === true) {
            const count = await deleteData(
              "user_selected_choices_request",
              "choice_id = ? AND box_id = ? AND user_id = ? AND service_incart_id = ?",
              [
                allChoicesOfServiceInCart[index]["choice_id"],
                allChoicesOfServiceInCart[index]["box_id"],
                user_id,
                service_incart_id,
              ],
              false,
            );
            if (count > 0) {
              allData["data"]["user_delete_selected_choices"] = "success";
            } else {
              allData["status"] = "failure";
              allData["message"]["user_delete_selected_choices"] = "failure";
            }
          }
        }
      res.send(allData);
    } 
  } catch (error) {
    res.send(error);
  }
});

export default manipulateServiceInCart;
