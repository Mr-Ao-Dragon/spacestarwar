const colors泰坦激光 = [Pal.lancerLaser.cpy().mul(1, 1, 1, 0.4), Pal.lancerLaser, Color.valueOf("#0b88ee")];
//
const tscales泰坦激光 = [1, 0.7, 0.5, 0.2];
//
const lenscales泰坦激光 = [1, 1.1, 1.13, 1.14];
//
const length泰坦激光 = 8000;

const 泰坦激光日激光 = extend(BasicBulletType,{
    range(){
        return length泰坦激光;
    },
    //mindustry.entities.type.Bullet
    // init(b){
    // },
    update(b){
        if (b.time()<0.001) {
            Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), length泰坦激光);
        }
        print(b.time())
    },
    draw(b){
        const f = Mathf.curve(b.fin(), 0, 0.2);
        const baseLen = length泰坦激光 * f;

        Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 3; s++){
            Draw.color(colors泰坦激光[s]);
            for(var i = 0; i < tscales泰坦激光.length; i++){
                Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales泰坦激光[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales泰坦激光[i]);
            }
        }
        Draw.reset();
    }
})
泰坦激光日激光.damage = 10000;
泰坦激光日激光.speed = 0.001;
泰坦激光日激光.hitEffect = Fx.lancerLaserCharge;
泰坦激光日激光.despawnEffect = Fx.none;
泰坦激光日激光.hitSize = 64;
泰坦激光日激光.lifetime = 240;
泰坦激光日激光.pierce = true

const newWeapon = extend(Weapon,{});
newWeapon.reload = 600;
newWeapon.ejectEffect = Fx.none;
newWeapon.shootSound = Sounds.explosion;
newWeapon.bullet = 泰坦激光日激光

const 泰坦舰激光型 = extendContent(UnitType,"泰坦舰激光型",{});

泰坦舰激光型.constructor = prov(()=>extend(FlyingUnit,{}));
泰坦舰激光型.attackLength = 400;
泰坦舰激光型.maxVelocity = 1.27;
泰坦舰激光型.speed = 0.015;
泰坦舰激光型.drag = 0.4;
泰坦舰激光型.weapon = newWeapon;
泰坦舰激光型.hitsize = 80;
泰坦舰激光型.mass = 275.8;
泰坦舰激光型.health = 150000;
泰坦舰激光型.flying = true
