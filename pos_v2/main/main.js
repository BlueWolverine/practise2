'use strict';




function printReceipt(inputs) {
  var shoppingGoodsInformation = getGoodsInformationSheet(inputs);
  shoppingGoodsInformation = getGoodsInformationSheet_less(shoppingGoodsInformation);
  console.log(getPrintList(shoppingGoodsInformation));
}


function getGoodsInformationSheet(inputs) {//获取购物商品ID和数量
  var shoppingGoodsInformation = new Array();
  var t = 0;
  var printList = new Array();
  var shoppingGoodsInformation = new Array();
  var barcode = new Array();
  var count = new Array();
  barcode[0] = inputs[0];
  count[0] = 0;
  for (var i = 0; i<inputs.length; i++) {
    if (inputs[i].length == 10) {
      if (barcode[t] == inputs[i]) {
        count[t]++;
      }
      else {
        barcode[++t] = inputs[i];
        count[t] = 1;
      }
    }
    else {
      var barArray = inputs[i].split('-');
      if (barcode[t] == barArray[0]) {
        count[t] += parseFloat(barArray[1]);
      }
      else {
        count[++t] = parseFloat(barArray[1]);
        barcode[t] = barArray[0];
      }
    }
  }

  for (var i = 0; i<=t; i++) {
    shoppingGoodsInformation[i] = {};
    shoppingGoodsInformation[i].barcode = barcode[i];
    shoppingGoodsInformation[i].count = count[i];
  }
  return shoppingGoodsInformation;
}


function getGoodsInformationSheet_less(shoppingGoodsInformation) {//增加优惠数量属性
  var less = new Array();
  var goodsPromotion = Promotion.all();

  for (var i = 0; i<shoppingGoodsInformation.length; i++) {
      shoppingGoodsInformation[i].less = 0;
      if (goodsPromotion[0].barcodes.indexOf(shoppingGoodsInformation[i].barcode) !=- 1) {
        if (shoppingGoodsInformation[i].count>=3) {
          shoppingGoodsInformation[i].less = parseInt(shoppingGoodsInformation[i].count/3);
        }
      }
    }
    return shoppingGoodsInformation;
}
//console.log(getGoodsInformationSheet_less(getGoodsInformationSheet(inputs)))



function getPrintList(shoppingGoodsInformation) {
  var total = 0;
  var reduction = 0;
  var date = new Date();
  var goodsInformation = Item.all();
  var printList = new Array();
  printList.push('***<没钱赚商店>收据***\n');
  printList.push('打印时间：'+date.getFullYear()+'年'+'0'+(date.getMonth()+1)+'月'+date.getDate()+'日'+ ' ' +date.toString().slice(16,24)+'\n');
  printList.push('----------------------\n');
  for (var i = 0; i<shoppingGoodsInformation.length; i++) {
    for (var j = 0; j<goodsInformation.length; j++) {
      if (shoppingGoodsInformation[i].barcode == goodsInformation[j].barcode) {
        printList.push('名称：'+goodsInformation[j].name+'，数量：'+shoppingGoodsInformation[i].count+goodsInformation[j].unit+'，单价：'+goodsInformation[j].price.toFixed(2)+'(元)，小计：'+((shoppingGoodsInformation[i].count-shoppingGoodsInformation[i].less)*goodsInformation[j].price).toFixed(2)+'(元)\n');
        total += shoppingGoodsInformation[i].count*goodsInformation[j].price;
        reduction += goodsInformation[j].price*shoppingGoodsInformation[i].less;
      }
    }
  }

  printList.push('----------------------\n');
  printList.push('总计：'+(total-reduction).toFixed(2)+'(元)\n');
  printList.push('节省：'+reduction.toFixed(2)+'(元)\n')
  printList.push('**********************');

  return printList.join('');

  //console.log(printList.join(""));
}