'use strict';

function printReceipt(inputs) {
  var total = 0;
  var t = 0;
  var result = new Array();
  var barcode = new Array();
  var count = new Array();
  var tag = new Array();
  barcode[0] = inputs[0].barcode;
  count[0] = 0;
  tag[0] = 0;
  result.push("***<没钱赚商店>收据***\n");
  for (var i = 0; i<inputs.length; i++) {
        if (barcode[t] == inputs[i].barcode) {
          count[t]++;
          tag[t] = 0;
        }
        else {
          barcode[++t] = inputs[i].barcode;
          count[t] = 1;
          tag[t] = 0;
        }
  }

  for (var i = 0; i<inputs.length; i++) {
    for (var j = 0; j<=t; j++) {
      if (inputs[i].barcode == barcode[j]&&!tag[j])
      {
        result.push('名称：'+inputs[i].name+'，数量：'+count[j]+inputs[i].unit+'，单价：'+(inputs[i].price).toFixed(2)+'(元)'+'，小计：'+(count[j]*inputs[i].price).toFixed(2)+'(元)\n');
        total += count[j]*inputs[i].price;
        tag[j] = 1;
      }
    }
  }
  result.push('----------------------\n');
  result.push('总计：'+total.toFixed(2)+'(元)\n');
  result.push('**********************');

  console.log(result.join(""));
}
