import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverviewComponent } from "./overview/overview.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RestockComponent } from "./restock/restock.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { MaterialSharedModule } from "../materials.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

const components = [
    PageNotFoundComponent,
    OverviewComponent,
    RestockComponent,
    WithdrawComponent
];

@NgModule({
    declarations: [
        ...components,
        HeaderComponent,
        FooterComponent,
        MessageDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialSharedModule
    ],
    exports: [
        ...components
    ]
})
export class ComponentsModule {}
