
var sdpdj = 0

const 一大堆闪电 = extend(BasicBulletType,{
draw(b){
       Draw.color(Color.valueOf("ffd280"));
       Fill.circle(b.x, b.y, 7);
       Draw.color(Color.valueOf("ffffff"));
       Fill.circle(b.x, b.y, 3.725);
        },
        update(b){
         if(b.timer.get(1,4)){
             for(var i = 0; i < 3; i++){
				Lightning.create(b.getTeam(),Color.valueOf("9400D3"), 100, b.x , b.y , Mathf.random(360), Mathf.random(20, 20));
				}
				}
				},
			});
			
一大堆闪电.speed = 0.01,
一大堆闪电.damage = 1,
一大堆闪电.knockback = 0.2,
一大堆闪电.splashDamageRadius = 40,
一大堆闪电.splashDamage = 750,
一大堆闪电.bulletWidth = 18,
一大堆闪电.bulletHeight = 18,
一大堆闪电.drag = 0,
一大堆闪电.collidesTiles = false,
一大堆闪电.hitTiles = false;
一大堆闪电.pierce = true,
一大堆闪电.hitSize = 0,
一大堆闪电.collides = false,
一大堆闪电.collidesAir = false,
一大堆闪电.lifetime = 60;

const 螺旋升天球 = extend(BasicBulletType,{
    draw(b){
        Draw.color(Color.valueOf("ffd280"));
       Fill.circle(b.x, b.y, 15);
       Draw.color(Color.valueOf("ffffff"));
       Fill.circle(b.x, b.y, 7.5);
       const plasmas = 6;
        var plasmaRegions = new Array();
        for(var i = 0; i < 6; i++){
            plasmaRegions[i] = "星空战争重置版-螺旋升天球-plasma-"+i;
        }
        for(var i = 0; i < 6; i++){
            var r = 29 + Mathf.absin(Time.time(), 2 + i * 1, 5 - i * 0.5);
            Draw.color(Color.valueOf("#55A1FF"),Color.valueOf("#A0CCFF"), i / 6);
            Draw.alpha(0.37128 + Mathf.absin(Time.time(), 2 + i * 2, 0.3 + i * 0.05) * 1);
            Draw.blend(Blending.additive);
            Draw.rect(Core.atlas.find(plasmaRegions[i]), b.x, b.y,Time.time() * (12 + i * 6) * 1);
            Draw.blend();
        }
    
    }
    })
螺旋升天球.speed = 6,
螺旋升天球.pierce = false,
螺旋升天球.damage = 1000,
螺旋升天球.knockback =0,
螺旋升天球.splashDamageRadius =1,
螺旋升天球.splashDamage = 1000,
螺旋升天球.homingPower = 1,
螺旋升天球.homingRange = 190,
螺旋升天球.hitSize = 10,
螺旋升天球.drawSize = 50,
螺旋升天球.bulletWidth = 30,
螺旋升天球.bulletHeight = 30,
螺旋升天球.bulletShrink = 0,
螺旋升天球.collidesTiles = true,
螺旋升天球.collidesTeam = false,
螺旋升天球.collidesAir = true,
螺旋升天球.collides = true,
螺旋升天球.fragBullets = 3,
螺旋升天球.fragBullet = 一大堆闪电,
螺旋升天球.hitEffect = Fx.none,
螺旋升天球.trailEffect = Fx.none,
螺旋升天球.shootEffect = newEffect(150,e =>{
    const d = new Floatc2({get(x,y){
        Draw.color(Color.valueOf("#9400D3"), Color.valueOf("#F0F8FF"), e.fin());
        Lines.stroke(e.fslope() * 4);
        Lines.circle(e.x, e.y, e.fin() * 50); 
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y),e.fslope() * 10 + 2);
    }})
            Angles.randLenVectors(e.id, 10, 50 * e.fslope(),e.rotation, 360,d)
});
螺旋升天球.smokeEffect = newEffect(60,e => {
	const d = new Floatc2({get(x,y){
                Draw.color(Color.valueOf("#abdbff"),Color.valueOf("#f0f8ff"),e.fin());
                Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 2, 45);
            }})
            Angles.randLenVectors(e.id, 3, 1 + e.fin() * 20,d);
        });
螺旋升天球.lifetime = 800,
螺旋升天球.despawnEffect = Fx.flakExplosion
const 空间震荡弹 = extendContent(ChargeTurret,"空间震荡弹",{
    	draw(tile){
	   if(sdpdj==0){
	    Draw.rect(Core.atlas.find(this.name + "-level0"),tile.drawx(),tile.drawy());
	    }
	   if(sdpdj==1){
	    Draw.rect(Core.atlas.find(this.name + "-level1"),tile.drawx(),tile.drawy());
	    }
	}
})
空间震荡弹.chargeEffect = newEffect(120,e=>{
    const d = new Floatc2({get(x,y){
        Draw.color(Color.valueOf("#F0F8FF"), Color.valueOf("#9400D3"), e.fin());
        Lines.stroke(e.fout() * 1);
        Lines.circle(e.x, e.y, e.fout() * 70);
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y),e.fout() * 15 + 1);
    }})
            Angles.randLenVectors(e.id, 10, 50 * e.fout(),e.rotation, 360,d)
});
空间震荡弹.chargeBeginEffect = Fx.lancerLaserChargeBegin

//-dividing-line-//
//-dividing-line-//

const 空间震荡弹升级 = extendContent(Block, "空间震荡弹升级", {
update(tile){
      if(sdpdj==0&&tile.entity.cons.valid()){
      tile.entity.cons.trigger()
      空间震荡弹.localizedName="空间风暴-毁灭";
      空间震荡弹.description="我们的科学家已经攻克了难关！现在，我们可以发射比电弧高到不知道哪里去的东西了，空间都将为之震颤！";
	  空间震荡弹.shootType = 螺旋升天球;
	  tile.entity.cons.trigger()
	  sdpdj+=1
      }
}})