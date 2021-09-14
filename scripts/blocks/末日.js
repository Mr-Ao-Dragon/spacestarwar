//
const colors末 = [Pal.lancerLaser.cpy().mul(1, 1, 1, 0.4), Pal.lancerLaser, Color.valueOf("#0b88ee")];
//
const tscales末 = [1, 0.7, 0.5, 0.2];
//
const lenscales末 = [1, 1.1, 1.13, 1.14];
//
const length末 = 8000;

const 末日激光 = extend(BasicBulletType,{
    range(){
        return length末;
    },
    //mindustry.entities.type.Bullet
    // init(b){
    // },
    update(b){
        if (b.time()<0.001) {
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length末);
        }
        print(b.time())
    },
    draw(b){
        const f = Mathf.curve(b.fin(), 0, 0.2);
        const baseLen = length末 * f;

        Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors末[s]);
            for(var i = 0; i < tscales末.length; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales末[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales末[i]);
            }
        }
        Draw.reset();
    }
})
末日激光.damage = 10000;
末日激光.speed = 0.001;
末日激光.hitEffect = Fx.lancerLaserCharge;
末日激光.despawnEffect = Fx.none;
末日激光.hitSize = 64;
末日激光.lifetime = 240;
末日激光.pierce = true;

const 末日 = extendContent(ChargeTurret,"末日",{})

末日.shootType = 末日激光;

末日.chargeEffect = newEffect(600, e => {
    Draw.color(Color.valueOf("#7b68ee"),Color.valueOf("#e4ebff"),e.fin());
    Lines.stroke(e.fin() * 3);
    Lines.circle(e.x, e.y, e.fout() * 60);
    
    Lines.stroke(e.fin() * 1.75);
    Lines.circle(e.x, e.y, e.fout() * 45);

    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 120 * e.fout(), e.rotation, 100,d);
});



