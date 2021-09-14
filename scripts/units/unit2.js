const unit2 = extendContent(UnitType, "newUnit2", {});
unit2.create(prov(() =>extend(FlyingUnit, {
    update(){
        this.super$update();
        if(this.target != null && this.timer.get(2, 60)){
            
            this.set(this.target.getX() + Mathf.range(360), this.target.getY() + Mathf.range(360) + 360);
            
        }
    }
})));
unit2.weapon = UnitTypes.eradicator.weapon;
unit2.health = 2500;
unit2.flying = true;