//
const colors矛 = [Pal.lancerLaser.cpy().mul(1, 1, 1, 0.4), Pal.lancerLaser, Color.white];
//
const tscales矛 = [1, 0.7, 0.5, 0.2];
//
const lenscales矛 = [1, 1.1, 1.13, 1.14];
//
const length矛 = 8000;

const 小激光 = extend(BasicBulletType,{
    range(){
        return length矛;
    },
    //mindustry.entities.type.Bullet
    // init(b){
    // },
    update(b){
        if (b.time()<0.001) {
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length矛);
        }
        print(b.time())
    },
    draw(b){
        const f = Mathf.curve(b.fin(), 0, 0.2);
        const baseLen = length矛 * f;

        Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors矛[s]);
            for(var i = 0; i < tscales矛.length; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales矛[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales矛[i]);
            }
        }
        Draw.reset();
    }
})
小激光.damage = 60;
小激光.speed = 0.001;
小激光.hitEffect = Fx.hitLancer;
小激光.despawnEffect = Fx.none;
小激光.hitSize = 8;
小激光.lifetime = 60;
小激光.pierce = true;

const 粒子光矛 = extendContent(ChargeTurret,"粒子光矛",{})

粒子光矛.shootType = 小激光;

粒子光矛.chargeEffect = newEffect(180, e => {
    Draw.color(Color.valueOf("#7b68ee"),Color.valueOf("#e4ebff"),e.fin());
    
    Lines.stroke(e.fin() * 1);
    Lines.circle(e.x, e.y, e.fout() * 32);
    Lines.stroke(e.fin() * 1);
    Lines.circle(e.x, e.y, e.fout() * 16);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 48 * e.fout(), e.rotation, 100,d);
});






