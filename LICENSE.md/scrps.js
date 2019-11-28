var tabOfYs = [], tabOfXs = [], xFromFunction = [],yFromFunction = [], pointX = [], pointY = [];
var a, b,summaryErr=0,Sx = 0,Sy = 0, Sxx = 0, Sxy = 0, Syy = 0,Sx2y = 0 ,SylogY = 0,SxylogY = 0 ,Sxy
= 0 ;
var coppyOfTabOfXs;
var coppyOfTabOfYs;

function duplicate() {   //pomnażanie XY 
    var clone = original.cloneNode(true); 
    clone.id = "duplicetor" + ++i; 
    original.parentNode.appendChild(clone);
}




function mainFunction(){
    var charType = document.getElementById('trendType');
    var choice = charType.options[charType.selectedIndex].value;
    var getX = document.getElementsByName('x');
    var getY = document.getElementsByName('y');

    for (var i = 0; i <getX.length; i++) {
            var getXs=getX[i];
            var getYs=getY[i]
                pointX.push(getXs.value);
                pointY.push(getYs.value);
    }
    
    
    if(choice=="linear")[a,b]=linear()
    if(choice=="logarithmic")[a,b]=logarithmic()    
    if(choice=="exponential")[a,b]=exponential()
   
    
   
    

    document.getElementById('chart').innerHTML ='<canvas id="scatter" width="700" height="400"></canvas>'
    
    chartgenerate()
}
    
function chartgenerate(){
    
var ctx = document.getElementById('scatter');

var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: makeLabels().labels,
    datasets: [{
      type: 'line',
      label: 'Trend line',
      data: makeLabels().labels,
      fill: false,
      backgroundColor: "rgba(82, 92, 179, 0.4)",
      borderColor: "rgba(82, 92, 179, 0.4)",
      pointRadius: 0,
        
    }, {
      type: 'bubble',
      label: 'Points',
      data: makePoints(),
      backgroundColor: "rgba(226, 59, 30, 1)",
      borderColor: 'rgba(226, 59, 30, 1)'
    }]
  },
  options: {
      animation: {
        duration: 0
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
          
        ticks: {
          autoSkip: true,
            
          max: Math.max(...makeLabels().array)
        }
          
      }]
    }
  }
});

function makeLabels() {
  var arr = tabOfYs;
    var newarr = arr.map(function(item, i) {
    return {x: tabOfXs[i], y:tabOfYs[i]}
      
  });
    
       
  return {
    labels: newarr,
    array: arr

  };
};

  
function makePoints() {
        let arr = pointX;  
        arr = arr.map(function(item, i) 
        {
            return {x: item, y:pointY[i]}
        });  
        return arr;    
};
    
summaryError();
clearAll()
  
}

function logarithmic(){
    var n = pointX.length;
    
    for (var i = 0; i < n; i++) {
    Sx += Math.log(pointX[i]);
    Sy += parseInt(pointY[i]); 
    Sxy += Math.log(pointX[i]) * pointY[i];
    Sxx += Math.log(pointX[i]) * Math.log(pointX[i]);
    Syy += pointY[i] * pointY[i];   
}
    let aa,bb;
    bb = ((n * Sxy) - (Sx * Sy)) / ((n * Sxx) - (Sx * Sx));
    aa = (Sy - (bb * Sx   )) / n;
    a=aa.toFixed(4) ;  //zaokraglanie do 4 miejsc po przecinku
    b=bb.toFixed(4);
     
     document.getElementById('trend').innerHTML ='<b>F(x)= </b>'+a+'<b> *LN(x)+ </b>'+b
     
    for (let x=1;x<50;x++){        
            let count = (a*(Math.log(x))+parseInt(b));    
            yFromFunction.push(count.toFixed(4));
            tabOfXs[x-1]=x;
            tabOfYs[x-1]=(yFromFunction[x-1]);    
            }
    coppyOfTabOfXs = tabOfXs;
    coppyOfTabOfYs =  tabOfYs;
    
     return [a, b];
}

function linear(){
    
    	var Sx = 0;
		var Sy = 0;
		var Sxx = 0;
		var Sxy = 0;
		var n = pointX.length;		
		for(var i = 0; i < n; i++) {
			Sx += parseFloat(pointX[i]);
			Sy += parseFloat(pointY[i]);
			Sxx += parseFloat(pointX[i])*parseFloat(pointX[i]);
			Sxy += parseFloat(pointX[i])*parseFloat(pointY[i]);
		}		
		a = (Sx*Sy - Sxy*n)/(Sx*Sx - Sxx*n);
		b = (Sx*Sxy - Sxx*Sy)/(Sx*Sx - Sxx*n);
    
for (var y=0;y<50;y++){
    let count=((y-b)/a)    
    xFromFunction.push(count)
    tabOfXs[y]=xFromFunction[y]
    tabOfYs[y]=y
    

}
    document.getElementById('trend').innerHTML ='<b>F(x)= </b>'+a.toFixed(4)+'<b> x+ </b>'+b.toFixed(4)
    return [a,b];
    
}

function exponential(){
    var n = pointX.length;
    for (var i = 0; i < n; i++) {
    Sx += parseInt(pointX[i]);
    Sy += parseInt(pointY[i]);
    Sx2y += parseInt(pointX[i]) * parseInt(pointX[i]) * parseInt(pointY[i]);
    SylogY += parseInt(pointY[i]) * Math.log(pointY[i]);
    SxylogY += parseInt(pointX[i]) * parseInt(pointY[i]) * Math.log(pointY[i]);
    Sxy += parseInt(pointX[i]) * parseInt(pointY[i])  
}
 
var delta = ((Sy*Sx2y)-(Sxy*Sxy));
var expA = Math.exp(((Sx2y*SylogY) - (Sxy*SxylogY)) / delta);
var expB = ((Sy*SxylogY)-(Sxy*SxylogY)) / delta;
a = expA.toFixed(8);
b = expB.toFixed(8);
    console.log('b= '+b)
    
     document.getElementById('trend').innerHTML ='<b>F(x)= '+a.toFixed(4)+'*e^(x*</b>'+a.toFixed(4)+'<b>)+ </b>'
     
   for (let x=0;x<30;x++)
        {   let count = a*Math.exp(x*parseInt(b));
            yFromFunction.push(count.toFixed(8));
            tabOfXs[x]=x;
            tabOfYs[x]=(yFromFunction[x]);    
        }
    
    
    console.log(tabOfYs)
    return [a, b];
}


function summaryError(){
    
    for(let q=0;q<pointY.length;q++){
        let count =(pointY[q]-tabOfYs[q])
        
        summaryErr+=parseInt(count);
      //  console.log(tabOfYs)
      //  console.log('count '+count,'err '+summaryErr,'ptk y '+pointY[q])
        if(summaryErr<0)summaryErr=summaryErr*(-1);
     
    }
     document.getElementById('SBO').innerHTML =summaryErr;
    
}
function clearAll(){
     sum = 0;
    pointX = [];
    pointY = [];
    tabOfYs = [];
    tabOfXs = [];
    xFromFunction = [];
    yFromFunction = [];
    summaryErr=0;
    Sx = 0;
	Sy = 0;
	Sxx = 0;
	Sxy = 0;
    Sx2y = 0;
    SylogY = 0;
    SxylogY = 0;
    Sxy = 0 ;
}













  
