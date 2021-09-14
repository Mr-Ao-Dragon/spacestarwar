const Cabinet = this.global.Cabinet;
const light = extend(BasicBulletType, {
    draw(b){
        
    },
    
    range(){
        return 1000;
    },

    update(b){
        for(var i=0;i<2;i++){
            Lightning.create(b.getTeam(), Pal.lancerLaser, this.damage, b.x, b.y, b.rot(), 1000);
        }
    }
});
light.speed = 0.0001;
light.damage = 2100;
light.lifetime = 1;
light.despawnEffect = Fx.none;
light.hitEffect = Fx.hitLancer

const b1 = extend(BasicBulletType,{});
b1.bulletSprite = Vars.content.transformName("blaster");
b1.damage = 15;
b1.bulletWidth = 5;
b1.bulletHight = 20;
b1.speed = 15;
b1.lifetime = 20

const b2 = extend(BasicBulletType,{});
b2.bulletSprite = Vars.content.transformName("blaster");
b2.damage = 100;
b2.speed = 10;
b2.lifetime = 50

const weap1 = extendContent(Weapon,"主力舰主炮",{});
weap1.bullet = light;
weap1.reload = 300;
weap1.alternate = true

const w1 = Cabinet.CreateNewWeapon("主力舰炮", 2);
w1.bullet = b2;
w1.length = 10;
w1.width = 44;
w1.reload = 25;
w1.range = 600

const w2 = Cabinet.CreateNewWeapon("主力舰炮", 3);
w2.bullet = b2;
w2.length = 10;
w2.width = 65;
w2.reload = 30;
w2.range = 600

const w3 = Cabinet.CreateNewWeapon("主力舰炮", 4);
w3.bullet = b2;
w3.length = 10;
w3.reload = 30;
w3.width = 83;
w3.range = 600

const w4 = Cabinet.CreateNewWeapon("机炮", 5);
w4.bullet = b1;
w4.length = 14;
w4.reload = 10;
w4.width = 14;
w4.range = 120

const w5 = Cabinet.CreateNewWeapon("机炮", 6);
w5.bullet = b1;
w5.length = 23;
w5.reload = 10;
w5.width = 14;
w5.range = 120

const w6 = Cabinet.CreateNewWeapon("机炮", 7);
w6.bullet = b1;
w6.length = 32;
w6.reload = 10;
w6.width = 4;
w6.range = 120

const w7 = Cabinet.CreateNewWeapon("机炮", 8);
w7.bullet = b1;
w7.length = -4;
w7.reload = 10;
w7.width = 6;
w7.range = 120



const 强袭主力舰 = extendContent(UnitType, "强袭主力舰", {});
强袭主力舰.create(prov(()=>{
    const def = extend(FlyingUnit, {
        "target2":null,
        "weapon2":w1,
        "weaponOffsetY2":5.5,
        "weaponAngles2":[0,0],
        "getWeapon2":this["weapon2"],
        "timerTarget2":0,
        "shootTimer2":new Interval(3),
        
        "target3":null,
        "weapon3":w2,
        "weaponOffsetY3":5.5,
        "weaponAngles3":[0,0],
        "getWeapon3":this["weapon2"],
        "timerTarget3":0,
        "shootTimer3":new Interval(3),
        
        "target4":null,
        "weapon4":w3,
        "weaponOffsetY4":5.5,
        "weaponAngles4":[0,0],
        "getWeapon4":this["weapon2"],
        "timerTarget4":0,
        "shootTimer4":new Interval(3),
        
        "target5":null,
        "weapon5":w4,
        "weaponOffsetY5":5.5,
        "weaponAngles5":[0,0],
        "getWeapon5":this["weapon2"],
        "timerTarget5":0,
        "shootTimer5":new Interval(3),
        
        "target6":null,
        "weapon6":w5,
        "weaponOffsetY6":5.5,
        "weaponAngles6":[0,0],
        "getWeapon6":this["weapon2"],
        "timerTarget6":0,
        "shootTimer6":new Interval(3),
        
        "target7":null,
        "weapon7":w6,
        "weaponOffsetY7":5.5,
        "weaponAngles7":[0,0],
        "getWeapon7":this["weapon2"],
        "timerTarget7":0,
        "shootTimer7":new Interval(3),
        
        "target8":null,
        "weapon8":w7,
        "weaponOffsetY8":5.5,
        "weaponAngles8":[0,0],
        "getWeapon8":this["weapon2"],
        "timerTarget8":0,
        "shootTimer8":new Interval(3),
        
        update(){
            Cabinet.ConstNewWeapon(this,2);
            Cabinet.ConstNewWeapon(this,3);
            Cabinet.ConstNewWeapon(this,4);
            Cabinet.ConstNewWeapon(this,5);
            Cabinet.ConstNewWeapon(this,6);
            Cabinet.ConstNewWeapon(this,7);
            Cabinet.ConstNewWeapon(this,8);
            this.super$update();
        },
        behavior(){
            this.super$behavior();
            Cabinet.Superbehavior(this,2);
            Cabinet.Superbehavior(this,3);
            Cabinet.Superbehavior(this,4);
            Cabinet.Superbehavior(this,5);
            Cabinet.Superbehavior(this,6);
            Cabinet.Superbehavior(this,7);
            Cabinet.Superbehavior(this,8);
        },
    });
    def.sTimer = new Interval(10);
    
    return def;
}));
Object.assign(强袭主力舰, {
    health:120000,
    speed:0.003,
    hitsize:80,
    flying:true,
    rotatespeed:0.01,
    weapon:weap1,
});



