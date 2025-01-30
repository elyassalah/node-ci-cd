import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";

const serviceInputDesignRoutes = Router();

serviceInputDesignRoutes.post("/", async (req: Request, res: Response) => {
  const serviceId: number = req.body.service_id;
  let allData: { [key: string]: any } = {};
  allData["status"] = "";
  allData["data"] = [];
  const allBoxes: [] | string = await getAllData({
    _table: "service_infoboxinput",
    where: "`id_service` = ?",
    values: [serviceId],
    returnJson: false,
  });
  if (allBoxes !== "failure") {
    allData["status"] = "success";
    allData["data"] = allBoxes;
    const radioChoices = await getAllData({
      _table: "choices_radiobox",
      where: "service_id = ?",
      values: [serviceId],
      returnJson: false,
    });
    const checkedChoices = await getAllData({
      _table: "choices_checkedbox",
      where: "service_id = ?",
      values: [serviceId],
      returnJson: false,
    });
    if (radioChoices !== "failure" || checkedChoices !== "failure") {
      for (var i = 0; i < allBoxes.length; i++) {
        if (allData["data"][i]["type_designInput"] === "Radio Button") {
          var choicesRd = [];
          for (var j = 0; j < radioChoices.length; j++) {
            if (radioChoices[j]["id_radioBox"] === allData["data"][i]["id"]) {
              choicesRd.push(radioChoices[j]);
            }
          }
          allData.data[i].choices = choicesRd;
          radioChoices.splice(j, 1);
        } else {
          if (allData["data"][i]["type_designInput"] === "Checked Box") {
            var choicesChk = [];
            for (var j = 0; j < checkedChoices.length; j++) {
              if (
                checkedChoices[j]["id_checkedBox"] == allData["data"][i]["id"]
              ) {
                choicesChk.push(checkedChoices[j]);
              }
            }
            allData["data"][i]["choices"] = choicesChk;
            checkedChoices.splice(j, 1);
          }
        }
      }
    } else {
      for (let i = 0; i < allBoxes.length; i++) {
        allData["data"][i]["choices"] = [];
      }
    }
  } else {
    allData["status"] = "failure";
  }
  res.send(allData);
});

export default serviceInputDesignRoutes;
