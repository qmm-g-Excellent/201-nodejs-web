const Item = require("../model/item");
const Category = require("../model/category");
const Cart = require("../model/cart");

const itemData = require("./fixture/item");
const categoryData = require("./fixture/category");
const  cartData = require("./fixture/cart");

const models = [
    Item,
    Category,
    Cart
];

const data = {
  Item:itemData,
  Category:categoryData,
  Cart: cartData
};

//这个不是必要的
// const docs = Object.keys(models);


//done这个参数什么时候可以有？？？？
module.exports = (done) =>{
  models.forEach(model =>{
     model.remove({},()=>{
       //不可以直接使用model，它是一个函数，这里的modelName用法很好
       model.create(data[model.modelName],()=>{
         //这里表达式在等号之后可以不加小括号吗？？？
            if(models.indexOf(model) === models.length-1){
                console.log("refreshMongo success!");
              // console.log("这里检验done到底是不return结束这个函数");
              done();
            }
       })
     })
  })
}