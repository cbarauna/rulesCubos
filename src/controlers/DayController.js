const Day = require("../models/Day");
const fs = require("fs");
const _ = require("lodash");
let file = "./src/files/day.json";
const moment = require("moment");
const Utils = require("../utils/Utils");

module.exports = {
  index(req, res) {
    console.log(req.query);
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.send("Não há nenhuma regra criada");
          return;
        }
        throw err;
      }
      if (!!data && req.query.day) {
        let dataReturn = _.filter(JSON.parse(data), { day: req.query.day });

        if (dataReturn.length == 0) {
          res.send("Nenhuma Regra Encontrada!");
        } else {
          res.send(_.filter(JSON.parse(data), { day: req.query.day }));
        }
      } else if (!!data && req.query.initialDay) {
        let dataDb = JSON.parse(data);
        let initialDay = moment(req.query.initialDay, "DD-MM-YYYY");
        let finalDate = moment(req.query.finalDate, "DD-MM-YYYY");
        let dataBetween = dataDb.filter(date => {
          moment(date.day, "DD-MM-YYYY").isBetween(initialDay, finalDate);
        });

        if (dataBetween.length > 0) {
          res.send(JSON.parse(dataBetween));
        } else {
          res.send("Nenhum Registro encontrado");
        }
      } else {
        res.send(_.orderBy(JSON.parse(data), ["day"], ["asc"]));
      }
    });
  },
  create(req, res) {
    if (!!Utils.montarJson(req.body)) {
      const dateRules = Utils.montarJson(req.body);

      fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            fs.appendFile(
              file,
              JSON.stringify(dateRules),
              { enconding: "utf-8", flag: "w" },
              function(err) {
                if (err) throw err;
                console.log("Arquivo salvo!");
                res.send("Regra salva com sucesso!");
              }
            );
          }
          throw err;
        }
        if (!!data && moment(req.body.day, "DD-MM-YYYY").isValid()) {
          const date = JSON.parse(data);
          if (
            _.isArray(_.filter(data, { day: req.body.day })) &&
            _.filter(data, { day: req.body.day }).length > 0
          ) {
            res.send("Data já cadastrada!");
            return;
          } else {
            let dataJson = date.concat(dateRules);
            fs.appendFile(
              file,
              JSON.stringify(dataJson),
              { enconding: "utf-8", flag: "w" },
              function(err) {
                if (err) throw err;
                console.log("Arquivo salvo!");
                res.send("Regra salva com sucesso!");
              }
            );
          }
        }
      });
    } else {
      res.send("Formato não esperado!");
    }
  },
  delete(req, res) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.send("Não há nenhuma regra criada");
          return;
        }
        throw err;
      }
      if (!!data && _.isArray(JSON.parse(data))) {
        let dayList = JSON.parse(data);
        let dateRemoved = _.remove(dayList, date => {
          return date.day === req.query.day;
        });

        if (dateRemoved.length == 0) {
          res.send("Registro não encontrado!");
          return;
        } else {
          fs.appendFile(
            file,
            JSON.stringify(dayList),
            { enconding: "utf-8", flag: "w" },
            err => {
              if (err) throw err;
              res.send("Delete Realizado com Sucesso! ");
            }
          );
        }
      }
    });
  }
};
