var tabOfYs = [], tabOfXs = [], xFromFunction = [], pointX = [], pointY = [];
var a, b;
var Sx = 0,Sy = 0, Sxx = 0, Sxy = 0, Syy = 0;
var n = pointX.length;

function duplicate() {   //pomnażanie XY 
    var clone = original.cloneNode(true); 
    clone.id = "duplicetor" + ++i; 
    original.parentNode.appendChild(clone);
}




function linearr(){ 
    var getX = document.getElementsByName('x');
    var getY = document.getElementsByName('y');

    for (var i = 0; i <getX.length; i++) {
            var getXs=getX[i];
            var getYs=getY[i]
                pointX.push(getXs.value);
                pointY.push(getYs.value);
    }
    

    [a,b]=linear()
    
    document.getElementById('trend').innerHTML ='<b>F(x)= </b>'+a+'<b> x+ </b>'+b
    
for (var y=0;y<50;y++){
    var count=((y-b)/a) 
    
    xFromFunction.push(count)
    tabOfXs[y]=xFromFunction[y]
    tabOfYs[y]=y
    console.log(tabOfXs[y])

}
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
 console.log(makeLabels().labels)
  
function makePoints() {
        let arr = pointX;  
        arr = arr.map(function(item, i) 
        {
            return {x: item, y:pointY[i]}
        });  
        return arr;    
};
    
var summaryErr=0;
    for(let q=0;q<pointY.length;q++){
        let count =(pointY[q]-tabOfYs[q])
        summaryErr+=count;
        if(summaryErr<0)summaryErr=summaryErr*(-1);
     
    }
     document.getElementById('SBO').innerHTML =summaryErr;
    
    //czyszczenie tablic
    sum=0;
    pointX=[]
    pointY=[]
    tabOfYs=[]
    tabOfXs=[] 
    xFromFunction=[]
  
}
function linear(){
    	var Sx = 0,Sy = 0, Sxx = 0, Sxy = 0, Syy = 0;
				
		for(var i = 0; i < n; i++) {
			Sx += parseFloat(pointX[i]);
			Sy += parseFloat(pointY[i]);
			Sxx += parseFloat(pointX[i])*parseFloat(pointX[i]);
			Sxy += parseFloat(pointX[i])*parseFloat(pointY[i]);
		}
		
		a = (Sx*Sy - Sxy*n)/(Sx*Sx - Sxx*n);
		b = (Sx*Sxy - Sxx*Sy)/(Sx*Sx - Sxx*n);

    return [a,b];
    
}
function logarithmic(){
    
    
    for (var i = 0; i < n; i++) {
    Sx = Sx + Math.log(pointX[i]);
    Sy = Sy + pointY[i];
    Sxy = Sxy + Math.log(pointX[i]) * pointY[i];
    Sxx = Sxx + Math.log(pointX[i]) * Math.log(pointX[i]);
    Syy = Syy + pointY[i] * pointY[i];
    
}
    b = ((n * Sxy) - (Sx * Sy)) / ((n * Sxx) - (Sx * Sx));
    a = (Sy - (b * Sx   )) / n;
    return [a,b];
    
}
function clearAll(){
     sum = 0;
    pointX = [];
    pointY = [];
    tabOfYs = [];
    tabOfXs = [];
    xFromFunction = [];
    Sx = 0;
	Sy = 0;
	Sxx = 0;
	Sxy = 0;
    
}
  
