const { db, History, sequelize } = require("../models");
const { QueryTypes, Op } = require("sequelize");

var addHistory = async (products, status_id, content, manager_id) => {
  try {
    const history = await History.bulkCreate(
      products.map((element) => {
        return {
          product_id: element,
          status_id,
          content,
          manager_id,
        };
      })
    );
    return history;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var addOneHistory = async (product_id, status_id, content, manager_id) => {
  try {
    const history = await History.create({
      product_id,
      status_id,
      content,
      manager_id,
    });
    return history;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getHistoryOfProduct = async (product_id) => {
  try {
    const history = History.findAll({
      where: { product_id },
      include: ["manager"],
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

var productsByStatus = async (manager_id, option, year, secondYear, role) => {
  try {
    //const manager = await sequelize.query(
    //    `SELECT count(*), histories.createdAt, quarter(histories.createdAt), content, status_id
    //    FROM histories inner join statuses on statuses.id = histories.status_id
    //    WHERE manager_id = $1 group by year(histories.createdAt), quarter(histories.createdAt), status_id
    //    order by year(histories.createdAt), quarter(histories.createdAt), status_id`,
    //    {
    //      bind: [manager_id],
    //      type: QueryTypes.SELECT,
    //      nest: true,
    //      raw: false,
    //    }
    //);
    if (!year) {
      throw "invalid year";
    }
    if (role === 1) {
      throw "role 1 is not valid";
    }
    let data = null;
    let statuses = null;

    if(role == 3) {
      statuses = [8, 9, 12]
    } else if (role == 4){
      statuses = [4, 5, 6, 11, 19]
    } else if (role === 2) {
      statuses = [1, 3, 14, 15, 16]
    }
    
    if (option === "quarter" || option === "month") {
      data = await History.count({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("createdAt")),
              year
            ),
            { manager_id },
            {
              status_id: statuses,
            },
          ],
        },
        group: [
          sequelize.fn(
            option === "month" ? "MONTH" : "QUARTER",
            sequelize.col("createdAt")
          ),
          "status_id",
        ],
      });
    } else if (option === "year") {
      if (!secondYear) {
        throw "invalid secondYear";
      }
      data = await History.count({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("createdAt")),
              Op.gte,
              year
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("createdAt")),
              Op.lte,
              secondYear
            ),
            { manager_id },
            {
              status_id: statuses,
            },
          ],
        },
        group: [sequelize.fn("YEAR", sequelize.col("createdAt")), "status_id"],
      });
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getSoldOrErrorInfo = async (manager_id, option, year, secondYear, type) => {
  try {
    let data = null;
    if (option === "quarter" || option === "month") {
      data = await sequelize.query(
        `SELECT count(*) as count, ${option}(histories.createdAt) as time 
                FROM histories inner join manager_product on histories.product_id = manager_product.product_id 
                WHERE manager_product.manager_id = $1 and status_id = ${type === 'sold' ? 5 : 12} and year(histories.createdAt) = $2 group by ${option}(histories.createdAt)
                order by ${option}(histories.createdAt) ASC
                `,
        {
          bind: [manager_id, year],
          type: QueryTypes.SELECT,
        }
      );
    } else if (option === "year") {
      if (!secondYear) {
        throw "invalid secondYear";
      }
      data = await sequelize.query(
        `SELECT count(*) as count, ${option}(histories.createdAt) as time
                FROM histories inner join manager_product on histories.product_id = manager_product.product_id 
                WHERE manager_product.manager_id = $1 and status_id = ${type === 'sold' ? 5 : 12} and year(histories.createdAt) >= $2 and year(histories.createdAt) <= $3 group by ${option}(histories.createdAt)
                order by ${option}(histories.createdAt) ASC
                `,
        {
          bind: [manager_id, year, secondYear],
          type: QueryTypes.SELECT,
        }
      );
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getAllSoldOrErrorInfo = async (option, year, secondYear, type) => {
  try {
    let data = null;
    if (option === "quarter" || option === "month") {
      data = await sequelize.query(
        `SELECT count(*) as count, ${option}(histories.createdAt) as time 
                FROM histories
                WHERE status_id = ${type === 'sold' ? 5 : 12} and year(histories.createdAt) = $1 group by ${option}(histories.createdAt)
                order by ${option}(histories.createdAt) ASC
                `,
        {
          bind: [year],
          type: QueryTypes.SELECT,
        }
      );
    } else if (option === "year") {
      if (!secondYear) {
        throw "invalid secondYear";
      }
      data = await sequelize.query(
        `SELECT count(*) as count, ${option}(histories.createdAt) as time
                FROM histories
                WHERE status_id = ${type === 'sold' ? 5 : 12} and year(histories.createdAt) >= $1 and year(histories.createdAt) <= $2 group by ${option}(histories.createdAt)
                order by ${option}(histories.createdAt) ASC
                `,
        {
          bind: [year, secondYear],
          type: QueryTypes.SELECT,
        }
      );
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getAllSoldOrErrorInfoByModel = async (type) => {
  try {
    const data = await sequelize.query(
        `SELECT count(*) as count, models.name as name 
                FROM histories inner join products on histories.product_id = products.id inner join models on products.model_id = models.id
                WHERE histories.status_id = ${type === 'sold' ? 5 : 12} group by models.id
                order by models.id ASC
                `,
        {
          type: QueryTypes.SELECT,
        }
      );
    //console.log(data);
    //console.log(typeof data)
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getAllSoldOrErrorInfoOfManagerByModel = async (manager_id, type) => {
  try {
    const data = await sequelize.query(
        `SELECT count(*) as count, models.name as name 
                FROM manager_product inner join histories on manager_product.product_id = histories.product_id
                inner join products on histories.product_id = products.id inner join models on products.model_id = models.id
                WHERE histories.status_id = ${type === 'sold' ? 5 : 12} and manager_product.manager_id = $1 group by models.id
                order by models.id ASC
                `,
        {
          bind: [manager_id],
          type: QueryTypes.SELECT,
        }
      );
    //console.log(data);
    //console.log(typeof data)
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  addHistory,
  addOneHistory,
  getHistoryOfProduct,
  productsByStatus,
  getSoldOrErrorInfo,
  getAllSoldOrErrorInfo,
  getAllSoldOrErrorInfoByModel,
  getAllSoldOrErrorInfoOfManagerByModel,
};
