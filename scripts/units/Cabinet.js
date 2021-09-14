const Cabinet = {
    getError:function(e){
        if(e.javaException != undefined) return String(e.javaException);
        if(e.rhinoException != undefined) return String(e.rhinoException);
        return String(e);
    },
    /*loadMusic:function(name, setter){
        const params = new Packages.arc.assets.loaders.SoundLoader.SoundParameter();
        params.loadedCallback = new Packages.arc.assets.AssetLoaderParameters.LoadedCallback({
            finishedLoading(asset, str, cls) {
                print('1 load sound ' + name + ' from arc');
                setter(asset.get(str, cls));
                
            }
            
        });
        Core.assets.load("sounds/" + name, Packages.arc.audio.Sound, params).loaded = new Cons({
            get(a) {
                print('2 load sound ' + name + ' from arc');
                setter(a);
                
            }
            
        });
    },*/
    bool:function(i){
        if(i == 1 || i == 0){
            return i == 1 ? true : false;
        }else{
            print("i cannot be" + i + "!")
        }
    },
    
    ConstNewWeapon:function(obj, num){
    var string1 = "weapon" + num;
    var string2 = "weaponAngles" + num;
    var string3 = "target" + num;
    
    /*obj[string1] = obj.type[string1];
    obj[string2] = [0,0];
    const yys = () => {return obj[string1]}
    obj[string3] = yys();*/
    Cabinet.WeaponDo(num,obj,string1,string2,string3);
},
    WeaponDo:function(num,obj,s1,s2,s3){
    var target = obj[s3];
    
    var t1 = "timerTarget" + num;
    var t2 = "shootTimer" + num;
    
    const ammo = obj[s1].bullet;
    if(target != undefined){
        target = Units.closestTarget(obj.getTeam(), obj.getX(), obj.getY(),obj[s1].range);
    }else{
        target = obj.target;
    }
    
    if(target != null && (Angles.near(obj.angleTo(target), obj.rotation, 120) || obj[s1].ignoreRotation) && obj.dst(target) < obj[s1].bullet.range()){
                    if(obj[s1].rotateWeapon){
                        for(var i = 0;i<2;i++){
                            var left = Mathf.booleans[i];
                            var wi = Mathf.num(left);
                            var wx = obj.x + Angles.trnsx(obj.rotation - 90, obj[s1].width * Mathf.sign(left));
                            var wy = obj.y + Angles.trnsy(obj.rotation - 90, obj[s1].width * Mathf.sign(left));
                            const weaponAngles = obj[s2];
                            weaponAngles[wi] = Mathf.slerpDelta(weaponAngles[wi], Angles.angle(wx, wy, target.getX(), target.getY()), 0.1);
                            Tmp.v2.trns(weaponAngles[wi], obj[s1].length);
                            obj[s1].updateS(obj[t2], obj, wx + Tmp.v2.x, wy + Tmp.v2.y, weaponAngles[wi], left);
                            if(obj[t1]==0) obj[t1] = 1;
                        }
                    }else{
                        var to = Predict.intercept(obj, target, ammo.speed);
                        obj[s1].updateF(obj[t2], obj, to.x, to.y);
                        if(obj[t1]==0) obj[t1] = 1;
                    }
                }
                
},
    Superdraw:function(obj,num,region2){
    //obj.super$drawWeapons();
    var s1 = "weapon" + num;
    var s2 = "weaponOffsetY" + num;
    var s3 = "timerTarget" + num;
    var s4 = "weaponAngles" + num;
    if(obj[s1] == null) return;
        for(var x = 0;x<2;x++){
            var i = Mathf.signs[x];
            
            var tra = obj.rotation - 90, trY = -obj[s1].getRecoil(obj, Cabinet.bool(obj[s3])) + obj[s2];
            if(obj[s1].region == null) obj[s1].region = Core.atlas.find(region2);
            var w = -i * obj[s1].region.getWidth() * Draw.scl;
            Draw.rect(obj[s1].region,
            obj.x + Angles.trnsx(tra, obj[s1].width * i, trY),
            obj.y + Angles.trnsy(tra, obj[s1].width * i, trY), w, obj[s1].region.getHeight() * Draw.scl, obj.rotation - 90);
            if(obj[s3]==1) obj[s3] = 0;
        }
},
     Superbehavior:function(obj,num){
    //obj.super$behavior();
    var s1 = "weapon" + num;
    var s2 = "weaponOffsetY" + num;
    var s3 = "getWeapon" + num;
    var s4 = "weaponAngles" + num;
    var s5 = "target" + num;
    var weaponAngles2 = obj[s4]
        if(obj[s1] == undefined) return;
        var target = null;
        
        if(obj[s5] != undefined){
            target = obj[s5];
        }else{
            target = obj.target;
        };
            if(Units.invalidateTarget(target, obj)){
                for(var i = 0;i<2;i++){
                    var left = Mathf.booleans[i];
                    var wi = Mathf.num(left);
                    weaponAngles2[wi] = Mathf.slerpDelta(weaponAngles2[wi], obj.rotation, 0.1);
            }
        }
},
shootDirect:function(shooter, offsetX, offsetY, rotation, left, weapon){
        const floatc = method => new Floatc(){get: method};
        var x = shooter.getX() + offsetX;
        var y = shooter.getY() + offsetY;
        var baseX = shooter.getX(), baseY = shooter.getY();
        
        
        weapon.shootSound.at(x, y, Mathf.random(0.8, 1.0));

        var sequenceNum = 0;
        if(weapon.shotDelay > 0.01){
            Angles.shotgun(weapon.shots, weapon.spacing, rotation, floatc(f => {
                Time.run(sequenceNum * weapon.shotDelay, run(() => weapon.bulletS(shooter, x + shooter.getX() - baseX, y + shooter.getY() - baseY, f + Mathf.range(weapon.inaccuracy))));
                sequenceNum++;
            }));
        }else{
            Angles.shotgun(weapon.shots, weapon.spacing, rotation, floatc(f => {weapon.bulletS(shooter, x, y, f + Mathf.range(weapon.inaccuracy))}));
        };

        const ammo = weapon.bullet;

        Tmp.v1.trns(rotation + 180, ammo.recoil);

        shooter.velocity().add(Tmp.v1);

        Tmp.v1.trns(rotation, 3);

        Effects.shake(weapon.shake, weapon.shake, x, y);
        Effects.effect(weapon.ejectEffect, x, y, rotation * -Mathf.sign(left));
        Effects.effect(ammo.shootEffect, x + Tmp.v1.x, y + Tmp.v1.y, rotation, shooter);
        Effects.effect(ammo.smokeEffect, x + Tmp.v1.x, y + Tmp.v1.y, rotation, shooter);
        //shooter.getTimer().get(shooter.getShootTimer(left), weapon.reload);
    },
    CreateNewWeapon:function(name, nu){
        const wea = extendContent(Weapon,"wea",{
    shoot(p, x, y, angle, left){
            Cabinet.shootDirect(p, x, y, angle, left, this);
    },
    /*load(){
        this.region = Core.atlas.find(name);
    },*/
    bulletS(owner, x, y, angle){
        if(owner == null) return;

        Tmp.v1.trns(angle, 3);
        Bullet.create(this.bullet, owner, owner.getTeam(), x + Tmp.v1.x, y + Tmp.v1.y, angle, (1 - this.velocityRnd) + Mathf.random(this.velocityRnd));
    },
    updateS(timer, shooter, mountX, mountY, angle, left){
        
        const timerc = timer;
        if(timerc.get(Mathf.num(left),this.reload)){
            this.shoot(shooter, mountX - shooter.getX(), mountY - shooter.getY(), angle, left);
        }
    },
    updateF(timer, shooter, pointerX, pointerY){
        for(var i=0;i<2;i++){
            var left = Mathf.booleans[i];
            Tmp.v1.set(pointerX, pointerY).sub(shooter.getX(), shooter.getY());
            if(Tmp.v1.len() < this.minPlayerDist) Tmp.v1.setLength(this.minPlayerDist);

            var cx = Tmp.v1.x + shooter.getX(), cy = Tmp.v1.y + shooter.getY();

            var ang = Tmp.v1.angle();
            Tmp.v1.trns(ang - 90, this.width * Mathf.sign(left), this.length + Mathf.range(this.lengthRand));

            this.updateS(timer, shooter, shooter.getX() + Tmp.v1.x, shooter.getY() + Tmp.v1.y, Angles.angle(shooter.getX() + Tmp.v1.x, shooter.getY() + Tmp.v1.y, cx, cy), left);
        }
    },
    getRecoil(player, left){
        return (1 - Mathf.clamp(player.getTimer().getTime(Mathf.num(left)) / this.reload)) * this.recoil;
    },
});
wea.num = nu;
return wea;
    },
    UnitCreate(itile,iUnit,range){
        const units = Vars.content.units();
        var unitI = units.get(iUnit.id).create(itile.getTeam());
        unitI.set(itile.drawx() + Mathf.range(range), itile.drawy() + Mathf.range(range) + range);
        Effects.effect(Fx.unitSpawn, unitI.x, unitI.y, 0, unitI);
        unitI.add();
        unitI.velocity().y = 0;
    }
}

this.global.Cabinet = Cabinet