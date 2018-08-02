import { NgModule } from '@angular/core';
import { EmisorMoment1Component } from './emisor-moment1/emisor-moment1';
import { EmisorMoment2Component } from './emisor-moment2/emisor-moment2';
import { ReceptorMoment1Component } from './receptor-moment1/receptor-moment1';
import { ReceptorMoment2Component } from './receptor-moment2/receptor-moment2';
import { ItemSincronizeComponent } from './item-sincronize/item-sincronize';
@NgModule({
	declarations: [EmisorMoment1Component,
    EmisorMoment2Component,
    ReceptorMoment1Component,
    ReceptorMoment2Component,
    ItemSincronizeComponent],
	imports: [],
	exports: [EmisorMoment1Component,
    EmisorMoment2Component,
    ReceptorMoment1Component,
    ReceptorMoment2Component,
    ItemSincronizeComponent]
})
export class ComponentsModule {}
