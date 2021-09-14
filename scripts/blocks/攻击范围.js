 var wepr = 1
 var ugpr = 0
 var ugapr = 1000
 
 //-------upgrade-system--------//
 const 武器范围循环科技 = extendContent(GenericCrafter,"武器范围循环科技",{
	 update(tile){
		 if(tile.entity.cons.valid()){
      tile.entity.cons.trigger()
        ugpr+=1
      tile.entity.cons.trigger()
    }
武器范围循环科技.localizedName="循环科技-武器范围"+wepr+"级"+"进度："+ugpr+"/"+ugapr 

if(ugpr == ugapr){
	 ugpr = 0
	 wepr+=1
	 ugapr = Math.trunc(1000*Math.pow(1.1,wepr) )+1
 }
 }})
 
 
 
//-----------parts----------//

