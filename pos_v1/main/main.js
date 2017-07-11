'use strict';

  function printReceipt(inputs) {
    var goodsInformation = loadAllItems();
    var array = loadPromotions();
    var goodsPromotion = array[0]
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


    var less = new Array();
    for (var i = 0; i<shoppingGoodsInformation.length; i++) {
        shoppingGoodsInformation[i].less = 0;
        if (goodsPromotion.barcodes.indexOf(barcode[i])!=-1) {
          if (count[i]>=3) {
            shoppingGoodsInformation[i].less = parseInt(count[i]/3);
          }
        }
      }


    var total = 0;
    var reduction = 0;
    printList.push('***<没钱赚商店>收据***\n');
    for (var i = 0; i<shoppingGoodsInformation.length; i++) {
      for (var j = 0; j<goodsInformation.length; j++) {
        if (barcode[i] == goodsInformation[j].barcode) {
          printList.push('名称：'+goodsInformation[j].name+'，数量：'+count[i]+goodsInformation[j].unit+'，单价：'+goodsInformation[j].price.toFixed(2)+'(元)，小计：'+((count[i]-shoppingGoodsInformation[i].less)*goodsInformation[j].price).toFixed(2)+'(元)\n');
          total += count[i]*goodsInformation[j].price;
          reduction += goodsInformation[j].price*shoppingGoodsInformation[i].less;
        }
      }
    }

    printList.push('----------------------\n');
    printList.push('总计：'+(total-reduction).toFixed(2)+'(元)\n');
    printList.push('节省：'+reduction.toFixed(2)+'(元)\n')
    printList.push('**********************');

    console.log(printList.join(""));

    return printList.join("");


}
