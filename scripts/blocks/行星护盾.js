var hddj = 0

const 行星护盾 = extendContent(ForceProjector, "行星护盾", {
	draw(tile){
	   if(hddj==0){
	    Draw.rect(Core.atlas.find(this.name + "-base"),tile.drawx(),tile.drawy());
	    }
	   if(hddj==1){
	    Draw.rect(Core.atlas.find(this.name + "-level1"),tile.drawx(),tile.drawy());
	    }
	    if(hddj==2){
        Draw.rect(Core.atlas.find(this.name + "-level2"),tile.drawx(),tile.drawy());
        }
        if(hddj==3){
        Draw.rect(Core.atlas.find(this.name + "-level3"),tile.drawx(),tile.drawy());
        }
	}
})
//----------------------------------------------------------------------------------------//
const 行星护盾施工 = extendContent(Block, "行星护盾施工", {
update(tile){
      if(hddj==0&&tile.entity.cons.valid()){
      tile.entity.cons.trigger()
      行星护盾.localizedName="行星护盾-聚能器";
      行星护盾.description="已经经过升级的护盾，其范围与防御力已足以与时空舰队护盾匹敌";
	  行星护盾.radius=350;
	  行星护盾.breakage=200000;
	  行星护盾.cooldownNormal=100;
	  行星护盾.cooldownLiquid=1.2;
	  行星护盾.cooldownBrokenBase=150;
	  行星护盾.buildCostMultiplier=100000;
      行星护盾.requirements(Category.defense, ItemStack.with(Items.sand, 3000000, Items.coal, 2500000))
	  tile.entity.cons.trigger()
	  hddj+=1
      }else if(hddj==1&&tile.entity.cons.valid()){
      tile.entity.cons.trigger()
      行星护盾.localizedName="行星护盾-发散镜";
      行星护盾.description="如果仅仅能与‘苍穹’护盾匹敌，那么显然是对不起我们投入的资源与它的名号的,但安装过发散镜后，其防御能力与范围已经达到了前所未有的地步";
	  行星护盾.radius=800;
	  行星护盾.breakage=1000000;
	  行星护盾.cooldownNormal=250;
	  行星护盾.cooldownLiquid=1.05;
	  行星护盾.cooldownBrokenBase=350;
	  行星护盾.buildCostMultiplier=100000;
      行星护盾.requirements(Category.defense, ItemStack.with(Items.sand, 3000000, Items.coal, 2500000))
	  tile.entity.cons.trigger()
	  hddj+=1
      }else if(hddj==2&&tile.entity.cons.valid()){
      tile.entity.cons.trigger()
      行星护盾.localizedName="行星护盾-终章";
      行星护盾.description="最后的部件已经安装，护盾的庇护范围已经覆盖整颗星球，规模不是太大的舰队的全力攻击甚至无法撼动他一丝一毫，我们已经立于不败之地！";
	  行星护盾.radius=1600;
	  行星护盾.breakage=6000000;
	  行星护盾.cooldownNormal=1000;
	  行星护盾.cooldownLiquid=1.0075;
	  行星护盾.cooldownBrokenBase=1500;
	  行星护盾.buildCostMultiplier=100000;
	  行星护盾.requirements(Category.defense, ItemStack.with(Items.sand, 3000000, Items.coal, 2500000))
	  tile.entity.cons.trigger()
	  hddj+=1
      }
	}
	})