const Cabinet = this.global.Cabinet;

const b1 = extend(BasicBulletType,{});
b1.bulletSprite = Vars.content.transformName("blaster");
b1.damage = 15;
b1.bulletWidth = 5;
b1.bulletHight = 20;
b1.speed = 15;
b1.lifetime = 20

const fh1 = extendContent(Weapon,"主力舰主炮",{});
fh1.bullet = b1;
fh1.length = 10;
fh1.reload = 10;
fh1.width = 14;
fh1.range = 120

const fh2 = Cabinet.CreateNewWeapon("机炮", 2);
fh2.bullet = b1;
fh2.length = 14;
fh2.reload = 10;
fh2.width = 14;
fh2.range = 120

const fh3 = Cabinet.CreateNewWeapon("机炮", 3);
fh3.bullet = b1;
fh3.length = 14;
fh3.reload = 10;
fh3.width = 10;
fh3.range = 120

const 防御舰 = extendContent(UnitType, "防御舰", {});
防御舰.create(prov(()=>{
    const def = extend(FlyingUnit, {
        "target2":null,
        "weapon2":fh2,
        "weaponOffsetY2":5.5,
        "weaponAngles2":[0,0],
        "getWeapon2":this["weapon2"],
        "timerTarget2":0,
        "shootTimer2":new Interval(3),
        "target3":null,
        "weapon3":fh3,
        "weaponOffsetY3":5.5,
        "weaponAngles3":[0,0],
        "getWeapon3":this["weapon2"],
        "timerTarget3":0,
        "shootTimer3":new Interval(3),

        behavior(){
            this.super$behavior();
            Cabinet.Superbehavior(this,2);
            Cabinet.Superbehavior(this,3);

        },
        
    radius:320,
    broken:true,
    buildup:0,
    radscl:0,
    breakage:100000,
    cooldownNormal:12.5,
    hit:0,
    warmup:0,
    phaseHeat:0,
    shield2:null,
    shield:function(ret){const ret2 = extend(BaseEntity,{
        update(){
            const entity = ret;
            if(entity.isDead() || !entity.isAdded()){
                this.remove();
            }
        },
        create(x, y){
            const entity = ret;
            this.set(x, y);
            return this;
        },
        add(){
            if(this.targetGroup() != null){
                this.targetGroup().add(this);
            }
        }
    })
        return ret2;
    },
    write(stream){
        this.super$write(stream);
        stream.writeBoolean(this.broken);
        stream.writeFloat(this.buildup);
        stream.writeFloat(this.radscl);
        stream.writeFloat(this.warmup);
        stream.writeFloat(this.phaseHeat);
    },
    read(stream, revision){
        this.super$read(stream, revision);
        this.broken = stream.readBoolean();
        this.buildup = stream.readFloat();
        this.radscl = stream.readFloat();
        this.warmup = stream.readFloat();
        this.phaseHeat = stream.readFloat();
    },
    update(){
            Cabinet.ConstNewWeapon(this,2);
            Cabinet.ConstNewWeapon(this,3);
        this.super$update();
        if(this.shield2 == null){
            this.shield2 = this.shield(this).create(this.getX(), this.getY());
            this.shield2.add();
        };
        if(this.getX()!=this.shield2.getX()||this.getY()!=this.shield2.getY()){
            this.shield2.set(this.getX(), this.getY());
            
        };
        
        this.drawOver();
        this.radscl = Mathf.lerpDelta(this.radscl, this.broken ? 0 : this.warmup, 0.05);
        this.warmup = Mathf.lerpDelta(this.warmup, 1, 0.1);
        
        
        if(this.buildup > 0){
            this.buildup -= 12.5*Time.delta();
        };
        if(this.broken && this.buildup <= 0){
            this.broken = false;
        };
        if(this.buildup >= this.breakage && !this.broken){
            this.broken = true;
            this.buildup = this.breakage;
        };
        if(this.hit > 0){
            this.hit -= 1 / 5 * Time.delta();
        };
        var realRadius = (this.radius + this.phaseHeat) * this.radscl;
        Vars.bulletGroup.intersect(this.getX() - realRadius, this.getY() - realRadius, realRadius*2, realRadius * 2, cons(trait =>{
            if(trait.canBeAbsorbed() && trait.getTeam() != this.getTeam() && Intersector.isInsideHexagon(trait.getX(), trait.getY(), realRadius*2, this.getX(), this.getY())){
            trait.absorb();
            Effects.effect(Fx.absorb, trait);
            this.hit = 1;
            this.buildup += trait.getShieldDamage() * this.warmup;
            }
        }));
    },
    drawSmp(){
        Draw.color(Color.valueOf("#0b88ee"));
        Lines.stroke(1);
        Lines.poly(this.getX() * Vars.tilesize, this.getY() * Vars.tilesize, 6, this.radius);
        Draw.color();
        const entity = this;
        if(realRadius(entity) < 0.5) return;
            var rad = realRadius(entity);
            Draw.color(Color.valueOf("#0b88ee"));
            Lines.stroke(1.5);
            Draw.alpha(0.09 + 0.08 * entity.hit);
            Draw.blend(Blending.additive);
            Fill.poly(this.x, this.y, 6, rad);
            Draw.alpha(1);
            Lines.poly(this.x, this.y, 6, rad);
            Draw.blend();
            Draw.reset();
    },
    drawSize(){
        const entity = this;
        return realRadius(entity) + 2;
        },
        draw(){
            this.drawSmp();
            this.super$draw();
            const entity = this;
        },

    });
    def.sTimer = new Interval(10);
    
    return def;
}));


function realRadius(obj){
    return (obj.radius + obj.phaseHeat) * obj.radscl;
}

Object.assign(防御舰, {
    health:27000,
    speed:0.006,
    hitsize:25,
    flying:true,
    weapon:fh1,
});