//
//Vars.content.units();
//const unit1 = Vars.content.getByName(ContentType.unit,"test-战舰")
/*function uFind(name){
    const unitArray = Vars.content.units();
    return unitArray.get(name);
}
*/
//const unit0 = Vars.mods.locateMod("战舰");
//const unit1 = uFind(11);
var battleshipS = 0

const unitBlock = extendContent(Block, "unitBlock", {
    update(tile){
        //Vars.content.createModContent();
        const unitType = ContentType.unit;
        var unit2 = Vars.content.getByName(unitType, "星空战争重置版-星灵族大舰");
        if (Mathf.chance(Time.delta() * 0.07)){
            
            
            
            
            
            
            UnitCreate(tile, unit2, 220)
        battleshipS+= 1
        }
        if (battleshipS == 7){
      tile.ent().health -= 1000
      battleshipS = 0
        }
        
        
    }
})
unitBlock.update = true;


function UnitCreate(itile,iUnit,range){
    const units = Vars.content.units();
    var unitI = units.get(iUnit.id).create(itile.getTeam());
    //unitI.spawner = itile;
    unitI.set(itile.drawx() + Mathf.range(range), itile.drawy() + Mathf.range(range) + range);
    Effects.effect(Fx.unitSpawn, unitI.x, unitI.y, 0, unitI);
    unitI.add();
    unitI.velocity().y = 0;
}
/*
const unitBlock = extendContent(MessageBlock, "unitBlock", {
    update(tile){
        Vars.content.createModContent();
        const entity = tile.ent();
        const unitArray = Vars.content.units();
        entity.message = unitArray;
  
    }
})
unitBlock.update = true;
unitBlock.requirements(Category.effect, ItemStack.with(Items.copper, 30))
*/