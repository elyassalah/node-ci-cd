import { Router, Request, Response } from "express";
import { getAllData, getData } from "../../functions";

/*
{
  status: "success",
  data : [
  service1:{
    info_service: string|number,
    info_service: string|number,
    info_service: string|number
    choices : [
    choice1:{
    info_choice:string | number,
    info_choice:string | number,
    info_choice:string | number
    },
    choice2:{
    info_choice:string | number,
    info_choice:string | number
    },
    ]
  },
    service2:{
    info_service: string|number,
    info_service: string|number
    choices : [
    choice1:{
    info_choice:string | number,
    info_choice:string | number
    },
    choice2:{
    info_choice:string | number,
    info_choice:string | number
    },
    ]
  },
  ]
}
*/

///this route can be useful in cart screen , but when user pres on service in cart screen to edit it
//so use the box model in flutter to show tha all boxes and the choices and when edit on them so make the request
//to add_to_cart.routes.ts
const viewCart = Router();
viewCart.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    // const cartId: number = req.body.cart_id;
    const count = await getData("cart", "user_id = ?", [userId], false);
    if (count !== "failure") {
      let allData: any = {};
      const servicesInCart = await getAllData({
        _table: "services_incart",
        where: "cart_id = ?",
        values: [count[0]["cart_id"]],
        returnJson: false,
      });
      let servicesInfo: any = [];
      let choices: any = [];

      for (let index in servicesInCart) {
        let service = await getData(
          "services",
          "services_id =?",
          [servicesInCart[index]["service_id"]],
          false,
        );
        let choice = await getAllData({
          _table: "test_marge_choices",
          where:
            "id in (SELECT choice_id FROM user_selected_choices_request WHERE cart_id = ? AND user_id = ? AND service_incart_id = ?)",
          values: [
            count[0]["cart_id"],
            userId,
            servicesInCart[index]["services_incart_id"],
          ],
          returnJson: false,
        });

        //to injection the service in cart id to the service response
        service[0]["service_incart_id"] =
          servicesInCart[index]["services_incart_id"];
        //this if Statement for if this service not have any choices
        //to select it
        if (choice !== "failure") {
          choice.forEach(function (element: any) {
            element["service_incart_id"] =
              servicesInCart[index]["services_incart_id"];
          });
          servicesInfo.push(service[0]);
          servicesInfo[index]["choices"] = choice;
          // choices.push(choice);
          // console.log(choice[0]);
        } else {
          servicesInfo.push(service[0]);
          servicesInfo[index]["choices"] = [];
        }
      }

      // console.log(servicesInfo);
      allData.status = "success";
      allData.data = servicesInfo;
      res.send(allData);
    } else {
      res.send({
        status: "failure",
        message: "userId or cartId not valid or no service added yet",
      });
    }
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default viewCart;
